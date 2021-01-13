const express = require('express');
const expressLayouts = require('express-layouts');

const routes = require('./routes');
const apiRoutes = require('./routes/api_routes');

const connectToMongo = require('./helpers/connectToMongo');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' });
}

// Views engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

// Static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

connectToMongo(process.env.MONGO_URI);

app.use('/', routes);

// API Endpoints
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));