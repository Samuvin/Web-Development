const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('Connected');
});

const app = require('./app');
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
