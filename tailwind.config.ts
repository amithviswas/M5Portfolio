
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
        inter: ['var(--font-inter)', ...fontFamily.sans],
      },
  		colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'bmw-m-blue': 'hsl(var(--bmw-m-blue))',
        'blood-red': 'hsl(var(--blood-red))',
        'uv-blue': 'hsl(var(--uv-blue))',
        'gunmetal-silver': 'hsl(var(--gunmetal-silver))',
        'm-violet': 'hsl(var(--m-violet-hsl))',
        'neutral-900a': 'hsla(var(--neutral-900-hsl), var(--tw-bg-opacity, 1))',
        'neutral-300a': 'hsla(var(--neutral-300-hsl), var(--tw-text-opacity, 1))',
      },
  		borderRadius: {
  			lg: 'var(--radius)', // Should be 0.2rem based on globals
  			md: 'calc(var(--radius) - 0.05rem)', // e.g., 0.15rem
  			sm: 'calc(var(--radius) - 0.1rem)'  // e.g., 0.1rem
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
        'spin-slow': {
          'to': { transform: 'rotate(360deg)' },
        },
        'carbonWeaveShift': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '20px 20px' },
        },
        'pulseDot': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }, // Simplified from 5%, 10%
        },
        'm-rpm-redline-led-pulse': { // More aggressive pulse for redline
          '0%, 100%': {
            boxShadow: 'inset 0 0 8px hsl(var(--background)/0.5), 0 0 25px 8px hsl(var(--primary)/1), 0 0 50px 15px hsl(var(--primary)/0.8)',
            filter: 'brightness(2.5) saturate(2.5)'
          },
          '50%': {
            boxShadow: 'inset 0 0 12px hsl(var(--background)/0.6), 0 0 40px 12px hsl(var(--primary)/1), 0 0 80px 25px hsl(var(--primary)/0.9)',
            filter: 'brightness(3.5) saturate(3.5)'
          }
        },
        'empireMedallionPulse': { // Kept for reference if needed, adjust as per new theme
          '0%, 100%': { 'box-shadow': '0 0 15px 3px hsla(var(--bmw-m-blue), 0.75), 0 0 8px 1px hsla(var(--bmw-m-blue), 0.55) inset, 0 0 20px 2px hsla(var(--uv-blue),.3)' },
          '33%': { 'box-shadow': '0 0 18px 4px hsla(var(--m-violet-hsl), 0.85), 0 0 10px 2px hsla(var(--m-violet-hsl), 0.65) inset, 0 0 25px 3px hsla(var(--uv-blue),.4)' },
          '66%': { 'box-shadow': '0 0 15px 3px hsla(var(--primary), 0.75), 0 0 8px 1px hsla(var(--primary), 0.55) inset, 0 0 20px 2px hsla(var(--uv-blue),.3)' },
        },
        'navMStripeAnimation': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        'skillFluxPulse': {
          '0%, 100%': { boxShadow: '0 0 10px hsl(var(--uv-blue)/0.5), 0 0 5px hsl(var(--primary)/0.3)' },
          '50%': { boxShadow: '0 0 25px hsl(var(--uv-blue)/0.8), 0 0 15px hsl(var(--primary)/0.5), inset 0 0 5px hsl(var(--uv-blue)/0.2)' },
        },
        'skillJitter': {
          '0%': { transform: 'translate(0, 0) rotate(0)' },
          '25%': { transform: 'translate(0.5px, -0.5px) rotate(0.2deg)' },
          '50%': { transform: 'translate(-0.5px, 0.5px) rotate(-0.2deg)' },
          '75%': { transform: 'translate(0.5px, 0.5px) rotate(0.1deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0)' },
        },
        'clickRipple': {
          'to': {
            transform: 'scale(4)',
            opacity: '0'
          }
        },
        // Keep other existing keyframes like goldGlintSweep, bloomGlide, etc.
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'carbon-weave-shift': 'carbonWeaveShift 8s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite ease-in-out', // Standardized pulseDot
        'm-rpm-redline-led-pulse': 'm-rpm-redline-led-pulse 0.15s infinite alternate ease-in-out',
        'empire-medallion-pulse': 'empireMedallionPulse 2.5s infinite linear',
        'nav-m-stripe': 'navMStripeAnimation 0.6s ease-in-out alternate infinite',
        'skill-flux-pulse': 'skillFluxPulse 0.8s infinite ease-in-out',
        'skill-jitter': 'skillJitter 0.15s infinite alternate ease-in-out',
        'click-ripple': 'clickRipple 0.6s linear',
        // Keep other existing animations
  		},
      transitionTimingFunction: {
        'm-throttle': 'var(--ease-m-throttle)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
