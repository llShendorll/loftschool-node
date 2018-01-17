const fs = require('fs');

const deletedFile = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file =>{
            let curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deletedFile(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports = deletedFile;