'use strict';
const { Client } = require('pg');
const prepare = require('pg-prepare');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
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
        let pizzaStmt = prepare`INSERT INTO pizza (name) VALUES (${pizza})`;
        let sizeStmt = prepare`INSERT INTO size (size) VALUES (${size})`;

        client.query(pizzaStmt);
        client.query(sizeStmt);
        client.end();

        let messages = [
        	{
        		type: "text",
        		text: `${pizza}, ${size}をデータベースに入れるよ〜`
        	}
        ];
        await bot.reply(messages);
    }
};
