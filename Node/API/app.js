const morgan = require('morgan');
const express = require('express');
const app = express();
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoute');
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello from the server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('Post Method');
// });

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', GetAllTours);
// app.post(`/api/v1/tours`, CreateTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch(`/api/v1/tours/:id`, UpdateTour);
// app.delete(`/api/v1/tours/:id`, DeleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;
