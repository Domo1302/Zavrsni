const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swagger/swagger');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');

dotenv.config(); 

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', productRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
