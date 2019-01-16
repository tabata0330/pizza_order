'use strict';
const debug = require("debug")("bot-express:skill");


module.exports = class Insertdb {
    async finish(bot, event, context, resolve, reject){
        let messages = [
        	{
        		type: "text",
        		text: "データベースに入れるよ〜"
        	}
        ];
        await bot.reply(messages);
    }
};
