# EIGHTEEN. AND SOMEHOW, YOU.

A deeply personal 18th birthday website for Keyashi, made with love by Genula.

---

## ✨ Features

- **Cinematic opening** — Ocean sunset with drifting particles and elegant typography
- **Nostalgic timeline** — Scroll-driven scrapbook telling their story
- **Personal letter** — Progressive reveal of a heartfelt birthday letter
- **Interactive wishes** — Four expandable cards with birthday messages
- **Photo gallery** — Printed-photo aesthetic with accessible lightbox
- **Playful question** — Choose-your-adventure date picker
- **Birthday surprise** — Envelope animation with confetti
- **Cinematic closing** — Final farewell with darker ocean scene

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at **http://localhost:5173/**

---

## 📸 Adding Your Photos

All photo slots are in `public/images/`. Replace these files with your real photographs:

| File | Purpose |
|------|---------|
| `public/images/childhood.jpg` | Childhood photo of Genula & Keyashi |
| `public/images/keyashi.jpg` | A favourite photo of Keyashi |
| `public/images/us.jpg` | A photo of the two of you together |
| `public/images/memory.jpg` | A photo from a meaningful day |
| `public/images/new-chapter.jpg` | A photo representing your new chapter |

**Recommended:** Use photos at least 800px wide for good quality. The site handles missing photos gracefully with placeholder layouts — no broken icons.

---

## ✏️ Personalising the Content

All editable text, image paths, and captions live in a single file:

**[`src/config.ts`](src/config.ts)**

You can change:
- Names, dates, and ages
- Opening text and CTA
- Timeline chapter text
- The entire letter
- Birthday wish card messages
- Gallery captions
- Adventure options and responses
- Surprise message
- Closing text and footer

No need to touch any component files.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Midnight | `#10151F` | Dark sections |
| Ivory | `#F5EEE4` | Light sections |
| Rose | `#D8A2A0` | Accent colour |
| Champagne | `#D6B88D` | Warm accent |
| Charcoal | `#25252B` | Text on light |

**Fonts:**
- **Playfair Display** — Editorial serif for headlines
- **Inter** — Clean sans-serif for body text
- **Caveat** — Handwritten accents for signatures

---

## ♿ Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation on all interactive elements
- Visible focus states
- `prefers-reduced-motion` support
- Proper contrast ratios

---

## 📱 Responsive

Tested layouts:
- Desktop (1440px+)
- Tablet (768px–1024px)
- Mobile (320px–480px)

---

## 🌐 Deploying to Netlify

### Option A: Drag & Drop
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page
4. Done! Share the link.

### Option B: Git Deploy
1. Push to GitHub/GitLab
2. Connect the repo on Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Option C: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 📋 Final Checklist

- [ ] Added all 5 photos to `public/images/`
- [ ] Reviewed and personalised text in `src/config.ts`
- [ ] Tested on mobile
- [ ] Ran `npm run build` successfully
- [ ] Deployed and tested the live URL
- [ ] Sent the link to Keyashi ♡

---

## Tech Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- Vanilla CSS design system

No backend, no API keys, no accounts required. Pure static site.

---

*Made with love. Happy birthday, Keyashi. ♡*
