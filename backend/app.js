require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectMongo = require('./config/mongo');

const estudiantesRoutes = require('./routes/estudiantes.routes');
const syncRoutes = require('./routes/sync.routes');

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Conexión a MongoDB
connectMongo()
  .then(() => console.log('MongoDB listo para usar'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// 🔹 Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/sync', syncRoutes);

// 🔹 Ruta base
app.get('/', (req, res) => {
  res.send('API Instituto funcionando correctamente');
});

// 🔹 Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
