'use strict';
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;
const debug = require("debug")("bot-express:skill");



module.exports = class Escalation {
    async finish(bot, event, context, resolve, reject){
        let tasks = [];

        // Reply to sender.
        tasks.push(bot.reply({
            type: "text",
            text: "すぐ調べます。ちょっとお待ちを。"
        }));
		debug(`hoge`);
		debug(`${bot}`)
		tasks.push(
            Promise.resolve()
            .then((response) => {
                // Get sender's displayName.
                let sender_id = bot.extract_sender_id();
                debug(`${sender_id}の表示名ゲットしてる`);
                let disname = bot.plugin.line.sdk.getProfile(sender_id);
                debug("ゲットできた!!");
                return dispname;
            })
            .then((response) => {
            	debug(`1`);
                if (!response){
                    return Promise.reject(new Error(`Sender user not found.`));
                }
                debug(`displayName: ${response.displayName}`);
                let orig_message = JSON.parse(JSON.stringify(event.message));
                debug(`orig_message: ${orig_message}`);
            	bot.reply({
					type: "text",
					text: `${response.displayName}さんの${orig_message}がわかりませんでした。`
            	})
            })
        );
        return Promise.all(tasks).then((response) => {
            return resolve();
        }).catch((error) => {
        	debug(`ダメでした`);
            return reject();
        });
    }
};
