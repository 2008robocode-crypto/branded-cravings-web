# 🔥 Branded Cravings - Late Night Hostel Cloud Kitchen Web App

A clean, minimalist, high-conversion web application designed for a late-night hostel food delivery side hustle (10:00 PM – 3:00 AM). Built for **Uniworld Hostels 1 & 2** with Google Sheets live inventory sync, dynamic UPI payments, and interactive flavor customization.

---

## 🚀 Key Features

* **Aesthetic Design:** Clean white background (`#FFFFFF`) with warm craving orange accents (`#FF5C00`) and rounded rectangular cards.
* **Smart Menu & Flavors:**
  * **10" Cheese Blast Pizza (₹270):** Choose between *Farmers (Capsicum, Onion)* or *Classic Margherita*.
  * **Combos & 7" Pizzas:** Interactive topping chooser:
    * 🟢 *Spicy Jalapeño*
    * 🟢 *Golden Corn*
    * 🟢 *Capsicum*
    * 🟢 *Onion*
    * 🔴 *Non-Veg Chicken & Onion*
  * **Crispy Veg Burger (₹60)** & **Midnight Maggi (₹30)**.
* **Hostel Delivery Details:**
  * Hostel selection: **Uniworld Hostel 1** (Active) & **Uniworld Hostel 2** (Coming Soon badge / disabled).
  * Destination selector: **Room Door**, **Rooftop**, **Common Room / Lobby**, or **Main Gate**.
  * Room / Exact location text field.
  * Custom notes / delivery instructions box (e.g., *"Knock softly, roommate is asleep"*).
* **Payment Flow:**
  * **Dynamic UPI QR Code:** Automatically generates a scannable QR code matching the exact order total.
  * **1-Tap Mobile UPI:** Direct button for students to launch Google Pay / PhonePe / Paytm on mobile.
  * **Cash on Delivery (COD)** option.
  * UPI UTR / Transaction reference input for quick order verification.
* **Post-Order Kitchen Ping:**
  * Pre-filled **WhatsApp message** button to notify the kitchen instantly on their phone.
  * Web Audio **culinary chime sound effect** when an order drops.
* **Kitchen / Admin Hub (Top-right Icon):**
  * One-tap **In-Stock / Sold-Out toggles** for all dishes.
  * Real-time order log feed with order IDs.
  * Instant UPI ID & Kitchen WhatsApp configuration.
* **Google Sheets Backend Integration:**
  * Read items and stock status in real-time.
  * Automatically log every incoming order to a Google Sheet row.

---

## 📁 File Structure

```
branded-cravings/
├── index.html              # Main responsive web application
├── app.js                  # Cart, variant chooser, checkout & Google Sheets sync
├── google-apps-script.js   # Ready-to-paste Google Apps Script backend code
└── README.md               # Setup and deployment documentation
```

---

## ⚡ How to Run & Test Locally

You can preview the website immediately using Python's built-in web server:

```bash
cd /home/hackerank/.gemini/antigravity/scratch/branded-cravings
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

---

## 📊 How to Connect Google Sheets (In 2 Minutes)

1. Open [Google Sheets](https://sheets.new) and create a new sheet named **"Branded Cravings Database"**.
2. Go to **Extensions** > **Apps Script**.
3. Clear the default script and paste the entire content of [`google-apps-script.js`](file:///home/hackerank/.gemini/antigravity/scratch/branded-cravings/google-apps-script.js).
4. In the toolbar, select **`setupSheets`** from the function dropdown and click **Run**. (Grant permissions when prompted).
   * *This automatically creates the formatted `Menu`, `Orders`, and `Config` sheets with all your PDF menu dishes!*
5. Click **Deploy** (top right) > **New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
   * Description: `Branded Cravings API`
   * Execute as: `Me`
   * Who has access: `Anyone` *(Required so students can view stock & submit orders without logging in)*
7. Click **Deploy** and copy your **Web app URL** (ends in `/exec`).
8. On your website, click the **Kitchen Dashboard icon** in the top-right header > navigate to **Google Sheet & UPI Setup** > paste your URL > click **Save Settings**!

---

## 🌐 Free Hosting for Campus Students

You can host this for free in less than 60 seconds on:

### Option 1: GitHub Pages (Recommended)
1. Push this folder to a GitHub repository.
2. Go to repository **Settings** > **Pages**.
3. Set branch to `main` and root to `/ (root)`.
4. Your website is live at `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Vercel / Netlify
1. Drag and drop the `branded-cravings` folder into [Netlify Drop](https://app.netlify.com/drop) or import to [Vercel](https://vercel.com).
2. It goes live instantly with a free HTTPS custom domain (e.g., `brandedcravings.vercel.app`).
