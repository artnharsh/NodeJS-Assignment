const express = require('express');
require('dotenv').config();
const cors = require('cors');
const schoolRoutes = require('./routes/schoolr');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
