const app = require('./app');
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
