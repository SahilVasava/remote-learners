const pool = require('../queries');

module.exports = {
    /** 
     * Create a task and send the response back to the bot
    */
    taskCreate: async (data) => {
        try {
            const { title, done } = data;
            console.log(`data ${title} ${done}`);
            const results = await pool.query('INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *', [title, done]);

            console.log(`results ${JSON.stringify(results.rows)}`);
            return results.rows[0];

        } catch (error) {
            console.error(error);
            return null;
        }
    },


    /** 
     * Show all the tasks of that user
    */
    taskCreate: async (data) => {
        try {
            const { title, done } = data;
            console.log(`data ${title} ${done}`);
            const results = await pool.query('INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *', [title, done]);

            console.log(`results ${JSON.stringify(results.rows)}`);
            return results.rows[0];

        } catch (error) {
            console.error(error);
            return null;
        }
    },

}