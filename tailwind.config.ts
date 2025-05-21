
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
        sans: ['var(--font-inter)', ...fontFamily.sans], // Changed default sans to Inter
        rajdhani: ['var(--font-rajdhani)', ...fontFamily.sans],
        'playfair-display': ['var(--font-playfair-display)', ...fontFamily.serif],
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans],
        fraunces: ['var(--font-fraunces)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.sans],
        orbitron: ['Orbitron', ...fontFamily.sans], // Added Orbitron
        'exo-2': ['"Exo 2"', ...fontFamily.sans], // Added Exo 2
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
  			lg: 'var(--radius)', // Will be 0.1rem
  			md: 'calc(var(--radius))', // Adjusted to be same as --radius for sharpness
  			sm: 'calc(var(--radius))'  // Adjusted to be same as --radius for sharpness
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
        'carbonWeaveShift': { // Kept from Apex Finish, subtle
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '10px 10px' }, // Smaller shift for finer weave feel
        },
        'pulseDot': { // For M-stripe LED dots on footer
          '0%, 100%': { opacity: '0.6', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)', boxShadow: '0 0 8px hsl(var(--primary))' },
        },
        'm-rpm-redline-led-pulse': { // For Apex Meter redline
           '0%, 100%': {
            boxShadow: 'inset 0 0 5px hsla(0,0%,0%,0.6), 0 0 20px 5px hsl(var(--primary)/0.8), 0 0 40px 10px hsl(var(--primary)/0.6)',
            filter: 'brightness(2.2) saturate(2.2)'
          },
          '50%': {
            boxShadow: 'inset 0 0 8px hsla(0,0%,0%,0.7), 0 0 30px 8px hsl(var(--primary)/1), 0 0 60px 15px hsl(var(--primary)/0.9)',
            filter: 'brightness(3.0) saturate(3.0)'
          }
        },
        'navMStripeAnimation': { // For navbar underline laser sweep
          '0%': { backgroundPosition: '200% 0%' }, // Start off-screen to the right
          '100%': { backgroundPosition: '-100% 0%' }, // Sweep to off-screen to the left
        },
        'skillFluxPulse': { // For Overclocked Skill Engine
          '0%, 100%': { borderColor: 'hsl(var(--uv-blue)/0.5)', boxShadow: '0 0 8px hsl(var(--uv-blue)/0.3), 0 0 4px hsl(var(--primary)/0.2)' },
          '50%': { borderColor: 'hsl(var(--uv-blue))', boxShadow: '0 0 20px hsl(var(--uv-blue)/0.7), 0 0 10px hsl(var(--primary)/0.4), inset 0 0 4px hsl(var(--uv-blue)/0.3)' },
        },
        'skillJitter': { // For Overclocked Skill Engine
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(0.5px, -0.5px)' },
          '50%': { transform: 'translate(-0.5px, 0.5px)' },
          '75%': { transform: 'translate(0.5px, 0.5px)' },
        },
        'clickRipple': {
          'to': {
            transform: 'scale(4)',
            opacity: '0'
          }
        },
        'fadeInSlideUpCustomTiming': { // Kept for Hero elements
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Keyframes from previous themes if still relevant and don't conflict
        'empireMedallionPulse': {
          '0%, 100%': { 'box-shadow': '0 0 12px 2px hsla(var(--bmw-m-blue), 0.6), 0 0 6px 1px hsla(var(--bmw-m-blue), 0.4) inset, 0 0 15px 1px hsla(var(--uv-blue),.25)' },
          '33%': { 'box-shadow': '0 0 15px 3px hsla(var(--m-violet-hsl), 0.7), 0 0 8px 2px hsla(var(--m-violet-hsl), 0.5) inset, 0 0 20px 2px hsla(var(--uv-blue),.3)' },
          '66%': { 'box-shadow': '0 0 12px 2px hsla(var(--primary), 0.6), 0 0 6px 1px hsla(var(--primary), 0.4) inset, 0 0 15px 1px hsla(var(--uv-blue),.25)' },
        },
        'headlightSweep': { // For hero background sweep
          '0%': { transform: 'translateX(-6vw) rotate(-15deg)' },
          '100%': { transform: 'translateX(6vw) rotate(-15deg)' },
        },
        'gantrySweepAnimation': { // For section teaser lights
          '0%': { transform: 'translateX(-100%)', opacity: '0.5' },
          '50%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0.5' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'carbon-weave-shift': 'carbonWeaveShift 8s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite ease-in-out',
        'm-rpm-redline-led-pulse': 'm-rpm-redline-led-pulse 0.15s infinite alternate ease-in-out',
        'nav-m-stripe': 'navMStripeAnimation 1.2s linear infinite paused', // Control play state with class
        'skill-flux-pulse': 'skillFluxPulse 0.8s infinite ease-in-out',
        'skill-jitter': 'skillJitter 0.3s infinite alternate ease-in-out',
        'click-ripple': 'clickRipple 0.6s linear',
        'hero-text-reveal': 'fadeInSlideUpCustomTiming 0.7s var(--ease-m-throttle) forwards',
        'empire-medallion-pulse': 'empireMedallionPulse 2.5s infinite linear',
        'headlight-sweep': 'headlightSweep 18s infinite alternate ease-in-out',
        'gantry-sweep': 'gantrySweepAnimation 0.7s ease-out forwards',
  		},
      transitionTimingFunction: {
        'm-throttle': 'var(--ease-m-throttle)', // cubic-bezier(.36,1.08,.33,1)
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
