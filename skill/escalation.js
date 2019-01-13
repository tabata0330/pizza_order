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
        debug("送った");
        let sender_id = bot.extract_sender_id();
        let url = 'https://api.line.me/v2/bot/profile/' + sender_id;
        debug("ヘッダー用意");
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.LINE_ACCESS_TOKEN
        }
        debug("レスポンスもらう");
        const response = await request.getAsync({
            url: url,
            headers: headers,
            json: true
        })
        debug(`!!!!!!${response.body.userId}, ${response.body.displayName}`);
        let orig_message = JSON.parse(JSON.stringify(event.message));
        delete orig_message.id;
        debug(`!!!!!!!!!!orig_message: ${orig_message}`);
        
        bot.reply({
        	type: "text",
        	text: `${response.body.userId}の${response.body.displayName}さん。わからないメッセージはやめてください！！！`
        });
    }
};
