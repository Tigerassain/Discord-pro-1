const dns = require('dns');
// Force IPv4 to resolve connection timeouts
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder, PermissionsBitField, ActivityType } = require('discord.js');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

client.commands = new Collection();

// Load commands
const commands = [
    require('./commands/ping'),
    require('./commands/help'),
    require('./commands/serverinfo'),
    require('./commands/userinfo'),
    require('./commands/meme'),
    require('./commands/joke'),
    require('./commands/8ball'),
    require('./commands/kick'),
    require('./commands/ban'),
    require('./commands/clear'),
    require('./commands/avatar'),
    require('./commands/roll')
];

commands.forEach(cmd => {
    client.commands.set(cmd.name, cmd);
});

// Ready event
client.once('ready', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log(`📊 Serving ${client.guilds.cache.size} servers`);
    console.log(`👥 Watching over ${client.users.cache.size} users`);

    // Set bot status
    client.user.setPresence({
        activities: [{ name: `${config.prefix}help | Premium Bot`, type: ActivityType.Playing }],
        status: 'online'
    });
});

// Interaction Handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, [], client);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Message handler
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Check permissions
    if (command.permissions && message.guild) {
        const memberPermissions = message.member.permissions;
        const hasPermission = command.permissions.every(perm =>
            memberPermissions.has(PermissionsBitField.Flags[perm])
        );

        if (!hasPermission) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(config.colors.error)
                        .setDescription(`${config.emojis.error} You don't have permission to use this command!`)
                ]
            });
        }
    }

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(`Error executing ${commandName}:`, error);
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(config.colors.error)
                    .setDescription(`${config.emojis.error} There was an error executing that command!`)
            ]
        });
    }
});

// Guild member add event
client.on('guildMemberAdd', (member) => {
    const channel = member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor(config.colors.success)
        .setTitle('Welcome! 🎉')
        .setDescription(`Welcome to **${member.guild.name}**, ${member}!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: 'Member Count', value: `${member.guild.memberCount}`, inline: true }
        )
        .setFooter({ text: `User ID: ${member.id}` })
        .setTimestamp();

    channel.send({ embeds: [embed] });
});

// Error handling
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(config.token);
