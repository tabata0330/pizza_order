'use strict';
const db = require('../db');
const debug = require("debug")("bot-express:skill");


module.exports = class Showtable {
    async finish(bot, event, context, resolve, reject){
        var pizza_list = [];
        db.any('SELECT * FROM pizza')
        .then(function(data){
            var data_s = JSON.stringify(data);
            debug(`入ったpizza${data_s}`);
            pizza_list.push(data);
        })
        .catch(function (error) {
            debug(`error occurred at pizza SELECT`);
        })

        var size_list = [];
        db.any('SELECT * FROM size')
        .then(function(data){
            var data_s = JSON.stringify(data);
            debug(`入ったsize${data_s}`);
            size_list.push(data);
        })
        .catch(function (error) {
            debug(`error occurred at size SELECT`);
        })

        var pizzaes = pizza_list.join(', ');
        var sizes = size_list.join(', ');
        debug(`!!!!!!!!!!!!!!!!!!!!!ピザ${pizzaes}`);
        debug(`!!!!!!!!!!!!!!!!!!!!!サイズ${sizes}`);

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
