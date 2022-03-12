const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    const {username, password} = req.body;
    // hashes the password with 12 CharacterData.
    const hashPassword = await bcrypt.hash(password,12);
    try {
        const newUser = await User.create({
            username,
            password: hashPassword
        });
        req.session.user = newUser;
        res.status(200).json({
            status: "Success",
            data: {
                newUser
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Fail"
        });
    }

}

exports.showUser = async (req, res) => {
    try {
        const newUsers = await User.find()
        res.status(200).json({
            status: "Success",
            result: newUsers.length,
            data: {
                newUsers
            }
        });
    }
    catch(e) {
        res.status(400).json({
            status: "Fail"
        });
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
             res.status(400).json({
                status: "Username Doesn't Exists"
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect) {
            req.session.user = user; // this done to store user data in redis session.
            res.status(200).json({
                status: "Success",
                data: {
                    user
                }
            });
        }
        else {
            res.status(400).json({
                status: "Fail",
                
            });
        }
    }
    catch(e) {
        console.log(e)
        res.status(400).json({
            status: "Fail"
        });
    }
}