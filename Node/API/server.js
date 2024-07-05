const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
