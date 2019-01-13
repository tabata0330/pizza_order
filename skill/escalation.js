'use strict';
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;


module.exports = class Escalation {
    async finish(bot, event, context){
        let tasks = [];

        // Reply to sender.
        tasks.push(bot.reply({
            type: "text",
            text: "すぐ調べます。ちょっとお待ちを。"
        }));

		tasks.push(
            Promise.resolve()
            .then((response) => {
                // Get sender's displayName.
                return bot.plugin.line.sdk.getProfile(bot.extract_sender_id());
            })
            .then((response) => {
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
            return reject();
        });
    }
};
