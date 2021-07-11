const { updateUserPoints } = require("yeonna-core");
const client = require("../../tmiclient");

module.exports = {
    name: 'Add_HotdogCoin_1000',
    run: async ({ event }) => {
        //client.say(channel, `@${context.tags.username}, hotdog ka popCat`);

        // await updateUserPoints({
        //     twitchChannelID: '193202362',
        //     amount: 100,
        //     twitchID: '19264788',
        //     add: true
        // })

        const add = await updateUserPoints({
            twitchID: event.user_id,
            amount: 1000,
            add: true,
            twitchChannelID: event.broadcaster_user_id

        });
        console.log(event);
        client.say(`#${event.broadcaster_user_login}`, `@${event.user_name}, redeemed ${event.reward.title}, now has ${add} 💲🌭`);
    }
}