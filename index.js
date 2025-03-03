import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import boxen from 'boxen'
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'
console.log('Preparo cescobot...')
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) 
const { name, author } = require(join(__dirname, './package.json')) 
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdtdout)

say('\ncescobot\nbot', {
font: 'block',
align: 'center',
color: ['cyan', 'green']})

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]

  say('developed by cescobot', {
    font: 'console',
    align: 'center',
    color: ['cyan', 'blue']
  })

  try {
    setupMaster({
      exec: args[0],
      args: args.slice(1),
    })
    let p = fork()
    p.on('message', data => {
      console.log('[REINVIA LA RISPOSTA]', data)
      switch (data) {
        case 'reset':
          p.process.kill()
          isRunning = false
          start.apply(this, arguments)
          break
        case 'uptime':
          p.send(process.uptime())
          break
      }
    })

    p.on('exit', (_, code) => {
      isRunning = false
      console.error('Errore inaspettato contattare +39 375 585 3799', code)
      p.process.kill()
      isRunning = false
      start.apply(this, arguments)

      if (code === 0) return
      watchFile(args[0], () => {
        unwatchFile(args[0])
        start(file)
      })
    })
    
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
    if (!opts['test'])
      if (!rl.listenerCount()) rl.on('line', line => {
        p.emit('message', line.trim())
      })

  } catch (error) {
    console.error("Errore durante l'avvio del processo:", error)
  }
}

p.process.kill()
isRunning = false
start.apply(this, arguments)
  
if (code === 0) return
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)})})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())})}
start('cesco.js')
