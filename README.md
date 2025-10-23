# Robotic Concrete Website

A modern, single-page website showcasing revolutionary 3D concrete printing technology for construction partnerships and client recruitment.

## 🚀 Features

- **Modern Design**: Clean, tech-forward aesthetic with slate gray branding
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth scrolling, animations, and dynamic forms
- **Partner Focus**: Designed specifically for recruiting general contracting partners
- **Educational Content**: Explains 3D concrete printing technology and benefits
- **Multiple CTAs**: Partnership inquiry, demo scheduling, and information downloads
- **API Integration**: Form submissions with Bearer token authentication

## 📁 Project Structure

```
roboticconcrete.github.io/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── images/                # Image assets directory
│   └── README.md          # Image integration guide
└── README.md              # This file
```

## 🎨 Design & Branding

- **Color Scheme**: Slate gray primary with industrial orange accents
- **Typography**: Inter (headings) and Open Sans (body text)
- **Logo**: Features "CC" branding element integrated throughout
- **Style**: Modern, clean, tech-forward aesthetic

## 🛠️ Setup & Deployment

### GitHub Pages Deployment

1. **Push to GitHub**: 
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Configure Custom Domain**:
   - In the same "Pages" section, enter your custom domain (e.g., `roboticconcrete.com`)
   - Click "Save"
   - GitHub will automatically create a `CNAME` file

4. **DNS Configuration**:
   - Add DNS records with your domain registrar (see Custom Domain Setup below)

5. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/roboticconcrete.github.io/` (temporary)
   - After DNS propagation: `https://yourdomain.com`

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/roboticconcrete.github.io.git
   cd roboticconcrete.github.io
   ```

2. **Open in browser**:
   ```bash
   open index.html
   ```
   Or use a local server:
   ```bash
   python -m http.server 8000
   ```

## ⚙️ Configuration

### API Integration

Update the configuration in `js/main.js`:

```javascript
const CONFIG = {
    apiEndpoint: 'https://your-api-endpoint.com/contact',
    bearerToken: 'your-actual-bearer-token',
    // ... other config
};
```

### Logo Integration

1. Add your logo file to the `images/` directory
2. Update the logo references in `index.html` and `css/styles.css`
3. See `images/README.md` for detailed instructions

### Contact Information

Update contact details in `index.html`:
- Phone number
- Email address
- Service areas
- Company information

## 📱 Sections

### 1. Header & Navigation
- Sticky header with smooth scroll navigation
- Mobile-responsive menu
- Contact information and CTA button

### 2. Hero Section
- Bold headline about 3D concrete printing
- Dual CTAs: "Become a Partner" and "Schedule Demo"
- Visual placeholder for 3D printer

### 3. Technology Section
- Explains 3D concrete printing process
- Benefits: precision, speed, design freedom, sustainability
- Animated visual demonstration

### 4. Services Section
- Hardscapes (patios, walkways, driveways)
- Outbuildings (sheds, studios, pool houses)
- Custom outdoor fireplaces
- Outdoor kitchens

### 5. Partner Benefits Section
- Why partner with Robotic Concrete
- Business benefits for contractors
- Training and support information

### 6. Process Section
- 6-step construction process
- From consultation to completion
- Clear, actionable steps

### 7. Portfolio Section
- Project gallery with hover effects
- Category-based organization
- Placeholder images ready for real projects

### 8. Testimonials Section
- Partner and client testimonials
- Star ratings and credibility indicators

### 9. Contact Section
- Multi-purpose contact form
- API integration with Bearer token
- Multiple contact methods

### 10. Footer
- Quick links and navigation
- Service areas and contact info
- Copyright and legal information

## 🔧 Customization

### Colors
Update CSS custom properties in `css/styles.css`:
```css
:root {
    --primary-slate: #475569;
    --accent-orange: #f97316;
    /* ... other colors */
}
```

### Content
- Update all text content in `index.html`
- Replace placeholder images with actual project photos
- Customize service offerings and process steps

### Forms
- Configure API endpoint and Bearer token
- Customize form fields and validation
- Set up email notifications

## 📈 Performance

- Optimized for fast loading
- Minimal dependencies
- Responsive images
- SEO-friendly structure
- Accessible design

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🌐 Custom Domain Setup

### DNS Configuration Options

**Option A: Root Domain (yourdomain.com)**
Add these A records with your domain registrar:
```
Type: A, Name: @, Value: 185.199.108.153, TTL: 3600
Type: A, Name: @, Value: 185.199.109.153, TTL: 3600  
Type: A, Name: @, Value: 185.199.110.153, TTL: 3600
Type: A, Name: @, Value: 185.199.111.153, TTL: 3600
```

**Option B: Subdomain (www.yourdomain.com)**
Add this CNAME record:
```
Type: CNAME, Name: www, Value: yourusername.github.io, TTL: 3600
```

**Option C: Both Root and Subdomain**
Use both configurations to support both `yourdomain.com` and `www.yourdomain.com`

### Important Notes:
- DNS changes can take 24-48 hours to propagate
- GitHub will automatically create a `CNAME` file when you add a custom domain
- Make sure to enable "Enforce HTTPS" in GitHub Pages settings after DNS propagation
- Keep the `CNAME` file in your repository root

### Troubleshooting:
- Check DNS propagation: https://www.whatsmydns.net/
- Verify GitHub Pages settings show your custom domain
- Ensure HTTPS is enabled for security

## 📞 Support

For questions about the website or 3D concrete printing services:

- **Phone**: (555) 123-4567
- **Email**: partners@roboticconcrete.com
- **Website**: https://roboticconcrete.github.io (or your custom domain)

## 📄 License

© 2025 Robotic Concrete. All rights reserved.

---

**Ready to revolutionize construction with 3D concrete printing?** Contact us today to become a certified partner!
