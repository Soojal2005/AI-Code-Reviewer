const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3131;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
