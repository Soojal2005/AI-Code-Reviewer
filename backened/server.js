const app = require('./src/app');
require('dotenv').config();
const URL = 3131;
app.listen(URL, () => {
console.log('Server is running on port 3131');
});
