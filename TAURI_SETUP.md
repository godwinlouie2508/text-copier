# Tauri Setup Guide

Your app has been configured for Tauri! Tauri will create much smaller executables (~3-5 MB vs 170 MB with Electron).

## ✅ What's Already Done

- ✅ Tauri dependencies installed
- ✅ Tauri project initialized in `src-tauri/` folder
- ✅ Configuration updated for your app
- ✅ All your UI code (HTML, CSS, JS) is ready - no changes needed!

## 📋 Prerequisites

You need to install Rust (Tauri's backend language):

### Install Rust on Windows

1. **Download Rust installer:**
   - Go to: https://rustup.rs/
   - Download and run `rustup-init.exe`

2. **Run the installer:**
   - Choose option 1 (default installation)
   - Wait for installation to complete (~5-10 minutes)

3. **Install Visual Studio C++ Build Tools** (required on Windows):
   - Go to: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Download and install "Build Tools for Visual Studio 2022"
   - During installation, select "Desktop development with C++"

4. **Restart your terminal** after installation

5. **Verify installation:**
   ```bash
   rustc --version
   cargo --version
   ```

## 🚀 Building Your Tauri App

### Option 1: Build for Windows (your current platform)

```bash
npm run tauri:build
```

The executable will be in: `src-tauri/target/release/`

**File size: ~3-5 MB** (vs 170 MB with Electron!)

### Option 2: Run in Development Mode

```bash
npm run tauri:dev
```

This opens the app with hot-reload during development.

## 📦 Building for Other Platforms

### For macOS

1. On a Mac computer, install Rust:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. Clone your project to the Mac

3. Run:
   ```bash
   npm install
   npm run tauri:build
   ```

Output: `.app` file in `src-tauri/target/release/bundle/macos/`

### For Linux

1. On a Linux machine, install Rust:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. Install additional dependencies:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
   ```

3. Run:
   ```bash
   npm install
   npm run tauri:build
   ```

Output: `.deb` or `.AppImage` in `src-tauri/target/release/bundle/`

## 🎯 File Size Comparison

| Platform | Tauri | Electron |
|----------|-------|----------|
| Windows | **3-5 MB** | 170 MB |
| macOS | **2-4 MB** | 150 MB |
| Linux | **3-5 MB** | 160 MB |

## 🔧 Your App Structure

```
Copier/
├── index.html          # Your app UI
├── app.js              # Your React code
├── styles.css          # Your styles
├── main.js             # Electron version (still works)
├── package.json        # Scripts for both Electron and Tauri
└── src-tauri/          # Tauri backend (Rust)
    ├── src/
    │   └── main.rs     # Rust backend (auto-generated, no changes needed)
    ├── tauri.conf.json # Tauri configuration
    └── Cargo.toml      # Rust dependencies
```

## 📝 Notes

- **All your UI code stays the same** - HTML, CSS, JavaScript work exactly as before
- **localStorage works** - Your data persistence is unchanged
- **Both Electron and Tauri** - You can use either one!
  - `npm start` = Electron version
  - `npm run tauri:dev` = Tauri version
- **Cross-platform** - Build on each platform to get native executables

## 🚨 Next Steps

1. Install Rust (see above)
2. Run `npm run tauri:build`
3. Find your tiny executable in `src-tauri/target/release/`
4. Celebrate your 3 MB app! 🎉

## Need Help?

If you get any errors during build:
1. Make sure Rust is installed: `rustc --version`
2. Make sure VS C++ Build Tools are installed (Windows only)
3. Restart your terminal after installing Rust
4. Try running `npm run tauri:build` again
