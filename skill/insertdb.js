'use strict';
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../db/pizzabot.db');

const debug = require("debug")("bot-express:skill");


module.exports = class Insertdb {
    constructor() {
        this.required_parameter = {
            pizza: {
                message_to_confirm: {
                    type: "text",
                    text: "登録したいピザを教えてください"
                }
            },
            size: {
                message_to_confirm: {
                    type: "text",
                    text: "登録したいサイズを教えてください"
                }
            }
        };
    }

    async finish(bot, event, context, resolve, reject){
        let pizza = context.confirmed.pizza;
        let size = context.confirmed.size;
        db.serialize(() =>{
            const pizzaStmt = db.prepare('INSERT INTO pizza (name) VALUES (?)');
            pizzaStmt.run([pizza]);
            const sizeStmt = db.prepare('INSERT INTO size (size) VALUES (?)');
            sizeStmt.run([size]);
        })

        let messages = [
        	{
        		type: "text",
        		text: `${pizza}, ${size}をデータベースに入れるよ〜`
        	}
        ];
        await bot.reply(messages);
    }
};
