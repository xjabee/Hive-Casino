const { getTopPoints } = require("yeonna-core")


module.exports = {
    name: 'top',
    aliases: ['leaderboard'],
    run: async ({ context }) => {
        console.log(context.tags);
        const pog = await getTopPoints({
            count: 10,
            twitchChannelID: context.tags['room-id'],
        });
        console.log(pog);

    }
}