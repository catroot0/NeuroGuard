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


### Buy a Domain and Run the Bot on a VPS

To make your bot accessible via a custom URL and keep it running 24/7, you’ll want to:

1. **Buy a Domain Name**  
   Purchase a domain from registrars like Namecheap, GoDaddy, or Google Domains. Choose a domain that suits your bot or project.

2. **Set Up a VPS**  
   Rent a VPS from providers such as DigitalOcean, Linode, Vultr, or AWS Lightsail. Choose an OS you are comfortable with (Ubuntu is popular).

3. **Point Your Domain to the VPS**  
   - In your domain registrar’s DNS settings, add an A Record pointing your domain (e.g., yourdomain.com) to the VPS IP address.  
   - Optionally, set up a CNAME Record for www.yourdomain.com pointing to yourdomain.com.

4. **Deploy and Run NeuroGuard on the VPS**  
   - SSH into your VPS.  
   - Clone the NeuroGuard repository and follow the installation steps below.  
   - Use a process manager like pm2 to keep the bot running continuously.

5. **Configure HTTPS (Optional but Recommended)**  
   To secure your OAuth callbacks and API endpoints:  
   - Install Certbot on your VPS.  
   - Obtain and configure free SSL certificates from Let’s Encrypt.  
   - Use a reverse proxy like Nginx to serve your bot over HTTPS.

---


### 5. Finalize `example.env`

Ensure your `example.env` contains all credentials properly wrapped in quotes, e.g.:


clientId="your_application_id_here"  
clientSecret="your_client_secret_here"  
token="your_bot_token_here"  
firebaseDatabaseURL="your_firebase_database_url_here"  
redirectUrl = "https://yourdomain.com/callback"