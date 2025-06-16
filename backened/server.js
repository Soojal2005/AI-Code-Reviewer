const app = require('./src/app');
require('dotenv').config();
const URL = ' https://render.com/docs/web-services#port-binding';
app.listen(URL, () => {
console.log('Server is running on port 3131');
});
