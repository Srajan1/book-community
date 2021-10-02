const fs = require('fs');
const path = require('path');
module.exports = function(app, router) {

    fs
  .readdirSync(__dirname + '/api').forEach(function(folder){
      fs.readdirSync(__dirname + '/api/' + folder)
      .filter(file => {
        return (file === 'route.js');
      })
      .forEach(file => {
        require(path.join(__dirname + '/api/' + folder + '/', file))(router);
      })
  })
  
    app.use(router);
}