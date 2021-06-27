
import { Task, User } from '../db';

module.exports = {


    /** 
     * Show all the tasks of that user
    */
    taskGetAll: async (req, res, next) => {
        try {

            //const results = await Task.findAll({
            //    include: [
            //        {
            //            model: User,
            //            attributes: ['username', 'twitchId'],
            //        }
            //    ],
            //});
            const results = await User.findAll({
                include: [
                    'tasks'

                ],
                order: [
                    ['tasks', 'updatedAt', 'DESC']
                ]
            });
            console.log(`results ${JSON.stringify(results)}`);
            res.json({ results });

        } catch (error) {
            console.error(error);
            res.status(error.status || 500).send();
        }
    },

}