const chalk = require('chalk');
const {rollup} = require('rollup');
const options = require('./rollup.config') 

const opt = options('production')
    rollup(opt).then(build=>{
        build.write(opt.output)
        console.log(chalk.green('Electron 构建成功'))
    }).catch(error=>{
        console.log(`${chalk.red("构建失败")}\n`,error)
    })

