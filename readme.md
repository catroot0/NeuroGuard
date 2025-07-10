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
> **Note:** Yes. these rules are not very secure, but im just too lazy to change the code :>. just don't let other people have your database url and you're good :3

---


### Buy a Domain and Run the Bot on a VPS

To make your bot accessible via a custom URL and keep it running 24/7, you’ll want to:

1. **Buy a Domain Name**  
   Purchase a domain from registrars like Namecheap, GoDaddy, or Google Domains. Choose a domain that suits your bot or project.

2. **Set Up a VPS**  
   Rent a VPS from providers such as DigitalOcean, Linode, Vultr, or AWS Lightsail. Choose an OS you are comfortable with (Ubuntu is popular).

3. **Point Your Domain to the VPS**  
   - In your domain registrar’s DNS settings, add an A Record pointing your domain (e.g., `yourdomain.com`) to the VPS IP address.  
   - Optionally, set up a CNAME Record for `www.yourdomain.com` pointing to `yourdomain.com`.

4. **Deploy and Run NeuroGuard on the VPS**  
   - SSH into your VPS.  
   - Clone the NeuroGuard repository and follow the installation.  
   - Use a process manager like pm2 to keep the bot running continuously.

---

### Add Redirect URI to Discord Developer Portal

To ensure OAuth2 works correctly, you **must add your bot's redirect URL to the Discord Developer Portal**:

1. In your application's page, go to the **OAuth2** tab.
2. Scroll down to the **Redirects** section.
3. Click **"Add Redirect"** and enter: `yourdomain.com/callback`
4. Click **"Save Changes"** at the bottom.

> ⚠️ **Important:** Make sure this matches exactly what you put in your `.env` file as `redirectUrl`. If they don’t match, the OAuth2 flow will fail.

---

### 5. Finalize `example.env`

Ensure your `example.env` contains all credentials properly wrapped in quotes, e.g.:

```env
clientId="your_application_id_here"  
clientSecret="your_client_secret_here"  
token="your_bot_token_here"  
firebaseDatabaseURL="your_firebase_database_url_here"  
redirectUrl = "https://yourdomain.com/callback"
port = "your_vps_port"
host = "your_vps_ip"
```

Once its done rename `the example.env` file to `.env`.

---


## Compile And Run the Bot

1. Compile the project by running
```bash
npm run build
```

2. Once the compiling process is done run the bot by running 
```bash
npm run dev
```

---

## Contributing

Contributions are welcome! If you want to help improve the bot, follow these steps:

1. Fork the repository.
2. Create a new branch from `master`:
   - ```bash
   git checkout -b feature/my-feature-name master
   ```
3. Make your changes.
4. Commit your changes:
   - ```bash
     git commit -am "Add: your feature description"
     ```
5. Push to your branch
   - ```bash
     git push origin feature/my-feature-name
     ```
6. Open a pull request targeting the master branch.

## License

Distributed under the [MIT](https://opensource.org/license/mit) License.

## Contact

- GitHub: [drowningdev](https://github.com/drowningdev/)
- Email: drowning.dev1@gmail.com
- Discord: [@catroot0](https://discord.com/users/1358758349054808226)