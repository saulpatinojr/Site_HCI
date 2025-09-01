# Site_HCI - Development Guide

## Quick Start

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

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes LLM generation)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Clean install (removes node_modules and reinstalls)
- `npm run deploy` - Automated deployment
- `npm run create-component` - Generate component templates

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your actual API keys and credentials
3. Never commit the `.env` file to version control

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   └── ui/           # Base UI components
├── context/          # React contexts
├── contexts/         # Additional contexts
├── lib/             # Utility libraries
├── pages/           # Page components
├── App.jsx          # Main app component
└── main.jsx         # App entry point
```

## Key Features

- **React 18** with modern hooks
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **Supabase** for backend services

## Component Generation

```bash
# Create a new layout component
npm run create-component Header layout

# Create a new UI component
npm run create-component Button ui
```

## Deployment

Run `npm run deploy` for automated deployment with linting and build verification.