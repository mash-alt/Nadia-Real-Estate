# Real Estate Agent Website Template - Customization Guide

This is a modern, responsive real estate website template built with React, TypeScript, and Vite. Follow the instructions below to customize it for your client.

## 🎨 Quick Customization Checklist

### 1. **Agent Information**
- **Logo/Name**: `src/components/Navbar.tsx` - Line 23
  - Replace `[AGENT NAME]` with the agent's name or branding
  
- **Footer**: `src/components/Footer.tsx` - Line 6
  - Replace `[Agent Name]` with the agent's name

### 2. **Contact Information**
Update contact details in these files:

- **Floating Contact Buttons**: `src/components/FloatingContact.tsx`
  - Line 6: Phone number (format: `tel:+1234567890`)
  - Line 9: Email address (format: `mailto:email@domain.com`)
  - Line 12: Facebook Messenger link
  - Line 15: Viber number

- **Contact Page**: `src/pages/Contact.tsx`
  - Lines 14 & 20: Replace `[Phone Number]` and `[Email Address]`

- **Home Page**: `src/pages/Home.tsx`
  - Lines 119 & 126: Replace `[Phone Number]` and `[Email Address]`

### 3. **Agent Photo**
Replace placeholder images in:
- **About Page**: `src/pages/About.tsx` - Line 8
- **Home Page**: `src/pages/Home.tsx` - Line 59

Replace the placeholder URL with an actual photo:
```tsx
<img src="path/to/agent-photo.jpg" alt="[Agent Name] - Real Estate Agent" />
```

### 4. **Agent Biography**
- **About Page**: `src/pages/About.tsx` - Lines 12-18
- **Home Page**: `src/pages/Home.tsx` - Lines 63-71

Replace bracketed placeholder text with the agent's actual bio.

### 5. **Testimonials**
Edit `src/data/properties.ts` - Lines 113-131

Replace the three placeholder testimonials with real client testimonials:
```typescript
{
  name: "Client Full Name",
  role: "Client Title/Description",
  text: "Actual testimonial text here...",
  rating: 5
}
```

### 6. **Property Listings**
Edit `src/data/properties.ts` - Lines 3-109

Update property listings with actual properties:
- Images: Use real property photos or upload to a CDN
- Details: Update title, location, price, size, beds, baths
- Type: Set to 'condo', 'house', 'townhouse', or 'apartment'
- Featured: Set `featured: true` for properties to show on homepage

### 7. **Statistics** (Optional)
Update achievement stats in:
- **About Page**: `src/pages/About.tsx` - Lines 22-34
- **Home Page**: `src/pages/Home.tsx` - Lines 75-87

### 8. **Hero Section**
Edit `src/pages/Home.tsx` - Lines 33-36
- Update the tagline and subtitle to match agent's branding

## 🎨 Styling & Colors

### Primary Colors
Colors are defined in `src/index.css`:
- `--navy`: Main dark blue color
- `--gold`: Accent/highlight color
- Modify these variables to match your brand colors

### Fonts
The template uses system fonts. To add custom fonts:
1. Import in `src/index.css`
2. Update the `font-family` property

## 📱 Social Media Links

### Messenger
Replace Facebook Messenger link in `src/components/FloatingContact.tsx` (Line 12):
```javascript
window.open('https://m.me/YOUR_FACEBOOK_USERNAME', '_blank');
```

To get your Messenger link:
1. Go to your Facebook Page
2. Use format: `https://m.me/[your-page-username]`

### Viber
Update Viber number in `src/components/FloatingContact.tsx` (Line 15):
```javascript
window.location.href = 'viber://chat?number=YOUR_PHONE_NUMBER';
```

## 🚀 Running the Website

### Development Mode
```bash
npm install
npm run dev
```
Visit `http://localhost:5173` to view the site.

### Production Build
```bash
npm run build
```
The built files will be in the `dist/` folder, ready for deployment.

## 📂 Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, etc.)
├── pages/           # Page components (Home, About, Contact, etc.)
├── data/            # Property listings and testimonials data
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
├── App.css          # Global styles
└── main.tsx         # App entry point
```

## 🌐 Deployment

This site can be deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the built files
- **Any static hosting**: Upload the `dist` folder contents

## 📝 Additional Customization

### Adding More Properties
Add new property objects to the `properties` array in `src/data/properties.ts`

### Changing Navigation
Edit `src/components/Navbar.tsx` to add/remove menu items

### Modifying Sections
Each page is a separate component in `src/pages/` - edit as needed

## 💡 Need Help?

- Check the React Router documentation for routing questions
- See Vite documentation for build configuration
- CSS styles are in `src/App.css` - organized by component

---

**Template Version**: 1.0  
**Built with**: React 19, TypeScript, Vite, React Router
