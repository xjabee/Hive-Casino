const { parseParamsToArray } = require("comtroller");
const {getUserPoints} = require("yeonna-core");

module.exports = {
    name: 'so',
    aliases: ['s'],
    run: async ({context, params}) => {
        //client.say(channel, `@${context.tags.username}, hotdog ka popCat`);
        const args = parseParamsToArray(params);
        console.log(args);
        context.send(`Checkout ${args[0]}, cool person!! https://twitch.tv/${args[0]}`, true);
        // await updateUserPoints({
        //     twitchChannelID: '193202362',
        //     amount: 100,
        //     twitchID: '19264788',
        //     add: true
        // })
        console.log(
        await getUserPoints({
            twitchChannelID: '193202362',
            twitchID: '19264788',
        })
        );
    }
}