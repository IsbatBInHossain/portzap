#!/usr/bin/env node
import { program } from 'commander'
import { listCommand } from '../src/commands/listCommand.js'
import { zapCommand } from '../src/commands/zapCommand.js'
import { infoCommand } from '../src/commands/infoCommand.js'

program
  .name('portzap')
  .description(
    'A simple CLI tool for managing and killing processes on specific ports'
  )
  .version('0.0.1-alpha')

// Add zap command
program.addCommand(listCommand)
program.addCommand(zapCommand)
program.addCommand(infoCommand)

program.parse()
