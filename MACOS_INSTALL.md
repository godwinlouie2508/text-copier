# Installing Text Copier on macOS

Text Copier is not code-signed with an Apple Developer certificate. This means macOS will show security warnings when you try to install it.

## Installation Methods

### Method 1: Remove Quarantine Flag (Recommended)

1. Download `Text Copier_1.0.0_universal.dmg`
2. Open Terminal and run:
   ```bash
   xattr -cr ~/Downloads/Text\ Copier_1.0.0_universal.dmg
   ```
3. Open the `.dmg` file
4. Drag Text Copier to Applications
5. Launch the app normally

### Method 2: After Moving to Applications

If you've already moved the app to Applications but can't open it:

1. Open Terminal and run:
   ```bash
   sudo xattr -cr "/Applications/Text Copier.app"
   ```
2. Launch the app normally

### Method 3: Right-Click Method

1. Open the `.dmg` file and move the app to Applications
2. Go to Applications folder
3. **Right-click** (or Control+click) on Text Copier
4. Select "Open" from the menu
5. Click "Open" in the security dialog

### Method 4: System Settings

If the app still won't open:

1. Try to open the app (it will fail)
2. Go to **System Settings** → **Privacy & Security**
3. Scroll down to find "Text Copier was blocked"
4. Click **"Open Anyway"**
5. Confirm by clicking "Open"

## Why This Happens

This app is not signed with an Apple Developer certificate ($99/year). macOS protects users by requiring apps to be either:
- Downloaded from the App Store, or
- Signed by a registered Apple Developer

The methods above safely bypass this protection for apps you trust.

## Is It Safe?

Yes! This is open-source software. You can:
- View the source code: https://github.com/godwinlouie2508/text-copier
- Build it yourself from source
- Verify no malicious code exists

## Still Having Issues?

If you continue to have problems, please:
1. Check you're running macOS 10.13 or later
2. Ensure you have admin privileges on your Mac
3. Open an issue on GitHub: https://github.com/godwinlouie2508/text-copier/issues

---

**Note for developers:** If you want a signed version, you'll need an Apple Developer account. Instructions for signing are in the README.
