const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res.json({ message: 'Hello from the server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('Post Method');
// });

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({});
});

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
