
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
        'neutral-900a': 'hsla(var(--neutral-900-hsl), var(--tw-bg-opacity, 1))', 
        'neutral-300a': 'hsla(var(--neutral-300-hsl), var(--tw-text-opacity, 1))', 
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
        'spin-slow': {
          'to': { transform: 'rotate(360deg)' },
        },
        'carbonWeaveShift': { 
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '20px 20px' },
        },
        'pulseDot': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '5%': { opacity: '1', transform: 'scale(1.1)' },
          '10%': { opacity: '0.7', transform: 'scale(1)' },
        },
        'navCrestFlash': {
          '0%': { background: 'hsl(var(--accent))' },
          '50%': { background: 'hsl(var(--m-violet-hsl))' },
          '100%': { background: 'hsl(var(--primary))' },
        },
        'm-rpm-redline-pulse': { /* Updated for RPM Gauge */
          '0%': { 
            boxShadow: 'inset 0 0 6px hsl(var(--background)/0.4), 0 0 12px 3px hsl(var(--primary)/0.8), 0 0 25px 6px hsl(var(--primary)/0.5)',
            filter: 'brightness(1.3)'
          },
          '100%': { 
            boxShadow: 'inset 0 0 10px hsl(var(--background)/0.5), 0 0 20px 5px hsl(var(--primary)/1), 0 0 40px 10px hsl(var(--primary)/0.7)',
            filter: 'brightness(1.7)'
          }
        },
        'empireMedallionPulse': {
          '0%, 100%': { 'box-shadow': '0 0 8px 2px hsla(var(--bmw-m-blue), 0.7)' },
          '33%': { 'box-shadow': '0 0 10px 3px hsla(var(--m-violet-hsl), 0.7)' },
          '66%': { 'box-shadow': '0 0 8px 2px hsla(var(--primary), 0.7)' },
        },
        'goldGlintSweep': {
          '0%': { opacity: '0', 'background-position': '-100% 0' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0', 'background-position': '100% 0' },
        },
        'bloomGlide': {
          '0%': { transform: 'translate(0,0) scale(0.8)', opacity: '0' },
          '25%': { opacity: '0.1' },
          '50%': { transform: 'translate(10vw, -5vh) scale(1.2)', opacity: '0.15' },
          '75%': { opacity: '0.1' },
          '100%': { transform: 'translate(-10vw, 5vh) scale(0.8)', opacity: '0' },
        },
        'nanoDrift': {
          '0%, 100%': { transform: 'translate(0,0)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '75%': { transform: 'translate(50px, -30px) scale(0.5)', opacity: '0.2' },
        },
        'flareShift': {
          from: { transform: 'translateX(-20px)' },
          to: { transform: 'translateX(20px)' },
        },
        'gantrySweepAnimation': {
          '0%': { opacity: '0', transform: 'scaleX(0.2) translateX(-50%)' },
          '50%': { opacity: '1', transform: 'scaleX(1) translateX(0)' },
          '100%': { opacity: '0', transform: 'scaleX(0.2) translateX(50%)' },
        },
        'skillTrailFadeOut': { to: { opacity: '0'} },
        'rareSectionVisualPulse': {
          '0%': { 'box-shadow': '0 0 0 0px hsl(var(--accent)/0)' },
          '50%': { 'box-shadow': '0 0 0 10px hsl(var(--accent)/0.3)' },
          '100%': { 'box-shadow': '0 0 0 0px hsl(var(--accent)/0)' },
        },
        'hyperScrollVisualFeedback': {
          '0%': { filter: 'saturate(1) brightness(1)' },
          '50%': { filter: 'saturate(1.5) brightness(1.1) hue-rotate(15deg)' },
          '100%': { filter: 'saturate(1) brightness(1)' },
        },
        'ghostlineSkillPulse': {
          '0%, 100%': { 'box-shadow': '0 0 5px hsl(var(--uv-blue)/0.3)' },
          '50%': { 'box-shadow': '0 0 15px hsl(var(--uv-blue)/0.6)' },
        },
        'skillJitter': {
          '0%': { transform: 'translate(0, 0) rotate(0)' },
          '25%': { transform: 'translate(1px, -1px) rotate(0.5deg)' },
          '50%': { transform: 'translate(-1px, 1px) rotate(-0.5deg)' },
          '75%': { transform: 'translate(1px, 1px) rotate(0.25deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0)' },
        },
        'erraticGlowAnimation': {
          '0%': { 'box-shadow': '0 0 5px hsl(var(--primary)/0.2), 0 0 3px hsl(var(--accent)/0.1)' },
          '25%': { 'box-shadow': '0 0 15px hsl(var(--primary)/0.5), 0 0 8px hsl(var(--accent)/0.3)', transform: 'scale(1.01)' },
          '50%': { 'box-shadow': '0 0 3px hsl(var(--primary)/0.1), 0 0 10px hsl(var(--accent)/0.4)' },
          '75%': { 'box-shadow': '0 0 12px hsl(var(--primary)/0.4), 0 0 5px hsl(var(--accent)/0.2)', transform: 'scale(0.99)' },
          '100%': { 'box-shadow': '0 0 5px hsl(var(--primary)/0.2), 0 0 3px hsl(var(--accent)/0.1)' },
        },
        'navRPMItemPulse': {
          from: { transform: 'translateX(-50%) scaleX(0.7)', 'box-shadow': '0 0 8px hsl(var(--accent)/0.5)' },
          to:   { transform: 'translateX(-50%) scaleX(0.75)', 'box-shadow': '0 0 12px hsl(var(--accent)/0.7)' }
        },
        'navRPMItemPulseActive': {
          from: { transform: 'translateX(-50%) scaleX(0.7)', 'box-shadow': '0 0 10px hsl(var(--primary)/0.6)' },
          to:   { transform: 'translateX(-50%) scaleX(0.8)', 'box-shadow': '0 0 15px hsl(var(--primary)/0.8)' }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'carbon-weave-shift': 'carbonWeaveShift 8s linear infinite',
        'pulse-dot': 'pulseDot 10s infinite ease-in-out',
        'nav-crest-flash': 'navCrestFlash 300ms ease-in-out forwards',
        'm-rpm-redline-pulse': 'm-rpm-redline-pulse 0.4s infinite alternate ease-in-out',
        'empire-medallion-pulse': 'empireMedallionPulse 3s infinite linear',
        'gold-glint-sweep': 'goldGlintSweep 1.2s linear forwards',
        'bloom-glide': 'bloomGlide 15s infinite alternate ease-in-out',
        'nano-drift': 'nanoDrift 8s infinite ease-in-out',
        'flare-shift': 'flareShift 10s infinite alternate ease-in-out',
        'gantry-sweep-animation': 'gantrySweepAnimation 0.7s ease-out forwards',
        'skill-trail-fade-out': 'skillTrailFadeOut 0.5s 0.2s forwards',
        'rare-section-visual-pulse': 'rareSectionVisualPulse 0.5s ease-out forwards',
        'hyper-scroll-visual-feedback': 'hyperScrollVisualFeedback 0.3s ease-out forwards',
        'ghostline-skill-pulse': 'ghostlineSkillPulse 2s infinite ease-in-out',
        'skill-jitter': 'skillJitter 0.3s infinite alternate ease-in-out',
        'erratic-glow': 'erraticGlowAnimation 0.8s infinite ease-in-out',
        'nav-rpm-item-pulse': 'navRPMItemPulse 0.6s infinite alternate',
        'nav-rpm-item-pulse-active': 'navRPMItemPulseActive 0.8s infinite alternate'
  		},
      transitionTimingFunction: {
        'm-throttle': 'var(--ease-m-throttle)', 
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
