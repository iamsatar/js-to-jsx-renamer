import { join } from 'path';
import { fileURLToPath } from 'url';
import { checkIsReactComponent } from '../renamer.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const MOCKS_DIR = join(__dirname, '..', '..', 'mocks');

describe('checkIsReactComponent', () => {
  it('should return false for files with JSX-like syntax in strings', async () => {
    const filePath = join(MOCKS_DIR, 'jsx-in-string.js');
    const result = await checkIsReactComponent(filePath);
    expect(result).toBe(false);
  });

  it('should return false for files with JSX-like syntax in comments', async () => {
    const filePath = join(MOCKS_DIR, 'jsx-in-comment.js');
    const result = await checkIsReactComponent(filePath);
    expect(result).toBe(false);
  });

  it('should return true for files with actual JSX code', async () => {
    const filePath = join(MOCKS_DIR, 'actual-jsx.jsx');
    const result = await checkIsReactComponent(filePath);
    expect(result).toBe(true);
  });

  it('should return true for files with mixed content containing actual JSX', async () => {
    const filePath = join(MOCKS_DIR, 'mixed-content.js');
    const result = await checkIsReactComponent(filePath);
    expect(result).toBe(true);
  });

  it('should handle non-existent files gracefully', async () => {
    const filePath = join(MOCKS_DIR, 'non-existent.js');
    const result = await checkIsReactComponent(filePath);
    expect(result).toBe(false);
  });
});