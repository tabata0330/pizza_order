'use strict';
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;
const debug = require("debug")("bot-express:skill");
const request = require("request");
Promise = require("bluebird");
Promise.promisifyAll(request);

module.exports = class Escalation {
    async finish(bot, event, context, resolve, reject){
        let tasks = [];

        bot.reply({
            type: "text",
            text: "すぐ調べます。ちょっとお待ちを。"
        });
        let sender_id = bot.extract_sender_id();
        let url = 'https://api.line.me/v2/bot/profile/' + sender_id;
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.LINE_ACCESS_TOKEN
        }
        const response = await request.getAsync({
            url: url,
            headers: headers,
            json: true
        })
        
        let user = {
            messenger: "line",
            user_id: response.body.userId,
            display_name: response.body.displayName,
            picture_url: response.body.pictureUrl
        }
        
        bot.reply({
        	type: "text",
        	text: `${user.display_name}, ${user.user_id}さん。${event.message}のようなわけのわからないメッセージはやめてください！！！`
        });
    }
};
