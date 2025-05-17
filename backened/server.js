const app = require('./src/app');
require('dotenv').config();

app.listen(3131, () => {
console.log('Server is running on port 3131');
});