export default class User {
  constructor(id, username, discriminator) {
    this.id = id;
    this.username = username;
    this.discriminator = discriminator;
  }
}
