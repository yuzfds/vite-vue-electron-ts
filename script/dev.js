const {watch} = require('rollup');
const {spawn} = require('child_process');
const electron = require('electron');
const options = require('./rollup.config') 
const path = require('path');
const chalk = require('chalk');
const dotenv = require('dotenv');

const opt = options('production')

dotenv.config({path: path.join(__dirname, '.env')}) 


export function devElectron(server){
    let child;
    const watcher = watch(opt)
    watcher.on('change', filename=>{
        const log =  chalk.green(`change --${filename}`)
        console.log(log)
    })
    watcher.on('event', ev=>{
        if(ev.code === 'END') {
            if(child) child.kill()
            child = spawn(electron, [path.join(__dirname, 'src/main/index.ts')])
            console.log(chalk.green('启动Electron....'))
        }
    })
}

