const fs = require('fs');
const fileName = './plates.json';
const PLATES = getPlateData();

module.exports = function (app) {
  app.get("/plates", function(request, response) {
    response.send(PLATES);
  });

  app.get("/plates/:id", function(request, response) {
    response.send(
      PLATES.filter(plate => plate.id === request.params.id)[0]
    );
  });
};

function getPlateData() {
    var data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}
