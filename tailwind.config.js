/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paradox Engine Palette
                omega: {
                    black: '#0A0E14',
                    gray: '#1C2128',
                    cobalt: '#0EA5E9',
                    amber: '#F59E0B'
                },
                alpha: {
                    bg: '#1a1a1a', // Placeholder
                },
                beta: {
                    cream: '#F5F5DC',
                    warmGray: '#8B8680',
                    sage: '#8A9A5B'
                },
                theta: {
                    purple: '#6B46C1',
                    amber: '#F59E0B',
                    red: '#DC2626'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                serif: ['Georgia', 'serif'],
            },
        },
    },
    plugins: [],
}
