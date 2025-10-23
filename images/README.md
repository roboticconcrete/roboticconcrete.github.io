# Images Directory

This directory contains all image assets for the Robotic Concrete website.

## Logo Integration

To integrate your logo with the "CC" branding element:

1. **Logo File**: Place your logo file here and name it `logo.png` or `logo.svg`
2. **Update CSS**: Modify the `.logo` class in `css/styles.css` to use your logo file:

```css
.logo {
    background-image: url('../images/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center left;
    padding-left: 50px; /* Adjust based on logo size */
}
```

3. **Update HTML**: Replace the text logo in `index.html` with an img tag if needed:

```html
<div class="logo">
    <img src="images/logo.png" alt="Robotic Concrete" class="logo-img">
</div>
```

## Placeholder Images

The following placeholder images are currently used and can be replaced with actual project photos:

### Portfolio Images
- `portfolio-1.jpg` - Custom Patio Design
- `portfolio-2.jpg` - Outdoor Fireplace
- `portfolio-3.jpg` - Outdoor Kitchen
- `portfolio-4.jpg` - Pool House
- `portfolio-5.jpg` - Decorative Walkway
- `portfolio-6.jpg` - Fire Pit Installation

### Hero Image
- `hero-bg.jpg` - 3D Concrete Printer in action

### Technology Images
- `tech-process.jpg` - Layer-by-layer construction process
- `3d-printer.jpg` - 3D concrete printer equipment

## Image Guidelines

- **Format**: Use JPG for photos, PNG for logos, SVG for icons
- **Optimization**: Compress images for web (aim for <500KB per image)
- **Responsive**: Provide images in multiple sizes for different screen resolutions
- **Alt Text**: Always include descriptive alt text for accessibility

## File Structure

```
images/
├── logo.png (or logo.svg)
├── hero-bg.jpg
├── tech-process.jpg
├── 3d-printer.jpg
├── portfolio/
│   ├── portfolio-1.jpg
│   ├── portfolio-2.jpg
│   ├── portfolio-3.jpg
│   ├── portfolio-4.jpg
│   ├── portfolio-5.jpg
│   └── portfolio-6.jpg
└── README.md (this file)
```
