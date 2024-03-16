const express = require('express');
const Allocation = require('../models/Allocation');
const allocationControllerRoutes = express.Router();

allocationControllerRoutes.post('/allocations/create', async (req, res) => {
    try {
        const allocation = await Allocation.create(req.body);
        return res.status(201).json(allocation);
    } catch (error) {
        console.error('Erro ao criar alocação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

allocationControllerRoutes.get('/allocations/list', async (req, res) => {
    try {
        const allocations = await Allocation.findAll();
        return res.status(200).json(allocations);
    } catch (error) {
        console.error('Erro ao consultar alocações no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

allocationControllerRoutes.get('/allocations/get/:id', async (req, res) => {
    const allocationId = req.params.id;
    try {
        const allocation = await Allocation.findByPk(allocationId);
        if (allocation) {
            return res.status(200).json(allocation);
        } else {
            return res.status(404).json({ message: 'Alocação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao consultar alocação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

allocationControllerRoutes.put('/allocations/update/:id', async (req, res) => {
    const allocationId = req.params.id;
    try {
        const allocation = await Allocation.findByPk(allocationId);
        if (allocation) {
            await allocation.update(req.body);
            return res.status(200).json(allocation);
        } else {
            return res.status(404).json({ message: 'Alocação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar alocação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

allocationControllerRoutes.delete('/allocations/delete/:id', async (req, res) => {
    const allocationId = req.params.id;
    try {
        const allocation = await Allocation.findByPk(allocationId);
        if (allocation) {
            await allocation.destroy();
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: 'Alocação não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao excluir alocação no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = allocationControllerRoutes;
