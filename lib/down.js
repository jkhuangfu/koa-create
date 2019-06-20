const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const c_process = require('child_process');

const downloadTemplate = (proejctName, cmd) => {
    const spinner = ora('downloading template')
    spinner.start();
    download('jkhuangfu/koa-template', proejctName, function (err) {
        spinner.stop();
        if (err) {
            console.log(err);
            process.exit(1)
        } else {
            let info = ora('downloading dependencies');
            info.start();
            c_process.exec(`cd ${cmd} && npm install`, function (error, stdout, stderr) {
                info.stop();
                if(error){
                    console.log(err);
                    process.exit(1)
                }else{
                  console.log(chalk.green(
                      `
                      create project success

                      cd ${cmd} && npm start run your project
                      `
                  ))  
                  process.exit(0)
                }
            })
        }
    })
}

module.exports = downloadTemplate;