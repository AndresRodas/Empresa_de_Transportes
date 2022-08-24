const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', (req, res) => res.status(200).json({'message': 'pong'}))
app.use('/vehicle', require('./routes/carRoutes'));
// app.use('/pilot', require('./routes/pilotRoutes'));

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;