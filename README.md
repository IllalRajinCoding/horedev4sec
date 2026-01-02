# 🚀 HoraHore DevOps - Landing Page

Modern & responsive landing page built with React, Vite, and Tailwind CSS with automated CI/CD deployment to VPS.

![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.0-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8?logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5.14-5a0ef8)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and professional design
- 📱 **Fully Responsive** - Mobile-first approach
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **SEO Friendly** - Optimized for search engines
- 🚀 **Auto Deployment** - CI/CD with GitHub Actions
- 🔒 **Secure** - Best practices security headers

## 🎯 Sections

- **Navbar** - Responsive navigation with mobile menu
- **Hero** - Eye-catching hero section with CTA
- **Partnership** - Showcase partner/client logos
- **Features** - Highlight key features and benefits
- **Pricing** - Display pricing plans
- **Footer** - Contact info and social links

## 🛠️ Tech Stack

### Frontend

- **React 19.2.3** - UI library
- **Vite 6.0.0** - Build tool & dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **DaisyUI 5.5.14** - Tailwind CSS components
- **Framer Motion 12.23.26** - Animation library
- **React Icons 5.5.0** - Icon library

### DevOps

- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Web server
- **VPS** - Production hosting

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone repository

```bash
git clone https://github.com/yourusername/horahoredevops.git
cd horahoredevops
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deployment

Project ini menggunakan automated CI/CD dengan GitHub Actions untuk deploy ke VPS.

### Deployment Flow

```
Push to main → GitHub Actions → Build → Deploy to VPS → Nginx Serve
```

### Setup Deployment

Lihat panduan lengkap di [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Setup:**

1. Setup VPS dengan Nginx
2. Generate SSH key di VPS
3. Setup GitHub Secrets:
   - `VPS_HOST` - IP/domain VPS
   - `VPS_USERNAME` - SSH username
   - `VPS_SSH_KEY` - Private SSH key
   - `VPS_PORT` - SSH port (jika custom)
4. Push ke branch `main`

GitHub Actions akan otomatis build dan deploy! 🎉

## 📁 Project Structure

```
horahoredevops/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml           # CI/CD pipeline
│       └── README.md           # Workflow documentation
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Partnership.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   ├── Footer.jsx
│   │   └── CrossLine.jsx
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── nginx.conf                  # Nginx configuration
├── DEPLOYMENT.md               # Deployment guide
├── package.json
├── vite.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Update Content

Edit components di `src/components/` untuk mengubah content:

- [Navbar.jsx](src/components/Navbar.jsx) - Logo, menu items
- [Hero.jsx](src/components/Hero.jsx) - Main headline, CTA
- [Features.jsx](src/components/Features.jsx) - Feature list
- [Pricing.jsx](src/components/Pricing.jsx) - Pricing plans
- [Footer.jsx](src/components/Footer.jsx) - Footer content

### Update Styling

- Edit [index.css](src/index.css) untuk global styles
- Gunakan Tailwind utility classes untuk component-level styling
- Customize DaisyUI theme di [tailwind.config.js](tailwind.config.js)

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**

- GitHub: [@IllalRajinCoding](https://github.com/IllalRajinCoding)
- Website: [yourdomain.com](https://yourdomain.com)