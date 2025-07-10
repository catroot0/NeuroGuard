# NeuroGuard

**NeuroGuard** is a Discord moderation bot designed to help servers protect their communities from predators. It uses a user verification system that scans a user's server list for any NSFW servers (porn, condom-related, etc.). If such servers are detected, the bot automatically bans the user.

> **⚠️ WARNING:** This bot is self-hosted. You must complete the installation and configuration process to use it.

---

## Features

- **User verification via Discord OAuth2**
- **Detection and automatic banning of users found in NSFW guilds**
- **Persistent guild configurations stored in Firebase Realtime Database**
- **Slash command support with automatic registration**
- **Lightweight and easy to customize**

---

## Installation & Configuration

### Prerequisites

- Node.js (v14 or higher)  
- A VPS (Virtual Private Server)  
- A domain name (e.g., `.com`, `.net`, `.top`)

---

### Installation Steps

### Installation Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/drowningdev/NeuroGuard.git
cd NeuroGuard
```

2. **Install Dependencies**:
```bash
npm install
```

### 3. Configure Environment Variables

- Go to the [Discord Developer Portal](https://discord.com/developers/applications).
- Click **"New Application"**, name it **"NeuroGuard"**, and accept the Developer Terms of Service and Policy.
- Copy the **Application ID** from the General Information page.

Open the `example.env` file in the project directory and update the following:
```env
clientId="your_application_id_here"
```
- Navigate to the **OAuth2** tab, click **"Reset Secret"**, confirm, then copy your **Client Secret**.
- Paste it into the `clientSecret` field in `example.env`:
```env
clientSecret="your_client_secret_here"
```
- Go to the **Bot** tab, click **"Reset Token"**, confirm, then copy your **Bot Token**.
- Paste it into the `token` field in `example.env`:
```env
token="your_bot_token_here"
```
---

### 4. Set Up Firebase Realtime Database

- Visit the [Firebase Console](https://console.firebase.google.com).
- Create a new project or select an existing one.
- Navigate to **Build > Realtime Database**, then click **Create Database**.
- Select the location nearest to your server.
- Choose **Start in locked mode** and click **Enable**.
- Go to the **Rules** tab and replace the rules with:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
> **Note:** Yes. this rules are not very secure, but im just too lazy to change the code :>. just don't let other people have your database url and you're good :3

---

### 5. Finalize `example.env`

Ensure your `example.env` contains all credentials properly wrapped in quotes, e.g.:

clientId="your_application_id_here"  
clientSecret="your_client_secret_here"  
token="your_bot_token_here"  
firebaseDatabaseURL="your_firebase_database_url_here"
