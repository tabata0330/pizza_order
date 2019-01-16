'use strict';
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../db/pizzabot.db');

const debug = require("debug")("bot-express:skill");


module.exports = class Showtable {
    async finish(bot, event, context, resolve, reject){
        var pizza_list = [];
        db.each('SELECT * FROM pizza', (error, row) => {
            if(error) {
              console.error('Error!', error);
              return;
            }
            pizza_list.push(row.name);
        });

        var size_list = [];
        db.each('SELECT * FROM size', (error, row) => {
            if(error) {
              console.error('Error!', error);
              return;
            }
            size_list.push(row.size);
        });

        var pizzaes = pizza_list.join(', ');
        var sizes = size_list.join(', ');

        let messages = [
        	{
        		type: "text",
        		text: `現在登録されてるピザは${pizzaes}です。`
            },
            {
        		type: "text",
        		text: `現在登録されてるサイズは${sizes}です。`
            }
        ];
        await bot.reply(messages);
    }
};