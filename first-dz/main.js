const readline = require('readline');
const findFiles = require('./lib/find-dir');
const copyFiles = require('./lib/copy-file');
const deletedFiles = require('./lib/deleted-file');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function call(value, callback = () => {}) {
    rl.resume();
    rl.question(value, (answer) => {
        callback(answer);
        rl.pause();
    });
}
(function () {
    call('Введите url папки с фотками ', (source) => {
        // получшение данных о копируемых файлах,
        findFiles('/node-dz/first-dz/screen-one', 0, (err, files) => {
            //console.log(files);
            if (err) {
                console.log(err);
                process.exit(1);
            }
            call('введите новую папку ', newDist => {
                copyFiles(files, '/node-dz/first-dz/screen-one-new1', (error) => {
                    if (error) {
                        console.log(error);
                        process.exit(1);
                    }
                    call('Удалить файлы? (Yes/No): ', (response) => {
                        if (response === 'yes') {
                            deletedFiles(source)
                        } else {
                            console.log('nooooooooop')
                        }
                    });
                });
            })

        })
    });

})();