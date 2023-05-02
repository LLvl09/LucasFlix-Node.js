const mongoose = require('mongoose');
const User = mongoose.model('User');
const ValidationContract = require('../validators/fluentValidator');
const bcrypt = require('bcrypt');
const LoginDto = require('../models/Dtos/LoginDto');



exports.login = async (req, res) => {
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