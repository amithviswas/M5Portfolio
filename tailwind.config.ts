
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
        serif: ['var(--font-playfair-display)', ...fontFamily.serif],
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans],
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
        'm-performance-blue': 'hsl(var(--bmw-m-blue))', // Legacy, can be replaced by bmw-m-blue
        'shadow-gray': 'hsl(var(--shadow-gray))',
        'm-light-blue': 'hsl(var(--m-light-blue-hsl))',
        'm-red': 'hsl(var(--m-red-hsl))',
        'royal-blue': 'hsl(var(--royal-blue-hsl))', // Added for tachometer
        'crimson': 'hsl(var(--crimson-hsl))',       // Added for tachometer
        'gold': 'hsl(var(--gold-hsl))',             // Added for tachometer
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
        'cameraShutterFlash': {
          '0%, 100%': { filter: 'saturate(1) brightness(1)' },
          '50%': { filter: 'saturate(1.4) brightness(1.3)' },
        },
        'taglineUnderlineGrow': {
          '0%': { width: '0%' },
          '100%': { width: '110%' },
        },
        'bloomGlide': {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0.5)' },
          '50%': { opacity: '0.15', transform: 'translateX(0) translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(50%) translateY(50%) scale(0.5)' },
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
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'ambient-pulse': 'ambientLightPulse 12s infinite ease-in-out',
        'tagline-underline-grow': 'taglineUnderlineGrow 0.5s var(--ease-m-blip) forwards',
        'bloom-glide-1': 'bloomGlide 15s infinite ease-in-out',
        'bloom-glide-2': 'bloomGlide 18s infinite ease-in-out 3s',
        'bloom-glide-3': 'bloomGlide 12s infinite ease-in-out 6s',
        'spin': 'spin 1.2s linear infinite',
        'gantry-pulse': 'gantryPulse 1.5s ease-out',
        'gold-glint': 'goldGlint 1.2s linear infinite',
  		},
      transitionTimingFunction: {
        'm-blip': 'var(--ease-m-blip)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
