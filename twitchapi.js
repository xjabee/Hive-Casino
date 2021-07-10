require("dotenv").config();
const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { DirectConnectionAdapter, EventSubListener } = require('twitch-eventsub');
const {NgrokAdapter} = require('twitch-eventsub-ngrok');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });
// const listener = new EventSubListener(apiClient, new DirectConnectionAdapter({
//     hostName: 'example.com',
//     sslCert: {
//         key: 'aaaaaaaaaaaaaaa',
//         cert: 'bbbbbbbbbbbbbbb'
//     }
// }), 'thisShouldBeARandomlyGeneratedFixedString');
const listener = new EventSubListener(apiClient, new NgrokAdapter(), 'sheeeeshseuhfse', { logger: { minLevel: 'debug' } });
//listener.listen();

(async function()
{
    // await listener.listen();
    // const poggers = await listener.subscribeToChannelCheerEvents('69503961', event=>{
    //     console.log(event);
    // })

    const getsubs = await apiClient.helix.eventSub.getSubscriptionsForType('channel.channel_points_custom_reward_redemption.add');
    const redemptsub = getsubs.data.pop();
    await redemptsub.unsubscribe();
    const redempt = await listener.subscribeToChannelRedemptionAddEvents('69503961', event=>{
        console.log(JSON.stringify(event, null, 2));
    })

    await listener.listen();
    

})()
