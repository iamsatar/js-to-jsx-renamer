# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2025-03-05

### Changed

- Improved JSX detection to ignore JSX-like syntax in comments
- Enhanced HTML string detection to handle both single and double quotes
- Simplified JSX detection logic by removing comment-based checks

## [1.1.1] - 2025-03-03

### Fixed

- Removed unnecessary React import check, focusing only on JSX syntax detection
- Fixed false positives from React imports that weren't actually JSX files

## [1.1.0] - 2025-03-03

### Changed

- Simplified core functionality by removing backup feature
- Enhanced JSX detection logic for better accuracy
- Improved error handling and logging
- Updated CLI interface for better user experience
- Streamlined configuration file format

### Removed

- Backup functionality (use version control instead)
- `--backup` flag from CLI
- Backup-related configuration options

## [1.0.0] - 2025-03-03

### Added

- Initial release
- Automatic detection of React components
- JSX syntax detection
- Configurable file patterns
- Dry-run mode
- Verbose logging
- Custom configuration file support
- TypeScript support
- Comprehensive test suite
- MIT License

[1.1.1]: https://github.com/iamsatar/js-to-jsx-renamer/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/iamsatar/js-to-jsx-renamer/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/iamsatar/js-to-jsx-renamer/releases/tag/v1.0.0
