const path = require('path');
const fs = require('fs');

module.exports = function(app) {
    fs.readdirSync(path.join(__dirname, '../','routes/api')).forEach(function(file) {
        if (file == "index.js") return;
        const name = file.substr(0, file.indexOf('.'));
        const routerPath = path.join(__dirname, '../','routes/api', name);
        app.use('/api', require(routerPath));
    });
};
