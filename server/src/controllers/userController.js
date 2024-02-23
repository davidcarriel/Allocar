const express = require('express');
const User = require('../models/User');
const userControllerRoutes = express.Router();

userControllerRoutes.post('/users/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email,
                password: password,
            },
        });

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(401).json({ message: 'Credenciais inválidas' });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

userControllerRoutes.post('/users/signup', async (req, res) => {
    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Usuário cadastrado com sucesso!'
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'Erro, usuário não cadastrado!'
        });
    });
});

userControllerRoutes.get('/users/list', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao consultar usuários no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

userControllerRoutes.get('/users/get/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

userControllerRoutes.put('/users/update/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update(req.body);
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

userControllerRoutes.delete('/users/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = userControllerRoutes;
