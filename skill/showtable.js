'use strict';
const db = require('../db');
const debug = require("debug")("bot-express:skill");


module.exports = class Showtable {
    async finish(bot, event, context, resolve, reject){
        var pizza_list = [];
        db.any('SELECT * FROM pizza')
        .then(function(data){
            pizza_list.push(data);
        })
        .catch(function (error) {
            debug(`error occurred at pizza SELECT`);
        })

        var size_list = [];
        db.any('SELECT * FROM size')
        .then(function(data){
            size_list.push(data);
        })
        .catch(function (error) {
            debug(`error occurred at size SELECT`);
        })

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
