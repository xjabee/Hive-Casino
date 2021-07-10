module.exports = class
{
  constructor(client, channel, tags, message)
  {
    this.client = client;
    this.channel = channel;
    this.tags = tags;
    this.message = message;
  }

  send(message, noMention)
  {
    this.client.say(
      this.channel,
      noMention ? message.toString() : `@${this.tags.username} ${message}`,
    );
  }
}