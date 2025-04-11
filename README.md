Market Trybe
Market Trybe is a student-centered mobile marketplace that empowers users to buy, sell, and offer services within their university community. With in-app chat, real-time messaging, and secure transactions, Market Trybe connects campus entrepreneurs and buyers in one place.

📌 Notion Board: Project Tracker

🎨 Figma Design & User Research: Figma File

🧩 Icons: Expo Icons

🚀 Features
    User Authentication (Firebase Auth + Secure Store)

    Product Listings (Buy/Sell Items & Services)

    In-App Chat (Realtime via Firestore)

    Order History (Track Purchases & Sales)

    Search & Filtering

    Push Notifications (FCM)

    Secure Data Storage (Firestore + Secure Store)

🛠 Tech Stack
Layer	Tech
Frontend	React Native (Expo) + Tailwind CSS
Backend	Firebase Firestore (NoSQL), Cloud Functions
Auth	Firebase Authentication + Secure Store
Messaging	Firestore + WebSockets
Notifications	Firebase Cloud Messaging (FCM)
Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/MarketTrybe.git
cd MarketTrybe
2. Install Dependencies
bash
Copy
Edit
npm install
3. Install Expo CLI (if not installed)
bash
Copy
Edit
npm install -g expo-cli
4. Start the Development Server
bash
Copy
Edit
npx expo start
5. Run the App
 Android: Scan the QR code using Expo Go

iOS: Use Expo Go or run expo run:ios if using Xcode

🏗 Project Structure
bash
Copy
Edit
MarketTrybe/
├── src/
│   ├── app/           # Expo router and entry points
│   ├── components/    # Reusable UI components
│   ├── screens/       # App screen layouts
│   ├── navigation/    # Stack & tab navigation
│   ├── utils/         # Helper utilities
│   ├── hooks/         # Custom React hooks
│   ├── config/        # Firebase & environment configs
├── assets/            # Images, fonts, animations
├── App.js             # App entry point
├── tailwind.config.js # Tailwind CSS setup
├── firebaseConfig.js  # Firebase initialization
🧼 Code Style & Formatting
To maintain clean and consistent code:

ESLint + Prettier Setup
bash
Copy
Edit
npx install-peerdeps --dev eslint-config-airbnb
npm install --save-dev eslint-config-prettier
VS Code Configuration
Format on Save: ✅

Set Prettier as Default Formatter

Optional .prettierrc:

json
Copy
Edit
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false
}
🔒 Note
This repository is public for transparency and documentation purposes, but it is actively maintained by the Market Trybe team and not open to external contributions at this time.

📬 Contact
For internal support or inquiries, reach us at:
support@markettrybe.com

