# Facebook Messenger

An Electron-based desktop client for Facebook Messenger, providing seamless access to messaging features in a standalone application.

## Installation and Usage

To set up and run the application, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   npm run start
   ```

## Known Issues

Currently, the distributable for Fedora 41 cannot be produced due to an unresolved issue in Electron Forge when building RPM packages.

- **Issue Reference:** [Electron Forge Issue #3701](https://github.com/electron/forge/issues/3701)

### Resolution Plan

Once the aforementioned issue is resolved, the distributable can be generated using the following command:

```bash
npm run make
```

Distributables for macOS and Windows are unaffected and should build and run as expected.
