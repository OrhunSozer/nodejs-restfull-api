
let router = require('express').Router();


router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Hello World!',
    });
});

var userController = require('../services/user');

router.route('/Users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;