const express = require('express');
const Car = require('../models/Car');
const carControllerRoutes = express.Router();

carControllerRoutes.post('/cars/create', async (req, res) => {
    try {
        const car = await Car.create(req.body);
        return res.status(201).json(car);
    } catch (error) {
        console.error('Erro ao cadastrar o carro no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

carControllerRoutes.get('/cars/list', async (req, res) => {
    try {
        const cars = await Car.findAll();
        return res.status(200).json(cars);
    } catch (error) {
        console.error('Erro ao consultar carros no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

carControllerRoutes.get('/cars/get/:id', async (req, res) => {
    const carId = req.params.id;
    try {
        const car = await Car.findByPk(carId);
        if (car) {
            return res.status(200).json(car);
        } else {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar carro no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

carControllerRoutes.delete('/cars/delete/:id', async (req, res) => {
    const carId = req.params.id;
    try {
        const car = await Car.findByPk(carId);
        if (car) {
            await car.destroy();
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir carro no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = carControllerRoutes;
