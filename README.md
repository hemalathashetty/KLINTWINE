# 🍷 KLIMT Wine — Where Art Meets Wine

A modern, high-performance **3D WebGL web application clone** of [Klimt Wine](https://klimtwine.com/en), inspired by Gustav Klimt's artistic legacy and fine Austrian winemaking.

---

## ✨ Features

- 🍾 **Interactive 3D WebGL Bottle Renderer**: Built with Three.js using real-time canvas rendering, custom UV textures (`Grüner Veltliner`, `White Blend`, `Red Blend`), and GSAP scroll-driven rotation & tilt.
- 🍷 **Photorealistic Red Wine Pouring Sequence**: Dynamic scroll-triggered pouring scene featuring tilting wine bottles, crimson wine stream paths, and liquid filling glass outlines.
- 🌐 **Bilingual Support (English / French)**: One-click language switcher with instant localization across all titles, descriptions, food pairings, and technical specs.
- 🛒 **Interactive Checkout & Buy Modal**: Integrated shopping cart flow with quantity selectors, order calculation, address inputs, and purchase confirmation.
- 🎨 **State-of-the-Art Aesthetic**: Built with warm radial spotlights, custom Canela thin typography, Monument Grotesk fonts, and glassmorphic UI elements.
- 📱 **Responsive Design**: Optimized for all screen sizes from mobile viewports to ultra-wide displays.

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **3D WebGL & Graphics**: Three.js, WebGL, Custom Mesh Lathe Geometry
- **Animations**: GSAP (GreenSock), ScrollTrigger
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design Tokens, Flexbox/Grid Layouts

---

## 🚀 Getting Started

Follow these simple steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.
- Check Node version: `node -v`
- Check npm version: `npm -v`

---

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vanishajalady/klintwine.git
   cd klintwine
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to **[http://localhost:5173](http://localhost:5173)** to view the live application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds the production bundle in the `dist/` directory. |
| `npm run preview` | Runs a local web server to preview the production build locally. |

---

## 📁 Project Structure

```text
klintwine/
├── public/
│   ├── fonts/           # Canela Thin & ABC Monument Grotesk Web Fonts
│   ├── uploads/         # WebGL bottle textures, photography assets & WebM videos
│   └── favicon.svg
├── src/
│   ├── assets/          # SVG icons & static graphics
│   ├── components/      # Reusable UI components
│   │   ├── BottleCanvas.tsx    # Three.js 3D WebGL bottle scene & scroll rotation
│   │   ├── CheckoutModal.tsx   # Buy Klimt Wines shopping modal
│   │   ├── Header.tsx          # Navigation bar & language switcher
│   │   ├── Preloader.tsx       # Preloading glass fill animation
│   │   └── WineDropdown.tsx    # Bottom floating wine selector pill
│   ├── sections/        # Main landing page sections
│   │   ├── Hero.tsx            # Hero section with 3D pinned bottle & title
│   │   ├── Heritage.tsx        # Heritage section with 3 zoomable gallery cards
│   │   ├── Showcase.tsx        # Horizontal scroll wine collection showcase
│   │   ├── Culture.tsx         # Red wine pouring sequence & story
│   │   ├── Region.tsx          # Terroir & region highlight
│   │   ├── Buy.tsx             # Interactive purchase section
│   │   └── Contact.tsx         # Footer & newsletter form
│   ├── App.tsx          # Main application wrapper & global state
│   ├── index.css        # Global CSS design tokens, typography & animations
│   └── main.tsx         # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🌐 Deploying to the Web

### Deploy with Vercel (Recommended)

1. Sign in to **[Vercel](https://vercel.com)** with your GitHub account.
2. Click **"Add New"** > **"Project"** and select **`vanishajalady/klintwine`**.
3. Click **"Deploy"** (Vercel automatically detects Vite settings).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
