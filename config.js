module.exports = {
    prefix: process.env.PREFIX || '!',
    token: process.env.DISCORD_TOKEN,
    colors: {
        // Midnight Glass Palette
        primary: 0x5865F2,    // Discord Blurple (Branding)
        secondary: 0x2B2D31,  // Dark Gray (Backgrounds)
        success: 0x00FF94,    // Neon Green
        warning: 0xFFA500,    // Neon Orange
        error: 0xFF0055,      // Neon Red
        info: 0x00C2FF,       // Neon Cyan
        premium: 0x9B59B6,    // Neon Purple
        dark: 0x18191C        // Darkest
    },
    icons: {
        success: 'https://cdn-icons-png.flaticon.com/512/190/190411.png', // Green Check
        error: 'https://cdn-icons-png.flaticon.com/512/190/190406.png',   // Red X
        warning: 'https://cdn-icons-png.flaticon.com/512/190/190420.png', // Yellow Warning
        info: 'https://cdn-icons-png.flaticon.com/512/190/190413.png',    // Blue Info
        premium: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Diamond/Premium
        bot: 'https://cdn-icons-png.flaticon.com/512/4712/4712139.png'     // Robot
    },
    footerTexto: 'GenZ Bot • Premium Edition',
    // You can add a URL to a server icon or bot icon here if you have one hosted
    // iconUrl: 'https://...' 
};
