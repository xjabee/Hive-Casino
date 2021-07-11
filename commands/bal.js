const { parseParamsToArray } = require("comtroller");
const { getUserPoints } = require("yeonna-core");

module.exports = {
    name: 'bal',
    aliases: ['points', 'money'],
    run: async ({ context, params }) => {
        //client.say(channel, `@${context.tags.username}, hotdog ka popCat`);
        const args = parseParamsToArray(params);
        console.log(args);

        // await updateUserPoints({
        //     twitchChannelID: '193202362',
        //     amount: 100,
        //     twitchID: '19264788',
        //     add: true
        // })
        console.log(context.tags);
        const points = await getUserPoints({
            twitchChannelID: context.tags['room-id'],
            userIdentifier: context.tags['user-id'],
        });
        context.send(`, you have ${points} 💲🌭`);
    }
}