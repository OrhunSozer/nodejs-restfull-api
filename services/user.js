UserModel = require('../models/user');
const Api404Error = require('../errors/Api404Error');

exports.index = function (req, res) {
    UserModel.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};


exports.new = function (req, res) {
    var user = new UserModel();
    user.name = req.body.name ? req.body.name : user.name;
    user.surname = req.body.surname ? req.body.surname : user.surname;
    user.email = req.body.email;
    user.address = req.body.address;
    user.phone = req.body.phone;

    user
    .save()
    .then((data)=>res.json({
        message: 'New user created!',
        data: data
    }))
    .catch((err) =>{throw Error(err)});

    // user.save(function (err) {
    //     // if (err)
    //     //     res.json(err);
    //     res.json({
    //         message: 'New user created!',
    //         data: user
    //     });
    // });
};

exports.view = function (req, res) {
    UserModel.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};


exports.update = function (req, res) {

    UserModel.findById(req.params.user_id, function (err, user) {
        if (err){
            res.send(err);
        }
            
        console.log(user);

        if (user === undefined) {
            throw new Api404Error(`Kullanıcı: ${req.params.user_id} bulunamadı.`);
        }
            
        user.name = req.body.name ? req.body.name : user.name;
        user.surname = req.body.surname ? req.body.surname : user.surname;
        user.email = req.body.email;
        user.address = req.body.address;
        user.phone = req.body.phone;

        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
    
};


exports.delete = function (req, res) {
    UserModel.remove({
        _id: req.params.user_id
    }, function (err, user) {
        
        if (err) res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};