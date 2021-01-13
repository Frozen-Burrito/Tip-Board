const express = require('express');
const routes = require('./routes/api_routes');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' });
}

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));