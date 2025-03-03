# js-to-jsx-renamer

A CLI tool for seamlessly renaming `.js` files to `.jsx` in React projects. Perfect for migrating from Create React App (CRA) to Vite or when you need to ensure proper file extensions for your React components.

## Features

- Automatically detects and renames React component files from `.js` to `.jsx`
- Configurable through a simple configuration file
- Supports file and directory exclusions
- Preserves file content and metadata
- Safe operation with dry-run option
- Detailed logging and progress reporting

## Installation

```bash
npm install -g js-to-jsx-renamer
```

Or use it directly with npx:

```bash
npx js-to-jsx-renamer
```

## Usage

Basic usage:

```bash
js-to-jsx-renamer
```

With options:

```bash
js-to-jsx-renamer --dry-run    # Preview changes without applying them
js-to-jsx-renamer --verbose    # Show detailed logs
js-to-jsx-renamer --config ./custom-config.json  # Use custom config file
```

## Configuration

Create a `js-to-jsx-config.json` file in your project root:

```json
{
  "include": ["src/**/*.js"],
  "exclude": [
    "**/*.test.js",
    "**/*.spec.js",
    "src/serviceWorker.js"
  ],
  "verbose": false
}
```

## Options

- `-d, --dry-run`: Preview changes without making changes
- `-v, --verbose`: Show detailed logs
- `-c, --config <path>`: Specify a custom config file path
- `--help`: Show help information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
