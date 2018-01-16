const fs = require('fs');

const deletedFile = async (path, callback = () =>{}) => {
    try {
        if (fs.existsSync(path)) {
            await fs.rmdirSync(path);
            return callback(null, 'done');
        }
    } catch (error) {
        return callback(error);
    }


};

module.exports = deletedFile;