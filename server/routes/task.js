const express = require('express')
const router = express.Router()
const { taskController } = require('../controllers');

router.route('/').get(taskController.taskGetAll);


module.exports = router