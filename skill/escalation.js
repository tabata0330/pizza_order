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
        let get_profile_options = {
            url: 'https://api.line.me/v2/bot/profile/' + sender_id,
        	json: true,
            headers: {
                'Authorization': 'Bearer {' + process.env.LINE_ACCESS_TOKEN + '}'
            }
        }
        let display_name = '';
        let pict = '';
        request.get(get_profile_options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
            	display_name = body['displayName'];
            	pict = body['pictureUrl'];
            	debug(`中first${display_name}, ${pict}`);
            	debug(`中second${body['displayName']}, ${body['pictureUrl']}`);
    	    }else if(error){
    	    	debug("ダメでした");
    	    }
        });
        debug(`外${display_name}, ${pict}`);
        let orig_message = JSON.parse(JSON.stringify(event.message));
        bot.reply({
        	type: "text",
        	text: `${display_name}さん。${orig_message['text']}のようなわからないメッセージはやめてください！！！${pict}晒しますよ！！`
        });
    }
};
