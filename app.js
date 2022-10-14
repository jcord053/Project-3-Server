require('dotenv/config')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const { isAuthenticated } = require('./middlewares/jwt.middleware');

//const jsonParser = express.json;

// 'mongodb://localhost:27017/project3Golf'

// process.env.MONGODB_URI


mongoose.connect(process.env.MONGODB_URI)
  .then(connectObject => {
    console.log(`connected to db ${connectObject.connections[0].name}`);
  })
  .catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: [
    process.env.FRONTEND_URL
  ]
}))

app.use(express.json());

const courseRoutes = require('./routes/course.routes');

app.use('/api', isAuthenticated, courseRoutes);

const scorecardRoutes = require('./routes/scorecard.routes');

app.use('/api', isAuthenticated, scorecardRoutes);

const authRoutes = require('./routes/auth.routes');

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log('hey we are listening on port ' + process.env.PORT)
});