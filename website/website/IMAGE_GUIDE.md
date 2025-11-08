# 🖼️ Image Integration Guide

This guide explains how to add images to your AirBorne Recruiting website replica.

## 📁 Recommended Folder Structure

Create an `images` folder in your website directory:

```
website/
├── images/
│   ├── hero/
│   │   └── cruise-ship-hero.jpg (1920x1080px)
│   ├── gallery/
│   │   ├── interviews/
│   │   │   ├── interview-1.jpg
│   │   │   ├── interview-2.jpg
│   │   │   └── ...
│   │   ├── ship-visits/
│   │   ├── culinary/
│   │   ├── restaurant/
│   │   ├── housekeeping/
│   │   ├── galley/
│   │   └── classrooms/
│   ├── team/
│   │   ├── mumbai-recruiters.jpg
│   │   ├── mumbai-team.jpg
│   │   ├── goa-team.jpg
│   │   └── ...
│   ├── faculty/
│   │   ├── mollan.jpg
│   │   ├── lobo-culinary.jpg
│   │   └── ...
│   └── testimonials/
│       ├── rody.jpg
│       ├── jyoti.jpg
│       └── ...
```

## 🎯 Step-by-Step Integration

### 1. Hero Section (index.html)

**Current**: Gradient background only  
**To Add Image**: Edit `styles.css`

```css
.hero {
    background-image: 
        linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%),
        url('images/hero/cruise-ship-hero.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax effect */
}
```

**Recommended Image**: Large cruise ship at sea, wide angle
**Size**: 1920x1080px (Full HD)

---

### 2. Gallery Images (gallery.html)

**Find this code** (around line 60):
```html
<div class="gallery-item" data-category="interviews">
    <div class="gallery-placeholder">
        <svg>...</svg>
    </div>
    <div class="gallery-caption">
        <h4>LWA Interviews August 2024</h4>
        <p>Mumbai</p>
    </div>
</div>
```

**Replace with**:
```html
<div class="gallery-item" data-category="interviews">
    <img src="images/gallery/interviews/lwa-aug-2024.jpg" 
         alt="LWA Interviews August 2024" 
         class="gallery-image">
    <div class="gallery-caption">
        <h4>LWA Interviews August 2024</h4>
        <p>Mumbai</p>
    </div>
</div>
```

**Add to styles.css**:
```css
.gallery-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}
```

**Recommended Size**: 800x600px per image

---

### 3. Team Photos (about-us.html)

**Find this code** (around line 132):
```html
<div class="team-placeholder">
    <svg>...</svg>
</div>
<h3>Mumbai Recruiters & Recruiting Managers</h3>
```

**Replace with**:
```html
<img src="images/team/mumbai-recruiters.jpg" 
     alt="Mumbai Recruiters" 
     class="team-image">
<h3>Mumbai Recruiters & Recruiting Managers</h3>
```

**Add to styles.css**:
```css
.team-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto var(--spacing-md);
    display: block;
}
```

**Recommended Size**: 300x300px (will be displayed at 120x120px)

---

### 4. Faculty Photos (training.html)

**Find this code** (around line 64):
```html
<div class="faculty-image-placeholder">
    <svg>...</svg>
</div>
<h3>Mollan</h3>
<h4>Food & Beverage Service</h4>
```

**Replace with**:
```html
<img src="images/faculty/mollan.jpg" 
     alt="Mollan" 
     class="faculty-image">
<h3>Mollan</h3>
<h4>Food & Beverage Service</h4>
```

**Add to styles.css**:
```css
.faculty-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto var(--spacing-md);
    display: block;
}
```

**Recommended Size**: 300x300px

---

### 5. Testimonial Photos (testimonials.html)

**Find this code** (around line 44):
```html
<div class="testimonial-image-placeholder">
    <svg>...</svg>
</div>
<h3>Rody Khumnunsiam</h3>
```

**Replace with**:
```html
<img src="images/testimonials/rody.jpg" 
     alt="Rody Khumnunsiam" 
     class="testimonial-image">
<h3>Rody Khumnunsiam</h3>
```

**Add to styles.css**:
```css
.testimonial-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto var(--spacing-md);
    display: block;
}
```

**Recommended Size**: 200x200px

---

### 6. Lightbox Images (gallery.js)

Update the `showLightboxImage` function in `gallery.js`:

**Replace** (around line 63):
```javascript
function showLightboxImage(index) {
    const item = visibleItems[index];
    const caption = item.querySelector('.gallery-caption h4')?.textContent || '';
    const subcaption = item.querySelector('.gallery-caption p')?.textContent || '';
    
    // Get the image source
    const imgSrc = item.querySelector('.gallery-image')?.src || '';
    
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxImg = document.querySelector('.lightbox-image-placeholder');
    
    if (lightboxCaption) {
        lightboxCaption.innerHTML = `<h3>${caption}</h3><p>${subcaption}</p>`;
    }
    
    // Replace placeholder with actual image
    if (imgSrc && lightboxImg) {
        lightboxImg.innerHTML = `<img src="${imgSrc}" alt="${caption}" style="max-width: 100%; max-height: 80vh; border-radius: 8px;">`;
    }
}
```

---

## 🎨 Image Optimization Tips

### File Formats
- **Photos**: Use `.jpg` or `.webp` (better compression)
- **Graphics/Logos**: Use `.png` for transparency
- **Icons**: Use SVG when possible (scalable)

### Compression
Compress images before uploading:
- **Online Tools**: TinyPNG, Compressor.io, Squoosh
- **Desktop Apps**: ImageOptim (Mac), FileOptimizer (Windows)
- **Target**: < 200KB per image for web

### Responsive Images
For better performance, use `srcset`:

```html
<img src="images/gallery/photo.jpg"
     srcset="images/gallery/photo-small.jpg 400w,
             images/gallery/photo-medium.jpg 800w,
             images/gallery/photo-large.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Description">
```

---

## 🚀 Quick Start Checklist

1. ✅ Create `images` folder structure
2. ✅ Optimize all images (compress)
3. ✅ Name files clearly (no spaces, use hyphens)
4. ✅ Add images with proper alt text
5. ✅ Add CSS classes for styling
6. ✅ Test on different screen sizes
7. ✅ Verify images load correctly
8. ✅ Check mobile performance

---

## 📸 Where to Get Images

### Free Stock Photos
- **Unsplash**: https://unsplash.com (cruise ships, hotels)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

### Search Terms
- "cruise ship"
- "luxury cruise liner"
- "ship crew"
- "hotel staff"
- "professional training"
- "corporate team"

### Professional Photos
For a real production site, you'd want:
- **Professional headshots** for team/faculty
- **Actual cruise ship photos** from your clients
- **Real training facility photos**
- **Genuine testimonial photos** (with permission)

---

## 🎯 Image Specifications Summary

| Location | Size | Format | Notes |
|----------|------|--------|-------|
| Hero Background | 1920x1080px | JPG | Wide angle |
| Gallery Images | 800x600px | JPG | 4:3 ratio |
| Team Photos | 300x300px | JPG | Square/circular |
| Faculty Photos | 300x300px | JPG | Square/circular |
| Testimonial Photos | 200x200px | JPG | Square/circular |
| Logo | 200x80px | PNG | Transparent |

---

## 🔧 Troubleshooting

### Images Not Showing?
1. Check file path is correct
2. Verify image file exists
3. Check file extension (case-sensitive on some servers)
4. Clear browser cache (Ctrl+F5)

### Images Too Large?
1. Compress with TinyPNG
2. Resize to recommended dimensions
3. Use WebP format for better compression

### Layout Broken?
1. Add CSS classes as shown above
2. Check `object-fit: cover` is applied
3. Verify width/height are set correctly

---

**Need Help?** Check the browser console (F12) for error messages!
