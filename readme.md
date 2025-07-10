# NeuroGuard
A Discord moderation bot designed to help servers to avoid predators. by adding a verify system that looks through the user's server list for any NSFW (porn, condo, etc) server. if found any. ban them

> **WARNING:** This bot is designed to be self-hosted, it means in order to use the bot you have to go though a installation and configurations process. 

## Features

- **User verification via Discord OAuth2**
- **Detection and automatic banning of users in NSFW guilds**
- **Persistent guild configurations stored in Firebase Realtime Database**
- **Slash command support with automatic command registration**
- **Persistent guild configurations stored in Firebase Realtime Database**

## Installation And Configurations

### Prerequisites

- Node.js (v14 or higher)
- A VPS (virtual private server)
- A Domain (.com, .net, .top, etc)

### Installation Steps

1. **Clone the Repository**:

```bash
git clone https://github.com/drowningdev/NeuroGuard.git
cd NeuroGuard
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Set Up Environment Variables**:

Go to the [Discord Developer Portal](https://discord.com/developers/applications).  
Click the **"New Application"** button, name your app **"NeuroGuard"**, and confirm that you accept the [Discord Developer Terms of Service](https://support-dev.discord.com/hc/articles/8562894815383-Discord-Developer-Terms-of-Service) and [Developer Policy](https://support-dev.discord.com/hc/articles/8563934450327-Discord-Developer-Policy). Then click **"Create"**.

After creating the app, you'll be redirected to the **General Information** page.  
Scroll down and copy the **Application ID**.  

Open the [`example.env` file](https://github.com/drowningdev/NeuroGuard/blob/master/example.env) in the project.  
Find the `clientId` variable, clear its default value, and paste the Application ID you just copied.  
Make sure it's wrapped in quotes (`"`), like this:  
```env
clientId="your_application_id_here"
```

Go back to the **OAuth2** tab in the Developer Portal.  
Click **"Reset Secret"**, confirm the action, and then click **"Copy"** to copy your new **Client Secret**.  
Return to the `example.env` file and paste it into the `clientSecret` field, again wrapping it in quotes:
```env
clientSecret="your_client_secret_here"
```

Now go to the **Bot** tab in the Developer Portal.  
Scroll down and click **"Reset Token"**, confirm the action, and then click **"Copy"** to copy your new **Bot Token**.  
Paste it into the `token` field in the `example.env` file:
```env
token="your_bot_token_here"
```

Your `example.env` file should now contain the correct credentials, each wrapped in quotes to ensure proper formatting.
