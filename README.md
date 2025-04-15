# Sora Image Downloader Chrome Extension

A simple and elegant Chrome extension that adds a download button to images on Sora's gallery (sora.chatgpt.com). The extension seamlessly integrates with Sora's existing UI, making it easy to download and view high-resolution AI-generated images.

![Sora Image Downloader Demo](assets/shot.png)

## Features

- ✨ Seamlessly integrates with Sora's UI design
- 🔄 Automatically adds download buttons to all images
- 🖼️ Opens full-resolution images in a new tab
- 💾 Downloads images with original filenames
- 🎯 Works with dynamically loaded content
- 🎨 Matches Sora's button styling and animations

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files

## Usage

Once installed, visit [Sora's gallery](https://sora.chatgpt.com/explore) and you'll see a new download button (↓) next to each image's existing controls. The button:

- Opens the full-resolution image in a new tab
- Automatically downloads the image with its original filename
- Appears alongside the existing like and search buttons

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main extension functionality
- `README.md` - This documentation

## Technical Details

The extension:
- Uses MutationObserver to handle dynamically loaded content
- Maintains Sora's existing UI/UX patterns
- Handles single-page application navigation
- Preserves original image quality and metadata

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use and modify as needed.

---

*Note: This is an unofficial extension and is not affiliated with OpenAI or the Sora team.* 