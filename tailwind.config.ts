
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
        sans: ['var(--font-inter)', ...fontFamily.sans], 
        rajdhani: ['var(--font-rajdhani)', ...fontFamily.sans],
        'playfair-display': ['var(--font-playfair-display)', ...fontFamily.serif],
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans],
        fraunces: ['var(--font-fraunces)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.sans],
        orbitron: ['Orbitron', ...fontFamily.sans], 
        'exo-2': ['"Exo 2"', ...fontFamily.sans], 
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
      },
  		borderRadius: {
  			lg: 'var(--radius)', 
  			md: 'calc(var(--radius))', 
  			sm: 'calc(var(--radius))'  
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
        spin: { /* Ensured Tailwind's default spin is available for direct use */
          'to': { transform: 'rotate(360deg)' },
        },
        'carbonWeaveShift': { 
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '4px 4px' }, 
        },
        'pulseDot': { 
          '0%, 100%': { opacity: '0.6', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)', boxShadow: '0 0 8px hsl(var(--primary))' },
        },
        'm-rpm-redline-led-pulse': { 
           '0%, 100%': {
            boxShadow: 'inset 0 0 5px hsla(0,0%,0%,0.6), 0 0 20px 5px hsl(var(--primary)/0.8), 0 0 40px 10px hsl(var(--primary)/0.6)',
            filter: 'brightness(2.2) saturate(2.2)'
          },
          '50%': {
            boxShadow: 'inset 0 0 8px hsla(0,0%,0%,0.7), 0 0 30px 8px hsl(var(--primary)/1), 0 0 60px 15px hsl(var(--primary)/0.9)',
            filter: 'brightness(3.0) saturate(3.0)'
          }
        },
        'navMStripeAnimation': { 
          '0%': { backgroundPosition: '150% 0%' }, 
          '100%': { backgroundPosition: '-50% 0%' }, 
        },
        'skillFluxPulse': { 
          '0%, 100%': { borderColor: 'hsl(var(--uv-blue)/0.5)', boxShadow: '0 0 8px hsl(var(--uv-blue)/0.3), 0 0 4px hsl(var(--primary)/0.2)' },
          '50%': { borderColor: 'hsl(var(--uv-blue))', boxShadow: '0 0 20px hsl(var(--uv-blue)/0.7), 0 0 10px hsl(var(--primary)/0.4), inset 0 0 4px hsl(var(--uv-blue)/0.3)' },
        },
        'skillJitter': { 
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
        'fadeInSlideUpCustomTiming': { 
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'empireMedallionPulse': {
          '0%, 100%': { 'box-shadow': '0 0 12px 2px hsla(var(--bmw-m-blue), 0.6), 0 0 6px 1px hsla(var(--bmw-m-blue), 0.4) inset, 0 0 15px 1px hsla(var(--uv-blue),.25)' },
          '33%': { 'box-shadow': '0 0 15px 3px hsla(var(--m-violet-hsl), 0.7), 0 0 8px 2px hsla(var(--m-violet-hsl), 0.5) inset, 0 0 20px 2px hsla(var(--uv-blue),.3)' },
          '66%': { 'box-shadow': '0 0 12px 2px hsla(var(--primary), 0.6), 0 0 6px 1px hsla(var(--primary), 0.4) inset, 0 0 15px 1px hsla(var(--uv-blue),.25)' },
        },
        'headlightSweep': { 
          '0%': { transform: 'translateX(-6vw) rotate(-15deg)' },
          '100%': { transform: 'translateX(6vw) rotate(-15deg)' },
        },
        'gantryLightPulse': { 
          '0%, 100%': { opacity: '0', transform: 'scaleX(0.8)' },
          '50%': { 
            opacity: '1', 
            transform: 'scaleX(1)', 
            boxShadow: '0 0 8px 2px hsla(var(--bmw-m-blue), 0.5), 0 0 15px 3px hsla(var(--foreground), 0.3)'
          }
        },
        'nightfallMedallionSpin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'bloomGlide': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.06' },
          '50%': { transform: 'translate(12px, 8px) scale(1.08)', opacity: '0.09' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.06' },
        },
        'nanoDriftAndFade': {
          '0%': { transform: 'translate(0, 0) scale(0.4)', opacity: '0' },
          '20%': { opacity: '0.75', transform: 'scale(1.1)' },
          '80%': { opacity: '0.75', transform: 'scale(1.1)' },
          '100%': { transform: 'translate(var(--drift-x, 0px), var(--drift-y, 0px)) scale(0.4)', opacity: '0' },
        },
        'verticalFlareSweep': {
          '0%': { transform: 'translateY(-120%) scaleY(0.4)', opacity: '0' },
          '10%, 20%': { transform: 'translateY(0) scaleY(1.1)', opacity: '1' },
          '30%, 100%': { transform: 'translateY(120%) scaleY(0.4)', opacity: '0' },
        },
        'rareSectionVisualPulse': {
          '0%': { boxShadow: 'inset 0 0 0 0px hsl(var(--primary)/0)' },
          '50%': { boxShadow: 'inset 0 0 0 5px hsl(var(--primary)/0.2)' },
          '100%': { boxShadow: 'inset 0 0 0 0px hsl(var(--primary)/0)' },
        },
        'hyperScrollVisualFeedback': {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(0.9) saturate(1.4)' },
          '100%': { filter: 'brightness(1)' },
        },
        'ghostlineSkillPulse': {
          '0%, 100%': { borderColor: 'hsla(var(--uv-blue),0.85)' },
          '50%': { borderColor: 'hsla(var(--uv-blue),0.45)' },
        },
        'erraticGlowAnimation': {
          '0%': { boxShadow: '0 0 10px hsl(var(--primary)/0.4), 0 0 5px hsl(var(--accent)/0.2)' },
          '25%': { boxShadow: '0 0 15px hsl(var(--primary)/0.6), 0 0 8px hsl(var(--accent)/0.3), 0 0 5px hsl(var(--uv-blue)/0.2)' },
          '50%': { boxShadow: '0 0 9px hsl(var(--primary)/0.35), 0 0 4px hsl(var(--accent)/0.15)' },
          '75%': { boxShadow: '0 0 18px hsl(var(--primary)/0.7), 0 0 10px hsl(var(--accent)/0.4), 0 0 7px hsl(var(--uv-blue)/0.3)' },
          '100%': { boxShadow: '0 0 10px hsl(var(--primary)/0.4), 0 0 5px hsl(var(--accent)/0.2)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'spin': 'spin 1s linear infinite', /* Default spin if animate-spin is used */
        'carbon-weave-shift': 'carbonWeaveShift 8s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite ease-in-out',
        'm-rpm-redline-led-pulse': 'm-rpm-redline-led-pulse 0.15s infinite alternate ease-in-out',
        'nav-m-stripe': 'navMStripeAnimation 1.2s linear infinite paused', 
        'skill-flux-pulse': 'skillFluxPulse 0.8s infinite ease-in-out',
        'skill-jitter': 'skillJitter 0.3s infinite alternate ease-in-out',
        'click-ripple': 'clickRipple 0.6s linear',
        'hero-text-reveal': 'fadeInSlideUpCustomTiming 0.7s var(--ease-m-throttle) forwards',
        'empire-medallion-pulse': 'empireMedallionPulse 2.5s infinite linear',
        'headlight-sweep': 'headlightSweep 18s infinite alternate ease-in-out',
        'gantry-light-pulse': 'gantryLightPulse 1.5s ease-in-out',
        'nightfall-medallion-spin': 'nightfallMedallionSpin 8s linear infinite',
        'bloom-glide': 'bloomGlide 18s infinite alternate ease-in-out',
        'nano-drift': 'nanoDriftAndFade 10s infinite ease-in-out',
        'vertical-flare-sweep': 'verticalFlareSweep 12s infinite ease-in-out',
  		},
      transitionTimingFunction: {
        'm-throttle': 'var(--ease-m-throttle)', 
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
