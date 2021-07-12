require('dotenv').config();
const ngrok = require('ngrok');
const TES = require('tesjs');
const { Comtroller } = require('comtroller');
const client = require("./tmiclient");
const rewards = require('./commands/rewards');

const comtroller = new Comtroller({
    commands: rewards,
    defaults: {
        prefix: '',
        caseSensitive: true,
    }
});

(async () => {
    const port = 9876;
    const baseURL = process.env.URL || await ngrok.connect({ addr: port });

    /* Initialize tes.js */
    const tes = new TES({
        identity: {
            id: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET,
        },
        listener: {
            baseURL,
            port,
        }
    });

    /* Get the existing EventSub subscriptions. */
    const channelPointsRedemptionType = 'channel.channel_points_custom_reward_redemption.add';
    let subscriptions = await tes.getSubscriptionsByType(channelPointsRedemptionType);
    subscriptions = subscriptions.data;
    console.log(subscriptions);

    /* This code should only run in development. */
    if (process.env.ENVIRONMENT === 'development' && subscriptions.length > 0) {
        for (const subscription of subscriptions)
            await tes.unsubscribe(subscription.id);

        subscriptions = [];
    }

    const subscription = subscriptions
        .find(subscription => subscription.transport.callback === `${baseURL}/teswh/event`);

    /* Subscribe to the event if there is no subscription. */
    if (!subscription || subscriptions.length === 0) {
        const newSubscription = await tes.subscribe(
            channelPointsRedemptionType, { broadcaster_user_id: process.env.BROADCASTER_ID },
        );

        console.log(newSubscription.data);
    }

    /* Listen to the events. */
    tes.on(channelPointsRedemptionType, async event => {
        console.log(event.reward.id);
        //event.reward.title
        //if reward title = certain thing 
        // do thing
        //pog

        comtroller.run(event.reward.title.replace(/\s/g, '_'), { event })

    });



    console.log(`Listening on ${baseURL}`);
    client.say(`xjabee`, `shop is now open!! check channel points rewards!!`);
})();