import { readFile, rename } from 'fs/promises';
import { glob } from 'glob';
import { basename, dirname, extname, join } from 'path';
import type { Config, RenameResult } from './config.js';

async function checkIsReactComponent(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Check for JSX syntax
    if (content.includes('</') || content.match(/<[A-Z][A-Za-z0-9]*/) || content.match(/className=/)) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

export async function renameFiles(config: Config): Promise<RenameResult> {
  const result: RenameResult = {
    success: true,
    renamedFiles: []
  };

  try {
    // Find all .js files based on include patterns
    const files = await glob(config.include, {
      ignore: config.exclude,
      nodir: true
    });

    for (const file of files) {
      try {
        if (extname(file) !== '.js') continue;

        const isReactComponent = await checkIsReactComponent(file);
        if (!isReactComponent) {
          if (config.verbose) {
            console.log(`Skipping ${file} (not a React component)`);
          }
          continue;
        }

        const dir = dirname(file);
        const name = basename(file, '.js');
        const newPath = join(dir, `${name}.jsx`);

        if (!config.dryRun) {
          await rename(file, newPath);
        }

        result.renamedFiles.push({
          from: file,
          to: newPath
        });

        if (config.verbose) {
          console.log(`${config.dryRun ? 'Would rename' : 'Renamed'} ${file} → ${newPath}`);
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        result.success = false;
      }
    }

    return result;
  } catch (error) {
    console.error('Error during renaming:', error);
    result.success = false;
    return result;
  }
}
