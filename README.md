# Text Copier

<div align="center">

A modern, powerful Windows desktop application for managing and copying text fields with ease.

**[Download Latest Release](https://github.com/godwinlouie2508/text-copier/releases/latest)** • **[Report Bug](https://github.com/godwinlouie2508/text-copier/issues)**

</div>

## ✨ Features

- **📋 Organize with Tabs**: Manage items across 5 customizable tabs
- **🎨 Chrome-Style Tabs**: Drag and reorder tabs just like your browser
- **🔒 Password-Style Fields**: Hidden text fields for sensitive information
- **📥 Import/Export**: Backup and restore data via CSV files
- **🎯 Bulk Actions**: Select multiple items for batch deletion
- **📝 Quick Copy**: One-click copy for both names and text
- **🌓 Dark/Light Mode**: Beautiful themes that adapt to your preference
- **💾 Auto-Save**: Everything persists automatically to local storage
- **🎭 Modern UI**: Clean, professional interface with smooth animations

## 📥 Installation

### For Users

1. Download `Text-Copier-Setup.exe` from the [latest release](https://github.com/godwinlouie2508/text-copier/releases/latest)
2. Run the installer (requires Administrator privileges)
3. The app will be installed to `C:\Program Files\Text Copier\`
4. Launch from Start Menu or Desktop shortcut

**System Requirements:**
- Windows 10/11 (64-bit)
- ~50MB disk space

## 🚀 Usage

### Managing Items

1. **Add Item**: Click "+ Add Item" to create a new entry
2. **Edit Name**: Click on the item name to rename it
3. **Edit Text**: Click the text field to enter your content (auto-saves)
4. **Copy**: Click the copy buttons (📋) to copy name or text
5. **Delete**: Click the × button to remove an item

### Working with Tabs

- **Switch Tabs**: Click on any tab to switch
- **Rename Tab**: Double-click a tab name to edit it
- **Reorder Tabs**: Drag tabs left/right to reorder
- **Organize**: Use tabs to categorize different types of information

### Import/Export

- **Export**: Click "Export" to save all data as CSV
- **Import**: Click "Import" to load data from a CSV file
- **Backup**: Export regularly to keep backups of your data

### Bulk Operations

- **Select Items**: Check the boxes next to items
- **Select All**: Click "Select All" to mark all items
- **Bulk Delete**: Delete multiple items at once

## 🛠️ Building from Source

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Rust](https://www.rust-lang.org/) (for Tauri)
- Windows 10/11

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/godwinlouie2508/text-copier.git
cd text-copier
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run tauri:dev
```

4. Build for production:
```bash
npm run tauri:build
```

The installer will be created at:
- `src-tauri/target/release/bundle/nsis/Text Copier_1.0.0_x64-setup.exe`

## 📁 Project Structure

```
text-copier/
├── frontend/
│   ├── index.html      # HTML entry point
│   ├── app.js          # React application logic
│   └── styles.css      # Application styles
├── src-tauri/
│   ├── src/            # Rust backend code
│   ├── icons/          # Application icons
│   └── tauri.conf.json # Tauri configuration
├── package.json        # Node dependencies
└── README.md           # This file
```

## 🔧 Technologies

- **[Tauri](https://tauri.app/)** - Lightweight desktop application framework
- **[React](https://react.dev/)** - UI library
- **[Rust](https://www.rust-lang.org/)** - Backend runtime
- **HTML5/CSS3/JavaScript** - Core web technologies

## 💾 Data Storage

All data is stored locally on your machine:
- **User Data**: `C:\Users\[YourName]\AppData\Roaming\com.textcopier.application\`
- **Format**: LocalStorage (encrypted by the OS)
- **Privacy**: No data ever leaves your computer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

Built with [Tauri](https://tauri.app/) and [React](https://react.dev/)

---

<div align="center">
Made with ❤️ for productivity
</div>
