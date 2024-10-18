const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const authenticateToken = require('./middlewares/authMiddleware');
const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());

const local = './config/initDb'
const initDb = require(local);
initDb();

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('Route.js')) {
        const route = require(path.join(routesPath, file));
        const routeName = file.replace('Route.js', '').toLowerCase();
        app.use(`/api/${routeName}`, authenticateToken, route);
    }
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
