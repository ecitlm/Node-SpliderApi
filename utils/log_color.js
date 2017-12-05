/*
 * @Author: ecitlm
 * @Date:   2017-11-30 23:00:03
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:21:06
 */
colors = require('colors'); //控制台彩色输出
module.exports = colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
});