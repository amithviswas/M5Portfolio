import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-rajdhani)', ...fontFamily.sans],
        rajdhani: ['var(--font-rajdhani)', ...fontFamily.sans],
        'playfair-display': ['var(--font-playfair-display)', ...fontFamily.serif],
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans],
        fraunces: ['var(--font-fraunces)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.sans], // Inter as alternative for Satoshi/General Sans
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        'blood-red': 'hsl(var(--blood-red))',
        'bmw-m-blue': 'hsl(var(--bmw-m-blue))', 
        'shadow-gray': 'hsl(var(--shadow-gray))',
        'm-light-blue': 'hsl(var(--m-light-blue-hsl))',
        'm-red': 'hsl(var(--m-red-hsl))',
        'royal-blue': 'hsl(var(--royal-blue-hsl))', 
        'crimson': 'hsl(var(--crimson-hsl))',       
        'gold': 'hsl(var(--gold-hsl))',
        'i-blue-fog': 'hsl(var(--i-blue-fog-hsl))',
        'hyper-violet': 'hsl(var(--hyper-violet-hsl))',
        'voltage-gold': 'hsl(var(--voltage-gold-hsl))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'ambientLightPulse': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.08)' },
        },
        'taglineUnderlineGrow': {
          '0%': { width: '0%' },
          '100%': { width: '110%' },
        },
        'bloomGlide': {
          '0%, 100%': { opacity: '0.05', transform: 'scale(0.8) translate(var(--tx-start, -10px), var(--ty-start, -10px));' },
          '50%': { opacity: '0.15', transform: 'scale(1) translate(var(--tx-end, 10px), var(--ty-end, 10px));' },
        },
        'spin': {
          'to': { transform: 'rotate(360deg)' },
        },
        'gantryPulse': {
          '0%, 100%': { opacity: '0.3', boxShadow: '0 0 5px hsl(var(--m-light-blue-hsl)/0.3)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 15px hsl(var(--m-light-blue-hsl)/0.7), 0 0 25px hsl(var(--m-light-blue-hsl)/0.5)' },
        },
        'goldGlint': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'mStripePulse': { // For medallion
          '0%, 100%': { borderColor: 'hsl(var(--m-light-blue-hsl))', boxShadow: '0 0 5px hsl(var(--m-light-blue-hsl)/0.5)' },
          '33%': { borderColor: 'hsl(var(--m-violet-hsl))', boxShadow: '0 0 7px hsl(var(--m-violet-hsl)/0.6)' },
          '66%': { borderColor: 'hsl(var(--m-red-hsl))', boxShadow: '0 0 5px hsl(var(--m-red-hsl)/0.5)' },
        },
        'neonSweep': { // For headline beam
          '0%': { width: '0%', left: '0' },
          '50%': { width: '100%', left: '0' },
          '50.01%': { width: '100%', left: 'auto', right:'0' },
          '100%': { width: '0%', left: 'auto', right: '0' },
        },
        'nanoParticleDrift': { // For Atelier background shimmer
          '0%': { transform: 'translate(0, 0)', opacity: 0 },
          '20%': { opacity: 0.05 },
          '80%': { opacity: 0.05 },
          '100%': { transform: 'translate(20px, -20px)', opacity: 0 },
        },
        'buttonCrystalBorderSpin': { // For Start/Stop button border
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        'buttonNeonFlicker': { // For Start/Stop button hover
            '0%, 100%': { textShadow: '0 0 2px #fff, 0 0 5px hsl(var(--primary)), 0 0 8px hsl(var(--primary))', opacity: 1},
            '50%': { textShadow: '0 0 3px #fff, 0 0 7px hsl(var(--accent)), 0 0 12px hsl(var(--accent))', opacity: 0.8 },
        },
        'buttonClickRipple': { // For Start/Stop button click
            '0%': { transform: 'scale(0)', opacity: 0.7 },
            '100%': { transform: 'scale(2)', opacity: 0 },
        },
        'tachometerSineWave': { // For RPM Tachometer
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-2px)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'ambient-pulse': 'ambientLightPulse 12s infinite ease-in-out',
        'tagline-underline-grow': 'taglineUnderlineGrow 0.6s var(--ease-out-expo) forwards',
        'bloom-glide-1': 'bloomGlide 15s infinite ease-in-out',
        'bloom-glide-2': 'bloomGlide 18s infinite ease-in-out 3s',
        'bloom-glide-3': 'bloomGlide 12s infinite ease-in-out 6s',
        'm-stripe-pulse': 'mStripePulse 3s linear infinite',
        'neon-sweep': 'neonSweep 6s linear infinite',
        'gold-glint': 'goldGlint 1.2s linear infinite',
        'nano-particle-drift': 'nanoParticleDrift 8s linear infinite',
        'button-crystal-border-spin': 'buttonCrystalBorderSpin 5s linear infinite',
        'button-neon-flicker': 'buttonNeonFlicker 0.3s infinite alternate',
        'button-click-ripple': 'buttonClickRipple 0.3s ease-out forwards',
        'tachometer-sine-wave': 'tachometerSineWave 1.5s infinite ease-in-out',
  		},
      transitionTimingFunction: {
        'm-blip': 'var(--ease-m-blip)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // For Studio Glide
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;