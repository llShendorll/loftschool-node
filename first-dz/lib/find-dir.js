const fs = require('fs');
const path = require('path');

let arr = [];

const findFiles = async (url, level, callback = () => {}) => {
    if (!url) {
        const err = {Error: 'Ошибка в Url'};
        return callback(err);
    }

    const files = await fs.readdirSync(url);

    files.forEach(file => {
        let ext = path.parse(file).ext;
        let filePath = path.join(url, file);
        let state = fs.statSync(filePath);
        if (state.isDirectory()) {
            findFiles(filePath, callback);
        }
        if (ext && ext === '.png') {
            arr.push({dist: filePath, name: file, folderName: file.charAt(0)});
        }
    });

    return callback(null, arr);

};

module.exports = findFiles;

