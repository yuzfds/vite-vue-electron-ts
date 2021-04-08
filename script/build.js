const dotenv = require('dotenv');
const path = require('path');
const electron = require('electron');
const chalk = require('chalk');
const {rollup, watch} = require('rollup');
const {spawn} = require('child_process');
const minimist = require('minimist');
const options = require('./rollup.config') 
const packageJSON = require('../package.json');
const {get} = require('http')

dotenv.config({path: path.join(__dirname, '../.env')}) 
const argv = minimist(process.argv.slice(2))
const opt = options('production')


if(argv.watch){
    waitOn().then(msg=>{
        let child;
        const watcher = watch(opt)
        watcher.on('change', filename=>{
            const log =  chalk.green(`change --${filename}`)
            console.log(log)
        })
        watcher.on('event', ev=>{
            if(ev.code === 'END') {
                if(child) child.kill()
                child = spawn(electron, [path.join(__dirname, `../${packageJSON.main}`)])
                console.log(chalk.green('启动Electron....'))
            }
        })
    })
   
}else{
    rollup(opt).then(build=>{
        build.write(opt.output)
        console.log(chalk.green('Electron 构建成功'))
    }).catch(error=>{
        console.log(`${chalk.red("构建失败")}\n`,error)
    })
}




function waitOn(port=8099, interval=449){
    return new Promise(resolve=>{
        const url = `http://localhost:${port}/`
        const timer = setInterval(()=>{
            get(url, res=>{
                clearInterval(timer)
                console.log('[waitOn]', chalk.green(`vue构建已完成`))
                resolve(res.statusCode)
            })
        }, interval)
    })
}


