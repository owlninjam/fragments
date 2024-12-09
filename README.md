<div align="center">
  <h1>🕌 Fragments - Islamic Voice Interface</h1>
  <p><em>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</em></p>
</div>

## Overview

Fragments is an Islamic-themed voice interface application that combines modern technology with Islamic values and aesthetics. Built with Next.js and enhanced with beautiful Islamic design elements, this application provides a spiritually enriching experience while maintaining full functionality.

### ✨ Key Features

#### 🕌 Prayer Times
- Real-time prayer times for Jammu and Kashmir region
- Follows Hanafi School calculations
- Supports major cities:
  - Srinagar (سرینگر)
  - Jammu (جموں)
  - Anantnag (اننت ناگ)
  - Baramulla (بارہمولہ)
  - Leh (لیہہ)
- Automatic next prayer time indication
- Beautiful Arabic typography

#### 🎨 Islamic Design
- Geometric Islamic patterns
- Arabic calligraphy integration
- Islamic color scheme (green, gold, white)
- Responsive dark/light themes
- Animated UI elements

#### 🗣️ Voice Interface
- Islamic greeting-based interactions
- Voice-guided navigation
- Real-time emotional expression analysis
- Audio visualization with Islamic patterns

#### 📱 Accessibility
- Responsive design for all devices
- RTL (Right-to-Left) support
- Multi-language support (Arabic/English)
- Adjustable text sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/owlninjam/fragments
cd fragments
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_HUME_CONFIG_ID=your_config_id
HUME_API_KEY=your_api_key
HUME_SECRET_KEY=your_secret_key
```

These environment variables are required for the Hume AI Voice SDK:
- `NEXT_PUBLIC_HUME_CONFIG_ID`: Your Hume configuration ID
- `HUME_API_KEY`: Your Hume API key
- `HUME_SECRET_KEY`: Your Hume secret key

You can obtain these credentials by:
1. Creating an account at [Hume AI](https://hume.ai)
2. Going to the API settings page
3. Creating a new API key and configuration

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Voice Processing**: Hume AI Voice SDK
- **Prayer Times**: Aladhan API (Free, no API key required)
- **Fonts**: 
  - Noto Naskh Arabic
  - Noto Kufi Arabic
  - Geist Sans/Mono

## 📦 Project Structure

```
fragments/
├── app/                    # Next.js app directory
├── components/            
│   ├── islamic/           # Islamic-themed components
│   │   ├── PrayerTimes.tsx
│   │   ├── IslamicGreeting.tsx
│   │   ├── GeometricPattern.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── IslamicLayout.tsx
│   └── ui/                # Base UI components
├── styles/                # Global styles and theme
├── utils/                 # Utility functions
└── public/               # Static assets
```

## 🌟 Features in Detail

### Prayer Times Component
- Uses Aladhan API for accurate prayer times
- Hanafi calculation method
- Real-time updates
- City selection with Arabic names
- Next prayer highlighting
- 12-hour time format
- Automatic timezone handling

### Islamic Design System
- Custom geometric patterns
- Islamic color palette
- Arabic typography integration
- Animated transitions
- Responsive layouts
- Dark/Light theme support

### Voice Interface
- Islamic greeting integration
- Voice-guided navigation
- Real-time emotional analysis
- Audio visualization

## 🤝 Contributing

We welcome contributions that align with Islamic values and enhance the application's features. Please ensure your contributions:

1. Respect Islamic principles and values
2. Maintain code quality and performance
3. Include appropriate documentation
4. Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to [Aladhan API](https://aladhan.com/prayer-times-api) for providing free prayer times data
- Thanks to Google Fonts for Arabic typography
- Special thanks to the Muslim developer community

## 📞 Support

If you encounter any issues or have suggestions, please:
1. Check existing issues or create a new one
2. Follow the contribution guidelines
3. Reach out through the repository's discussion section

---

<div align="center">
  <p>Made with ❤️ for the Ummah</p>
  <p>May Allah (ﷻ) accept this work and make it beneficial for all</p>
</div>
