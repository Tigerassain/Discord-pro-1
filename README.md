# 🤖 Discord Bot

A feature-rich Discord bot built with discord.js v14 featuring utility, fun, and moderation commands.

## ✨ Features

### 🔧 Utility Commands
- `!ping` - Check the bot's latency
- `!serverinfo` - Display detailed server information
- `!userinfo [@user]` - Display user information
- `!avatar [@user]` - Display user's avatar in high resolution

### 🎮 Fun Commands
- `!meme` - Get a random meme
- `!joke` - Get a random joke
- `!8ball <question>` - Ask the magic 8-ball
- `!roll [sides]` - Roll a dice (default 6 sides, max 100)

### 🛡️ Moderation Commands
- `!kick @user [reason]` - Kick a member from the server
- `!ban @user [reason]` - Ban a member from the server
- `!clear <amount>` - Clear messages (1-100)

## 🚀 Setup Instructions

### Prerequisites
- Node.js v16.9.0 or higher
- A Discord Bot Token

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment Variables**
The `.env` file has already been created with your bot token. You can modify the prefix if needed:
```env
DISCORD_TOKEN=your_token_here
PREFIX=!
```

3. **Invite the Bot to Your Server**
- Go to the [Discord Developer Portal](https://discord.com/developers/applications)
- Select your application
- Go to OAuth2 → URL Generator
- Select scopes: `bot`
- Select permissions:
  - Read Messages/View Channels
  - Send Messages
  - Manage Messages
  - Embed Links
  - Attach Files
  - Read Message History
  - Add Reactions
  - Kick Members
  - Ban Members
- Copy the generated URL and open it in your browser to invite the bot

4. **Run the Bot**
```bash
npm start
```

## 📁 Project Structure

```
discord-bot/
├── commands/           # All bot commands
│   ├── ping.js
│   ├── help.js
│   ├── serverinfo.js
│   ├── userinfo.js
│   ├── avatar.js
│   ├── meme.js
│   ├── joke.js
│   ├── 8ball.js
│   ├── roll.js
│   ├── kick.js
│   ├── ban.js
│   └── clear.js
├── config.js           # Bot configuration
├── index.js            # Main bot file
├── package.json        # Dependencies
├── .env               # Environment variables (not in git)
└── .env.example       # Environment template
```

## 🎨 Customization

### Adding New Commands
1. Create a new file in the `commands/` folder
2. Follow this template:

```javascript
const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    name: 'commandname',
    description: 'Command description',
    aliases: ['alias1', 'alias2'],
    permissions: ['PermissionName'], // Optional
    async execute(message, args, client) {
        // Your command logic here
    }
};
```

3. The command will be automatically loaded by the bot

### Changing the Prefix
Edit the `PREFIX` value in the `.env` file:
```env
PREFIX=?
```

### Customizing Colors
Edit the colors in `config.js`:
```javascript
colors: {
    primary: 0x5865F2,
    success: 0x57F287,
    warning: 0xFEE75C,
    error: 0xED4245,
    info: 0x5865F2
}
```

## 📝 Available Permissions

Common permissions you can use in commands:
- `Administrator`
- `ManageGuild`
- `ManageRoles`
- `ManageChannels`
- `KickMembers`
- `BanMembers`
- `ManageMessages`
- `ManageNicknames`
- `MuteMembers`
- `DeafenMembers`
- `MoveMembers`

## 🔒 Security Notes

- **NEVER** share your bot token
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Keep your `node_modules` folder out of version control

## 🐛 Troubleshooting

### Bot doesn't respond to commands
1. Make sure the bot has permission to read and send messages
2. Check that you're using the correct prefix
3. Verify the bot is online in your server

### Permission errors
1. Ensure the bot role is positioned higher than the roles it needs to manage
2. Check that the bot has the required permissions in the server settings

### Module not found errors
Run `npm install` to install all dependencies

## 📜 License

MIT License - feel free to use this bot for any purpose!

## 🤝 Support

If you need help, feel free to:
- Check the [discord.js documentation](https://discord.js.org/)
- Visit the [Discord.js Guide](https://discordjs.guide/)

---

**Enjoy your Discord bot! 🎉**
