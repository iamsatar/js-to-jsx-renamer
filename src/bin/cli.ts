#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { loadConfig } from '../config.js';
import { renameFiles } from '../renamer.js';

const program = new Command();

program
  .name('js-to-jsx-renamer')
  .description('CLI tool to rename .js files to .jsx in React projects')
  .version('1.0.0')
  .option('-c, --config <path>', 'path to config file')
  .option('-d, --dry-run', 'show what would be done without making changes')
  .option('-v, --verbose', 'show detailed logs');

program.parse();

const options = program.opts();

async function main() {
  try {
    console.log(chalk.blue('Starting js-to-jsx-renamer...'));

    const config = await loadConfig(options.config);
    
    // Merge CLI options with config
    Object.assign(config, {
      dryRun: options.dryRun || config.dryRun,
      verbose: options.verbose || config.verbose
    });

    if (config.dryRun) {
      console.log(chalk.yellow('DRY RUN: No files will be modified'));
    }

    const results = await renameFiles(config);

    if (results.success) {
      console.log(chalk.green('\nSuccess! ✨'));
      console.log(`Renamed ${results.renamedFiles.length} files`);
      
      if (config.verbose && results.renamedFiles.length > 0) {
        console.log('\nRenamed files:');
        results.renamedFiles.forEach(file => {
          console.log(chalk.gray(`  ${file.from} → ${file.to}`));
        });
      }
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'An unknown error occurred');
    if (options.verbose && error instanceof Error && error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}

main();
