import { loadConfig } from './config.js';
import { renameFiles } from './renamer.js';

export { loadConfig, type Config } from './config.js';
export { renameFiles } from './renamer.js';

// Re-export the main functionality for programmatic usage
export const rename = async (configPath?: string) => {
  const config = await loadConfig(configPath);
  return renameFiles(config);
};
