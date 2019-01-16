'use strict';
const db = require('../db');
 
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
        let pizzaStmt = `INSERT INTO pizza (name) VALUES ($1)`;
        let sizeStmt = `INSERT INTO size (size) VALUES ($1)`;
        
        db.any(pizzaStmt, [pizza])
        .then(function(data){
            debug("pizza insert success!!");
        })
        .catch(function(error){
            debug("pizza insert error…");
        });
        db.any(sizeStmt, [size])
        .then(function(data){
            debug("size insert success!!");
        })
        .catch(function(error){
            debug("size insert error…");
        });
        // client.query(pizzaStmt);
        // client.query(sizeStmt);
        // client.end();

        let messages = [
        	{
        		type: "text",
        		text: `${pizza}, ${size}をデータベースに入れるよ〜`
        	}
        ];
        await bot.reply(messages);
    }
};
