const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('Send a message 2000+ times (use responsibly)')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to spam')
        .setRequired(true)
    ),

  async execute(interaction) {
    const msg = interaction.options.getString('message');
    await interaction.reply({ content: 'Starting spam...', ephemeral: true });

    for (let i = 0; i < 2000; i++) {
      try {
        await interaction.channel.send(`${msg} (${i + 1})`);
      } catch (err) {
        console.error(`Error at ${i + 1}:`, err);
        break;
      }
      await new Promise(r => setTimeout(r, 300)); // Delay to avoid hard rate limit
    }
  },
};
