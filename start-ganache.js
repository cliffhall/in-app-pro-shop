const {spawn} = require('child_process');
const keys = require('./.project_keys');

const ganache = spawn('ganache-cli',['-p 7545', '-d', `-m '${keys.mnemonic}`, '-l 8000000']);

ganache.stdout.on('data', (data) => {
    console.log(`${data}`);
});

ganache.stderr.on('data', (data) => {
    console.log(`ERROR: ${data}`);
});

ganache.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});