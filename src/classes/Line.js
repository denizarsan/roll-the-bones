import Discord from 'discord.js';
import Server from './Server';
import Channel from './Channel';
import User from './User';

export default class Line {
  constructor() {
    this.bot = new Discord.Client();
    this.channels = [];
    this.users = [];
    this.channel = null;
    this.user = null;
  }

  get isOnline() {
    return this.bot.user !== null;
  }


  get isReady() {
    return this.bot.user !== null && this.channel !== null && this.user !== null;
  }

  connect(token, id) {
    return this.bot.login(token).then(() => {
      const guild = this.bot.guilds.get(id);

      this.server = new Server(guild.id, guild.name);
      this.channels = Array.from(guild.channels)
        .map(tuple => tuple[1])
        .filter(channel => channel.type === 'text')
        .map(channel => new Channel(channel.id, channel.name));
      this.users = Array.from(guild.members)
        .map(tuple => tuple[1])
        .filter(member => !member.user.bot)
        .map(member => new User(member.user.id, member.user.username, member.user.discriminator));
    });
  }

  disconnect() {
    if (this.isOnline) {
      this.bot.destroy();
    }
  }

  send(message) {
    this.bot.guilds.get(this.server.id).channels.get(this.channel.id).send(message);
  }

}