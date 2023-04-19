const bcrypt = require('bcryptjs'); // na npm sajtot za bcrypt da se procita povekje; za hash isto

const jwt= require('jsonwebtoken');
const { validate, Account, AccountLogin } = require('../pkg/account/validate');
const userAccount = require('../pkg/account');
const config = require('../pkg/config');

//handlers za login, register, refreshToken, forgotPassword, resetPassword

//login handler
const login = async (req, res) => {
    try {
        await validate(req.body, AccountLogin);
        const acc = await account.getByEmail(req.body.email);
        if(!acc) {
            throw {
                code: 400,
                error: 'Account not found!'
            };
        }
        if(!bcrypt.compareSync(req.body.password, acc.password)) { // sporeduvanje na pass, prvoto e plain text dr e hash
            throw {
                code: 400,
                error: 'Incorrect password'
            };
        }
        const payload = {
            fullname: acc.fullname,
            email: acc.email,
            id: acc._id,
            exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
        };
        const token = jwt.sign(payload, config.get('development').jwt_key);
        return res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err);
    }
};

//register handler
const register = async (req, res) => {
    try {
        await validate(req.body, Account);
        const exists = await account.getByEmail(req.body.email);
        if(exists) {
            throw {
                code: 400,
                error: 'Account with this email already exists!'
            };
        }
        req.body.password = bcrypt.hashSync(req.body.password);
        const acc = await account.create(req.body);
        return res.status(201).send(acc);
    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err.error);
    }
};

// refreshToken handler
const refreshToken = async (req, res) => {
    try {
        const payload = {
            ...req.user,
            exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60 
        };
        const token = jwt.sign(payload, config.get('development)').jwt_key);
        return res.send({ token });

    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err);
    }
};

// forgotPassword handler; user requests new token to create a new password, old password is forgotten
const forgotPassword = async () => {
    try {
        const exists = await account.getByEmail(req.body.email);
        if (!exists) {
            throw {
                code: 400,
                error: 'Account with this email already exists!'
            }
        }
        //here we need to generate new jwt token when user clicks on mail confirmation
        //see mailgun for more --> npmjs package mailgun
        return res.send('OK!');
    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err);
    }
};

//resetPassword handler: user wants to change the password, already knows it but wants a new one
const resetPassword = async () => {
    try {
        const userEmail = req.user.email;
        const oldPassword = req.body.old_password;
        const oldPasswordHashed = bcrypt.hashSync(oldPassword);
        const checkPassword = await account.getByEmail(userEmail);
        if(account.password !== oldPasswordHashed) {
            throw {
                code: 400,
                error: 'Incorrect password!'
            };
        }

        const newPassword = req.body.new_password;
        const newPasswordHashed = bcrypt.hashSync(newPassword);
        if(newPasswordHashed === oldPasswordHashed) {
            throw {
                code: 400,
                error: 'Old password cannot be new password!'
            };
        }

        //create a new function to change the user password in index.js
        const test = await account.setNewPassword(userAccount._id, newPasswordHashed);

        return res.send('OK!');
    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err);
    }
};


module.exports = {
    login,
    register,
    refreshToken,
    forgotPassword,
    resetPassword
};