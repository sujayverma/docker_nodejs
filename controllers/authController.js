const User = require('../models/userModel');


exports.signUp = async (res, req, next) => {
    try {
        console.log(req); console.log('Hi');
        res.json({
            status: 200
        });
        //const newUser = await User.create(req.body);
        // res.status(200).json({
        //     status: "Success",
        //     data: {
        //         newUser
        //     }
        // });
    } catch (e) {
        res.json(e);
        // res.status(400).json({
        //     status: "Fail"
        // });
        console.log(e);
    }


}