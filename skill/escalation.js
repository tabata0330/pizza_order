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
        let get_profile_options = {
            url: 'https://api.line.me/v2/bot/profile/' + sender_id,
            proxy: process.env.FIXIE_URL,
        	json: true,
            headers: {
                'Authorization': 'Bearer {' + process.env.LINE_ACCESS_TOKEN + '}'
            }
        }
        
        debug("レスポンスもらう");
        request.get(get_profile_options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
            	debug("はいった");
                debug(`${body['displayName']}`);
    	    }
        });
        let orig_message = JSON.stringify(event.message);
        debug(`!!!!!!!!!!orig_message: ${orig_message}`);
        
        bot.reply({
        	type: "text",
        	text: `${response.body.userId}の${response.body.displayName}さん。わからないメッセージはやめてください！！！`
        });
    }
};
