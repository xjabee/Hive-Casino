const { parseParamsToArray } = require("comtroller");

module.exports = {
    name: 'so',
    aliases: ['s'],
    run: ({context, params}) => {
        //client.say(channel, `@${context.tags.username}, hotdog ka popCat`);
        const args = parseParamsToArray(params);
        console.log(args);
        context.send(`Checkout ${args[0]}, cool person!! https://twitch.tv/${args[0]}`, true);
    }
}