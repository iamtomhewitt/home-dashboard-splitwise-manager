const express = require('express');
const loaders = require('./loaders');

async function startServer() {
  const app = express();
  await loaders(app);

  app.listen(process.env.PORT || 3001, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Server ready!');
  });
}

startServer();