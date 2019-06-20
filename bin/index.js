#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const downloadTemplate = require('../lib/down')
const logo =
  `
  ----------------------------------------------------------------------
  
  KK  KK  OOOOO    AAA    CCCCC  RRRRRR  EEEEEEE   AAA   TTTTTTT EEEEEEE 
  KK KK  OO   OO  AAAAA  CC    C RR   RR EE       AAAAA    TTT   EE      
  KKKK   OO   OO AA   AA CC      RRRRRR  EEEEE   AA   AA   TTT   EEEEE   
  KK KK  OO   OO AAAAAAA CC    C RR  RR  EE      AAAAAAA   TTT   EE      
  KK  KK  OOOO0  AA   AA  CCCCC  RR   RR EEEEEEE AA   AA   TTT   EEEEEEE 

  ----------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
`
console.log(chalk.cyan(logo));
program
  .command('init')
  .option('--name', '< project name >')
  .action(function (cmd, option) {
    if (typeof cmd === 'string') {
      let proejctName = path.join(process.cwd(), cmd)
      fs.pathExists(proejctName, (err,exists) => {
        if (exists) {
          inquirer.prompt([{
            type: 'confirm',
            message: 'file has already exist,replaced ?',
            name: 'ok'
          }]).then(answers => {
            if (answers.ok) {
              fs.emptyDir(proejctName, err => {
                if (err) {
                  console.log(err);
                  process.exit(1);
                } else {
                  downloadTemplate(proejctName, cmd)
                }
              })

            } else {
              process.exit(0);
            }
          })
        } else {
          fs.ensureDir(proejctName, err => {
            if (err) {
              console.log(err);
              process.exit(1);
            } else {
              downloadTemplate(proejctName, cmd)
            }
          });
        }
      })
    } else {
      console.log('please input your project name and run like this "koa-create init koa-project"');
      process.exit(1);
    }
  })

program.parse(process.argv)