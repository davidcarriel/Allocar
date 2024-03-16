const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();

//const db = require('./models/db');
const userControllerRoutes = require('./controllers/userController');
const carControllerRoutes = require('./controllers/carController');
const requestControllerRoutes = require('./controllers/requestController');
const allocationControllerRoutes = require('./controllers/allocationController');

app.use(express.json());
app.use(cors());
app.use(userControllerRoutes, carControllerRoutes, requestControllerRoutes, allocationControllerRoutes);

router.use(cors({
    credentials: true,
    origin: "http://localhost:3001"
}))

app.listen(3000, () => {
    console.log('Server na porta 3000');
});
