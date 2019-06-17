#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const _fs = require('fs');
const path = require('path');
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');

const logo =
  `                                                                                                                                  

88  dP  dP"Yb     db             8b    d8    db    88  dP 888888 88""Yb 
88odP  dP   Yb   dPYb   ________ 88b  d88   dPYb   88odP  88__   88__dP 
88"Yb  Yb   dP  dP__Yb  """""""" 88YbdP88  dP__Yb  88"Yb  88""   88"Yb  
88  Yb  YbodP  dP""""Yb          88 YY 88 dP""""Yb 88  Yb 888888 88  Yb 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`


console.log(chalk.cyan(logo));

program
  .command('init')
  .option('--name', '文件夹名称')
  .action(function (cmd, option) {
    if (typeof cmd === 'string') {
      let proejctName = path.join(process.cwd(), cmd)
      _fs.exists(proejctName, (data) => {
        if (data) {
          inquirer.prompt([{
            type: 'confirm',
            message: '文件名已存在是否替换',
            name: 'ok'
          }]).then(answers => {
            if (answers.ok) {
              fs.emptyDir(proejctName, err => {
                if (err) {
                  console.log(err)
                } else {
                  downloadTemplate(proejctName, cmd)
                }
              })

            } else {
              //console.log('不继续')
            }
          })
        } else {
          fs.ensureDir(proejctName, err => {
            if (err) {
              console.log(err);
            } else {
              downloadTemplate(proejctName, cmd)
            }
          });
        }
      })
    } else {
      console.log('缺少文件名称')
    }
  })
function downloadTemplate(proejctName, cmd) {
  const spinner = ora('downloading template')
  spinner.start();
  download('jkhuangfu/koa-template', proejctName, function (err) {
    spinner.stop();
    console.log(err ? err
      : chalk.green(
        `
        项目生成成功,执行以下命令进行启动: 
        cd ${cmd} 
        npm install 
        npm start
        `
      )
    )
  })
}

program.parse(process.argv)


