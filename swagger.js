const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

module.exports = function (app) {
  const file = fs.readFileSync('./swagger.yaml', 'utf8'); // or swagger.json
  const swaggerDocument = yaml.parse(file);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // This serves raw openapi.json for Keploy
  app.get('/openapi.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });
};
