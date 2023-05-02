const mongoose = require('mongoose');
const User = mongoose.model('User');
const ValidationContract = require('../validators/fluentValidator');
const bcrypt = require('bcrypt');
const LoginDto = require('../models/Dtos/LoginDto');
const jwt = require('jsonwebtoken');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'The name must contain at least 3 characters');
    contract.hasMinLen(req.body.password, 6, 'The password must contain at least 3 characters');
    contract.isEmail(req.body.email, 'Your email is invalid');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const user = new User(req.body);

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);
        user.password = passwordHash;

        let exist = await User.findOne({ email: user.email })

        if (exist === null) {
            await user.save();
            res.status(201).send({ message: 'Your email has been succefully registred' });
        }
        if (exist.email === user.email) {

            res.status(400).send({ message: 'This email already exist' });
        }


    } catch (e) {
        res.status(500).send({ message: 'Failed to register the user', data: e });
    }
}

exports.login = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.isEmail(req.body.email, 'O email é invalido');

    if (!req.body.email) {
        res.status(400).send({ message: 'O email é obrigatorio!' });
    }
    if (!req.body.password) {
        res.status(400).send({ message: 'A senha é obrigatoria!' });
    }

    try {
        const userLogin = new LoginDto(req.body);
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist === null) {
            res.status(400).send({ message: 'Usuario ou senha incorrétos!' });

        } else {
            const senhaUsuario = userExist.password;


            const comparacao = await bcrypt.compare(userLogin.password, senhaUsuario);


            if (comparacao) {
                const secret = process.env.SECRET_TOKEN;
                const token = jwt.sign({
                    id: userExist.id
                },
                    secret, {
                    expiresIn: 3600
                });

                res.status(200).send({ message: 'Login efetuado com sucesso!', token: `${token}` });

            }
            else {
                res.status(401).send({ message: 'Usuario ou senha incorrétos!' });
            }
        }
    } catch (e) {
        res.status(500).send({ message: 'Falha ao fazer login!', data: e });
    }
}