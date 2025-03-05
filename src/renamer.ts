import { readFile, rename } from 'fs/promises';
import { glob } from 'glob';
import { basename, dirname, extname, join } from 'path';
import type { Config, RenameResult } from './config.js';

async function checkIsReactComponent(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Remove comments before checking for JSX
    const uncommentedContent = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
    
    // Check for JSX in actual code, but exclude HTML strings
    const lines = uncommentedContent.split('\n');
    for (const line of lines) {
      // Skip lines that contain HTML strings (wrapped in single or double quotes)
      if (line.match(/['"][^'"]*<[^>]*>[^'"]*['"]/)) continue;
      
      // Check for JSX-like syntax
      if (line.includes('</') || 
          line.match(/<[A-Z][A-Za-z0-9]*/) || 
          line.match(/className=/)) {
        return true;
      }
    }
    
    return false; // No JSX found
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
