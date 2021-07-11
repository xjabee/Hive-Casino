const { parseParamsToArray } = require("comtroller");
const { parse } = require("dotenv");
const { updateUserPoints } = require("yeonna-core");
const { getUserPoints } = require("yeonna-core");

module.exports = {
    name: 'flip',
    aliases: ['gamble', 'f', 'coinflip'],
    run: async ({ context, params }) => {
        const args = parseParamsToArray(params);
        const bet = parseInt(args[0]);
        const points = await getUserPoints({
            twitchChannelID: context.tags['room-id'],
            userIdentifier: context.tags['user-id'],
        });
        //console.log(bet);
        //console.log(context.tags);
        if (isNaN(bet))
            return context.send("please enter bet amount(!bet [amount])");
        if (points >= bet) {
            const odds = Math.random() * 100;
            if (odds >= 50) {
                const add = await updateUserPoints({
                    twitchID: context.tags['user-id'],
                    amount: bet,
                    add: true,
                    twitchChannelID: context.tags['room-id'],
                });
                context.send(`You won ${bet}, you have ${add} 💲🌭`);
            } else {
                const rem = await updateUserPoints({
                    twitchID: context.tags['user-id'],
                    amount: bet,
                    subtract: true,
                    twitchChannelID: context.tags['room-id'],
                });
                context.send(`You lost ${bet}, you have ${rem} 💲🌭`);
            }
        }
        else context.send("you don't have enough 💲🌭");
    }
}