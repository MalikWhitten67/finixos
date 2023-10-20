#!/usr/bin/env node
const commander = require('commander');
let apps = [
     {
        'name': 'notepad',
        'path':'/apps/notepad.nw/notepad.html',
        'icon':'./apps/notepad.nw/notepad.png'
     }
]
const { exec } = require('child_process');
 let fs = require('fs')
const program = new commander.Command();
program.version('0.0.1');
program.description('System78 CLI');
program.command('run <app>')
    .description('Run an app')
    .action((app) => {
        try {
            let apg = apps.find(x => x.name === app) 
            let package = require('./package.json')
            fs.writeFileSync('./main.js', `nw.Window.open('${apg.path}')`)
            package.main = 'main.js'
            package['window'] = {
              "icon":apg.icon
            }
            fs.writeFileSync('./package.json', JSON.stringify(package, null, 2))
 
            exec('./nw')
        } catch (error) {
            console.log(`App ${app} not found`, error)
            process.exit(1)
        }
         
    });


program.parse(process.argv);
