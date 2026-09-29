/**
 * =========================================================================
 * BRANDED CRAVINGS - GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * 
 * INSTRUCTIONS TO SET UP IN 2 MINUTES:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name your spreadsheet "Branded Cravings Database"
 * 3. Go to "Extensions" > "Apps Script" in the top menu
 * 4. Delete any existing code and PASTE THIS ENTIRE FILE into Code.gs
 * 5. In the top dropdown, select "setupSheets" and click "Run" (Grants permission once)
 *    -> This will automatically create all tabs, headers, and starter menu items!
 * 6. Click the blue "Deploy" button (top right) > "New deployment"
 * 7. Click the gear icon next to "Select type" > choose "Web app"
 * 8. Set:
 *    - Description: "Branded Cravings API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so website can read/write without login)
 * 9. Click "Deploy" and copy the "Web app URL" (ends in /exec)
 * 10. Open your Branded Cravings website > click the Kitchen icon > paste the URL into "Google Sheet URL" and click Save!
 * =========================================================================
 */

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup 'Menu' Sheet
  var menuSheet = ss.getSheetByName("Menu") || ss.insertSheet("Menu");
  menuSheet.clear();
  var menuHeaders = ["Item ID", "Item Name", "Category", "Price (₹)", "In Stock (TRUE/FALSE)", "Details"];
  menuSheet.appendRow(menuHeaders);
  menuSheet.getRange(1, 1, 1, menuHeaders.length).setFontWeight("bold").setBackground("#FF5C00").setFontColor("#FFFFFF");

  // Initial Menu from PDF
  var defaultItems = [
    ["pizza_10", "10\" Cheese Blast Pizza", "Pizzas", 270, "TRUE", "Cheese blast base, capsicum, onion or classic margherita"],
    ["burger_crispy_veg", "Crispy Veg Burger", "Burgers & Bites", 60, "TRUE", "Crisp seasoned veg patty, creamy house mayo & fresh toasted buns"],
    ["midnight_maggi", "Midnight Masala Maggi", "Maggi", 30, "TRUE", "Classic piping hot 2-minute hostel Maggi with authentic spicy masala"],
    ["regular_7_coke_combo", "Regular 7\" Pizza + Chilled Coke", "Combos", 165, "TRUE", "Personal 7\" fresh pizza with chosen topping + chilled Coca-Cola"],
    ["regular_7_choco_lava_combo", "Regular 7\" Pizza + Choco Lava Cake", "Combos", 170, "TRUE", "Personal 7\" pizza with chosen topping + molten warm Choco Lava cake"],
    ["regular_7_solo", "Regular 7\" Pizza (Solo)", "Pizzas", 135, "TRUE", "Individual 7\" crust pizza baked fresh with mozzarella & toppings"]
  ];

  defaultItems.forEach(function(row) {
    menuSheet.appendRow(row);
  });
  menuSheet.autoResizeColumns(1, menuHeaders.length);

  // 2. Setup 'Orders' Sheet
  var ordersSheet = ss.getSheetByName("Orders") || ss.insertSheet("Orders");
  if (ordersSheet.getLastRow() === 0) {
    var orderHeaders = [
      "Timestamp", "Order ID", "Customer Name", "Phone", 
      "Hostel", "Drop Spot", "Room No", "Custom Notes", 
      "Items Ordered", "Total (₹)", "Payment Mode", "UTR / Ref", "Status"
    ];
    ordersSheet.appendRow(orderHeaders);
    ordersSheet.getRange(1, 1, 1, orderHeaders.length).setFontWeight("bold").setBackground("#18181B").setFontColor("#FFFFFF");
    ordersSheet.autoResizeColumns(1, orderHeaders.length);
  }

  // 3. Setup 'Config' Sheet
  var configSheet = ss.getSheetByName("Config") || ss.insertSheet("Config");
  if (configSheet.getLastRow() === 0) {
    var configHeaders = ["Setting Key", "Value", "Description"];
    configSheet.appendRow(configHeaders);
    configSheet.getRange(1, 1, 1, configHeaders.length).setFontWeight("bold").setBackground("#3F3F46").setFontColor("#FFFFFF");
    configSheet.appendRow(["STORE_OPEN", "TRUE", "Set to FALSE to pause orders"]);
    configSheet.appendRow(["UPI_ID", "brandedcravings@upi", "Your UPI ID for customer QR payments"]);
    configSheet.appendRow(["DELIVERY_FEE", "0", "Delivery fee in Rupees"]);
    configSheet.autoResizeColumns(1, configHeaders.length);
  }

  // Remove default "Sheet1" if present
  var defaultSheet1 = ss.getSheetByName("Sheet1");
  if (defaultSheet1 && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet1);
  }

  try {
    SpreadsheetApp.getUi().alert("✅ Branded Cravings Database Setup Completed Successfully!\nNow click Deploy > New deployment > Web app.");
  } catch (e) {
    Logger.log("✅ Branded Cravings Database Setup Completed Successfully! Now click Deploy > New deployment > Web app.");
  }
}

// =========================================================================
// SECURITY, AUTHENTICATION & RATE LIMITING LAYER
// =========================================================================
var API_SECRET_KEY = "bc_sec_9f82d17c4e5b"; // Private Auth Key - Protects endpoints from public/unauthorized access

// Check if request is authenticated
function authenticateRequest(e) {
  var providedKey = "";
  if (e && e.parameter && e.parameter.apiKey) {
    providedKey = e.parameter.apiKey;
  } else if (e && e.postData && e.postData.contents) {
    try {
      var body = JSON.parse(e.postData.contents);
      providedKey = body.apiKey || "";
    } catch (err) {}
  }
  return providedKey === API_SECRET_KEY;
}

// Rate limiter using Google Apps Script CacheService
function checkRateLimit(key, maxRequests, windowSeconds) {
  try {
    var cache = CacheService.getScriptCache();
    var cacheKey = "rl_" + key;
    var count = Number(cache.get(cacheKey) || 0);

    if (count >= maxRequests) {
      return false; // Rate limit exceeded
    }

    cache.put(cacheKey, String(count + 1), windowSeconds || 60);
    return true; // Allowed
  } catch (err) {
    return true; // Fail-open if cache is temporarily unavailable
  }
}

// GET Request handler (Protected by Auth & Rate Limiter)
function doGet(e) {
  try {
    // 1. Authentication Layer
    if (!authenticateRequest(e)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        code: 401,
        message: "Unauthorized: Invalid or missing API key."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getMenu";

    // 2. Rate Limiting Layer
    if (action === "addOrder") {
      var phone = (e && e.parameter && e.parameter.phone) ? e.parameter.phone.trim() : "anon";
      if (!checkRateLimit("order_" + phone, 3, 60)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          code: 429,
          message: "Rate limit reached. Please wait a minute before submitting another order."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      if (!checkRateLimit("menu_fetch", 60, 60)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          code: 429,
          message: "Rate limit reached for menu requests. Please wait a moment."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // --- A. Handle Adding Order via GET ---
    if (action === "addOrder" && e && e.parameter && e.parameter.data) {
      var order = JSON.parse(decodeURIComponent(e.parameter.data));
      var ordersSheet = ss.getSheetByName("Orders") || ss.insertSheet("Orders");
      
      ordersSheet.appendRow([
        order.timestamp || new Date().toLocaleString(),
        order.orderId || "",
        order.customerName || "",
        order.customerPhone || "",
        order.hostel || "",
        order.dropSpot || "",
        order.roomNo || "",
        order.customNotes || "",
        order.items || "",
        order.total || 0,
        order.paymentMode || "Pay on Delivery",
        order.utr || "N/A",
        "New"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        orderId: order.orderId
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // --- B. Handle getMenu (Reads Menu & Config) ---
    var menuSheet = ss.getSheetByName("Menu");
    
    if (!menuSheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Menu sheet not found. Run setupSheets first." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var menuData = menuSheet.getDataRange().getValues();
    var items = [];

    // Skip header row
    for (var i = 1; i < menuData.length; i++) {
      var row = menuData[i];
      if (row[0]) {
        items.push({
          id: String(row[0]).trim(),
          name: String(row[1]).trim(),
          category: String(row[2]).trim(),
          price: Number(row[3]),
          inStock: String(row[4]).trim().toUpperCase() === "TRUE",
          details: String(row[5] || "")
        });
      }
    }

    // Read Config Sheet (STORE_OPEN, etc.)
    var config = {};
    var configSheet = ss.getSheetByName("Config");
    if (configSheet) {
      var configData = configSheet.getDataRange().getValues();
      for (var j = 1; j < configData.length; j++) {
        var key = String(configData[j][0]).trim();
        var val = String(configData[j][1]).trim();
        if (key) {
          config[key] = val;
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      menu: items,
      config: config
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// POST Request handler (Protected by Auth & Rate Limiter)
function doPost(e) {
  try {
    // 1. Authentication Layer
    if (!authenticateRequest(e)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        code: 401,
        message: "Unauthorized: Invalid or missing API key."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var order = contents.order;

    if (action === "addOrder" && order) {
      // 2. Rate Limiting Layer
      var phone = (order.customerPhone || "anon").trim();
      if (!checkRateLimit("order_" + phone, 3, 60)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          code: 429,
          message: "Rate limit reached. Please wait a minute before submitting another order."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var ordersSheet = ss.getSheetByName("Orders");

      if (!ordersSheet) {
        ordersSheet = ss.insertSheet("Orders");
        ordersSheet.appendRow([
          "Timestamp", "Order ID", "Customer Name", "Phone", 
          "Hostel", "Drop Spot", "Room No", "Custom Notes", 
          "Items Ordered", "Total (₹)", "Payment Mode", "UTR / Ref", "Status"
        ]);
      }

      ordersSheet.appendRow([
        order.timestamp || new Date().toLocaleString(),
        order.orderId || "",
        order.customerName || "",
        order.customerPhone || "",
        order.hostel || "",
        order.dropSpot || "",
        order.roomNo || "",
        order.customNotes || "",
        order.items || "",
        order.total || 0,
        order.paymentMode || "Pay on Delivery",
        order.utr || "N/A",
        "New"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        orderId: order.orderId
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Invalid action or payload"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
