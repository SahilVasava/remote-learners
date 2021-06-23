import { Task, User } from '../db';

module.exports = {
    /** 
     * Create a task and send the response back to the bot
    */
    taskCreate: async (data) => {
        try {
            const { title, done, twitchId, username } = data;
            let user = await User.findOne({
                where: {
                    twitchId
                }
            });
            if (!user) {
                user = await User.create({ username, twitchId });
            }
            const results = await Task.create({ title, done, UserId: user.id })

            //console.log(`results ${JSON.stringify(results)}`);
            return results;

        } catch (error) {
            console.error(error);
            return null;
        }
    },


    /** 
     * Show all the tasks of that user
    */
    taskGetAll: async (data) => {
        try {
            const { twitchId } = data;

            const results = await Task.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitchId'],
                        where: { 'twitchId': twitchId }
                    }
                ],
            });
            //console.log(`results ${JSON.stringify(results)}`);
            return results;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /** 
     * Update the task
    */
    taskUpdate: async (data) => {
        try {

            const { id, done, twitchId } = data;
            const task = await Task.findOne({
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitchId'],
                        where: { 'twitchId': twitchId }
                    }
                ],
                where: { id: id },
            });
            if (!task) {
                return null;
            }
            console.log(task)
            const results = await task.update({ id, done }, {
                where: { id }
            });
            //console.log(`results ${JSON.stringify(results)}`);
            return results;

        } catch (error) {
            console.error(error);
            return null;
        }
    },
}