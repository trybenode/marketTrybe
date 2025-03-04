Market Trybe
📌 Overview
Market Trybe is a student-centered mobile marketplace that enables users to buy, sell, and provide services within their university community. The app facilitates secure transactions by allowing buyers and sellers to communicate via an in-app chat system before finalizing deals.

🚀 Features
🔹 User Authentication (Firebase Auth with JWT)
🔹 Product Listings (Buy/Sell Items & Services)
🔹 In-App Chat System (Firestore Real-Time Messaging)
🔹 Order History (Track Purchases & Sales)
🔹 Search & Filtering (Find Products Easily)
🔹 Push Notifications (Stay Updated on Messages & Orders)
🔹 Secure Data Storage (Firebase Firestore & Secure Store)

🛠 Tech Stack
Frontend: React Native (Expo) + Tailwind CSS
Backend: Firebase Firestore (NoSQL) + Cloud Functions
Authentication: Firebase Auth + Secure Store
Real-time Messaging: Firestore Database & WebSockets
Push Notifications: Firebase Cloud Messaging (FCM)

🔧 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/MarketTrybe.git
cd MarketTrybe

2️⃣ Install Dependencies
npm install

3️⃣ Install Expo CLI (If Not Installed)
npm install -g expo-cli

4️⃣ Start the Development Server
Npx expo start

5️⃣ Run the App
Android: Scan the QR code using Expo Go
iOS: Use Expo Go (or run expo run:ios if using Xcode)

🏗 Project Structure
📂 MarketTrybe/
├── 📂 src/
| |-----📂 app/ expo navigation
│ ├── 📂 components/ # Reusable UI components
│ ├── 📂 screens/ # App screens
│ ├── 📂 navigation/ # Navigation setup
│ ├── 📂 utils/ # Helper functions
│ ├── 📂 hooks/ # Custom React hooks
│ ├── 📂 config/ # Firebase & environment variables
├── 📂 assets/ # Images, animations, fonts
├── App.js # Main app entry
├── tailwind.config.js # Tailwind setup
├── firebaseConfig.js # Firebase setup

📜 Contributing
We welcome contributions from the community! To contribute:
Fork the repository
Create a feature branch (git checkout -b feature-name)
Commit your changes (git commit -m "Add new feature")
Push to your branch (git push origin feature-name)
Open a Pull Request

🛡 License

💡 Need Help? Contact the team at support@markettrybe.com 🚀

For the Eslint Prettier configuration
Run

> npx install-peerdeps --dev eslint-config-airbnb
> npm install eslint-config-prettier

At VScode Settings, set your formatter to prettier
