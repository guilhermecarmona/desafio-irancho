require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use((err, request, response, next) => {
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
