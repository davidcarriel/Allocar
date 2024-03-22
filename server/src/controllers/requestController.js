const express = require('express');
const User = require('../models/User');
const Request = require('../models/Request');
const requestControllerRoutes = express.Router();

requestControllerRoutes.post('/requests/create', async (req, res) => {
    try {
        const request = await Request.create(req.body);
        return res.status(201).json(request);
    } catch (error) {
        console.error('Erro ao criar solicitação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

requestControllerRoutes.get('/requests/list', async (req, res) => {
    try {
        const requests = await Request.findAll();
        return res.status(200).json(requests);
    } catch (error) {
        console.error('Erro ao consultar solicitações no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

requestControllerRoutes.get('/requests/get/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        const request = await Request.findByPk(requestId);
        if (request) {
            return res.status(200).json(request);
        } else {
            return res.status(404).json({ message: 'Solicitação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao consultar solicitação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

requestControllerRoutes.put('/requests/update/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        const request = await Request.findByPk(requestId);
        if (request) {
            await request.update(req.body);
            return res.status(200).json(request);
        } else {
            return res.status(404).json({ message: 'Solicitação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar solicitação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

requestControllerRoutes.delete('/requests/delete/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        const request = await Request.findByPk(requestId);
        if (request) {
            await request.destroy();
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: 'Solicitação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao excluir solicitação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

requestControllerRoutes.get('/requests/list/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const requests = await Request.findAll({ where: { user_id: userId } });

        return res.status(200).json(requests);
    } catch (error) {
        console.error('Erro ao consultar solicitações do usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = requestControllerRoutes;
