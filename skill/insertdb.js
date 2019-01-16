'use strict';
const debug = require("debug")("bot-express:skill");


module.exports = class Insertdb {
    constructor() {
        this.required_parameter = {
            pizza: {
                message_to_confirm: {
                    type: "text",
                    altText: "登録したいピザを教えてください",
                }
            },
            size: {
                message_to_confirm: {
                    type: "text",
                    altText: "登録したいサイズを教えてください",
                }
            }
        };
    }

    async finish(bot, event, context, resolve, reject){
        let pizza = context.confirmed.pizza;
        let size = context.confirmed.size;

        let messages = [
        	{
        		type: "text",
        		text: `${pizza}, ${size}をデータベースに入れるよ〜`
        	}
        ];
        await bot.reply(messages);
    }
};
