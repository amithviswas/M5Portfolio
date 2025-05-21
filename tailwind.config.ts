
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
        'm-violet': 'hsl(var(--m-violet-hsl))',
        'royal-blue': 'hsl(var(--royal-blue-hsl))', 
        'crimson': 'hsl(var(--crimson-hsl))',       
        'gold': 'hsl(var(--gold-hsl))',
        'i-blue-fog': 'hsl(var(--i-blue-fog-hsl))',
        'hyper-violet': 'hsl(var(--hyper-violet-hsl))',
        'voltage-gold': 'hsl(var(--voltage-gold-hsl))',
        'uv-blue': 'hsl(var(--uv-blue))',
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
        'spin-slow': { 
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
        'mStripePulse': { 
          '0%, 100%': { borderColor: 'hsl(var(--bmw-m-blue))', boxShadow: '0 0 5px hsl(var(--bmw-m-blue)/0.5)' },
          '33%': { borderColor: 'hsl(var(--uv-blue))', boxShadow: '0 0 7px hsl(var(--uv-blue)/0.6)' },
          '66%': { borderColor: 'hsl(var(--primary))', boxShadow: '0 0 5px hsl(var(--primary)/0.5)' },
        },
        'mStripeConicPulse': {
          '0%, 100%': { opacity: '0.7', filter: 'blur(1px) brightness(1)' },
          '50%': { opacity: '1', filter: 'blur(0.5px) brightness(1.3)' },
        },
        'neonSweep': { 
          '0%': { width: '0%', left: '0%', opacity: '0.5' },
          '40%': { width: '100%', left: '0%', opacity: '1' },
          '60%': { width: '100%', left: '0%', opacity: '1' },
          '100%': { width: '0%', left: '100%', opacity: '0.5' },
        },
        'liquidTitaniumSheen': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'nanoParticleDrift': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.02' },
          '50%': { transform: 'translate(5px, -5px) scale(1.1)', opacity: '0.05' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.02' },
        },
        'buttonCrystalBorderSpin': { 
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        'buttonNeonFlicker': {
            '0%, 100%': { textShadow: '0 0 2px #fff, 0 0 5px hsl(var(--primary)), 0 0 8px hsl(var(--primary))', opacity: '1'},
            '50%': { textShadow: '0 0 3px #fff, 0 0 7px hsl(var(--accent)), 0 0 12px hsl(var(--accent))', opacity: '0.8' },
        },
        'buttonClickRipple': { 
            '0%': { transform: 'scale(0)', opacity: '0.7' },
            '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'tachometerSineWave': {
            '0%, 100%': { transform: 'translateY(0) scaleX(1)' },
            '25%': { transform: 'translateY(-1px) scaleX(1.01)' },
            '50%': { transform: 'translateY(0) scaleX(1)' },
            '75%': { transform: 'translateY(1px) scaleX(0.99)' },
        },
        'headlightSweep': {
          '0%': { transform: 'translateX(-6vw) rotate(-15deg)' },
          '100%': { transform: 'translateX(6vw) rotate(-15deg)' },
        },
        'skillJitter': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(0.5px, -0.5px)' },
          '50%': { transform: 'translate(-0.5px, 0.5px)' },
          '75%': { transform: 'translate(0.5px, 0.5px)' },
        },
        'erraticGlowPulse': {
          '0%': { boxShadow: '0 0 10px hsl(var(--destructive)/0.4), 0 0 5px hsla(var(--uv-blue)/0.2)' },
          '100%': { boxShadow: '0 0 25px hsl(var(--destructive)/0.8), 0 0 10px hsla(var(--uv-blue)/0.4)' },
        },
        'rareSectionPulse': {
          '0%, 100%': { boxShadow: 'inset 0 0 0 0px hsl(var(--uv-blue)/0)' },
          '50%': { boxShadow: 'inset 0 0 0 15px hsl(var(--uv-blue)/0.25)' },
        },
        'hyperactiveFeedbackFlash': {
          '0%, 100%': { backgroundColor: 'hsl(var(--background))', border: '2px solid transparent' },
          '50%': { backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--primary)/0.6)' },
        },
        'carbonWeaveShift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '16px 16px' },
        },
        'pulseLed': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '5%': { opacity: '1', transform: 'scale(1)' },
          '10%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'cameraShutterFlash': {
          '0%, 100%': { filter: 'saturate(1) brightness(1)' },
          '50%': { filter: 'saturate(1.4) brightness(1.3)' },
        },
        'm-rpm-redline-led-pulse': { 
          '0%': {
            filter: 'brightness(1.5) saturate(1.5)',
            boxShadow: 'inset 0 0 4px hsla(var(--primary),0.6), 0 0 10px hsla(var(--primary),0.8), 0 0 20px hsla(var(--primary),0.6), 0 0 0 1.5px hsl(var(--primary), 0.7)',
          },
          '50%': {
            filter: 'brightness(3.5) saturate(3.0)',
            boxShadow: 'inset 0 0 7px hsla(var(--primary),1), 0 0 25px hsla(var(--primary),1.5), 0 0 50px hsla(var(--primary),1.2), 0 0 0 2.5px hsl(var(--primary), 1)',
          },
          '100%': {
            filter: 'brightness(2.0) saturate(2.0)',
            boxShadow: 'inset 0 0 5px hsla(var(--primary),0.8), 0 0 15px hsla(var(--primary),1), 0 0 30px hsla(var(--primary),0.8), 0 0 0 2px hsl(var(--primary), 0.9)',
          },
        },
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
        'm-stripe-conic-pulse': 'mStripeConicPulse 3s linear infinite paused',
        'neon-sweep': 'neonSweep 6s linear infinite',
        'gold-glint': 'goldGlint 1.2s linear infinite',
        'liquid-titanium-sheen': 'liquidTitaniumSheen 5s linear infinite',
        'nano-particle-drift': 'nanoParticleDrift 10s linear infinite alternate',
        'button-crystal-border-spin': 'buttonCrystalBorderSpin 5s linear infinite',
        'button-neon-flicker': 'buttonNeonFlicker 0.3s infinite alternate',
        'button-click-ripple': 'buttonClickRipple 0.3s ease-out forwards',
        'tachometer-sine-wave': 'tachometerSineWave 2s infinite ease-in-out',
        'headlight-sweep': 'headlightSweep 18s linear infinite alternate',
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite', 
        'skill-jitter': 'skillJitter 0.15s infinite linear',
        'erratic-glow-pulse': 'erraticGlowPulse 0.5s infinite alternate',
        'rare-section-pulse': 'rareSectionPulse 0.3s ease-out',
        'hyperactive-feedback-flash': 'hyperactiveFeedbackFlash 0.2s ease-out',
        'carbon-weave-shift': 'carbonWeaveShift 8s linear infinite',
        'pulse-led': 'pulseLed 10s infinite ease-in-out',
        'animate-camera-flash': 'cameraShutterFlash 0.25s ease-in-out',
        'm-rpm-led-pulse': 'm-rpm-redline-led-pulse 0.25s ease-out forwards', 
  		},
      transitionTimingFunction: {
        'm-throttle': 'var(--ease-m-throttle)', 
        'ease-out-expo': 'var(--ease-out-expo)',
        'ease-out-back': 'var(--ease-out-back)', 
        'ease-torque-kick': 'var(--ease-torque-kick)',
        'ease-acceleration-curve-in': 'var(--ease-acceleration-curve-in)',
        'ease-acceleration-curve-out': 'var(--ease-acceleration-curve-out)',