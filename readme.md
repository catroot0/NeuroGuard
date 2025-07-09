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

Go to [discord developer portal](https://discord.com/developers/applications). once you're in click on the "New Application" button. set the name "NeuroGuard" and confirm that you accept [discord developer terms of service](https://support-dev.discord.com/hc/articles/8562894815383-Discord-Developer-Terms-of-Service) and [discord developer policy](https://support-dev.discord.com/hc/articles/8563934450327-Discord-Developer-Policy). and click "Create".

Once its created you will be redirected to the bot's general information page. scroll down a bit and you will find application id. click copy. navigate to the [example.env file](https://github.com/drowningdev/NeuroGuard/blob/master/example.env) and find the clientId variable. clear its default value and put your application id that you just copied in it. make sure its a string. it means it must start with a " and also ends with a ".

Go back to discord developer portal. navigate to the "OAuth2" page. find the client secret. click "Reset Secret". it will show a pop up to make sure its not a mis click. click "Yes, do it!". once its reset click "Copy". navigate back to the [example.env file](https://github.com/drowningdev/NeuroGuard/blob/master/example.env) and find the "clientSecret" variable. fill it with your client secret that you just copied. 

Go back to discord developer portal. navigate to the "Bot" page. scroll down a bit. find the "Reset Token" button and click on it. it will show a pop up to make sure its not a mis click. click "Yes, do it!". once your token reset click "Copy" to copy the token. navigate back to the [example.env file](https://github.com/drowningdev/NeuroGuard/blob/master/example.env) and find the "token" variable. fill it with your token that you just copied.

