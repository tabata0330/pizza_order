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

        // Send escalation message to admin.
        let messages_to_admin = [];
        tasks.push(
            Promise.resolve()
            .then((response) => {
                // Get sender's displayName.
                debug(`use_id is ${bot.plugin.line.sdk.getProfile(bot.extract_sender_id())}`)
                return bot.plugin.line.sdk.getProfile(bot.extract_sender_id());
            })
            .then((response) => {
            	debug(`in`);
                if (!response){
                    return Promise.reject(new Error(`Sender user not found.`));
                }

                messages_to_admin.push({
                    type: "text",
                    text: `${response.displayName}さんからいただいた次のメッセージがわかりませんでした。`
                });

                let orig_message = JSON.parse(JSON.stringify(event.message));
                delete orig_message.id;
                messages_to_admin.push(orig_message);

                messages_to_admin.push({
                    type: "text",
                    text: "如何しようも無い"
                });

                // Send message to admin.
                return bot.send(LINE_ADMIN_USER_ID, messages_to_admin);
            })
        );

        return Promise.all(tasks).then((response) => {
            return resolve();
        }).catch((error) => {
            return reject();
        });
    }
};
