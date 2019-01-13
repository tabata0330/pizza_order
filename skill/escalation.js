'use strict';

module.exports = class Escalation {
    async finish(bot, event, context){
        let message = {
            type: "text",
            text: `日本語喋れバーカ`
        };

        await bot.reply(message);
    }
};
