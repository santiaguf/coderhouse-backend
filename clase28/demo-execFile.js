const { execFile } = require('child_process');

execFile(__dirname +'/prueba.sh', (error, stdout, stderr) => {

  if (error) {
    console.log('error:', error);
    return;
  }

  if (stderr) {
    console.log('stderr:', stderr);
    return;
  }

  console.log('stdout:', stdout);

})