const { parseParamsToArray } = require("comtroller");

module.exports = {
    name: 'flip',
    aliases: ['gamble', 'f', 'coinflip'],
    run: async ({context, params}) => {

        context.send(cflip());
    }
}

function cflip()
{
    /*

    */

    const odds = Math.random() * 100;

    if(odds >= 50)
    return "Yo, You're insane!! You Win!! PogChamp";
    else return "FeelsBadMan you lost lmao PepeOld";
}