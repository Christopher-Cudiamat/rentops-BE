const express = require('express');
const connectDB = require('./config/dbConnect');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const app = express();

connectDB();

//Middlewares
app.use(morgan('server'));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json({extended:false}));
app.use('/uploads', express.static('uploads'))

app.get('/', (req,res) => res.send('API IS UP AND RUNNING'));

//Define Routes
app.use('/api/structure', require('./routes/api/structure'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/property', require('./routes/api/properties'));

app.use(passport.initialize());
require('./passport')(passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));