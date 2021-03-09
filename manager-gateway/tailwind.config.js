const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cyan: colors.cyan,
            }
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(34, 211, 238, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(34, 211, 238, 0.1), 0 1px 2px 0 rgba(34, 211, 238, 0.06)',
            md: '0 4px 6px -1px rgba(34, 211, 238, 0.1), 0 2px 4px -1px rgba(34, 211, 238, 0.06)',
            lg: '0 10px 15px -3px rgba(34, 211, 238, 0.1), 0 4px 6px -2px rgba(34, 211, 238, 0.05)',
            xl: '0 20px 25px -5px rgba(34, 211, 238, 0.1), 0 10px 10px -5px rgba(34, 211, 238, 0.04)',
            '2xl': '0 25px 50px -12px rgba(34, 211, 238, 0.25)',
            '3xl': '0 35px 60px -15px rgba(34, 211, 238, 0.3)',
            inner: 'inset 0 2px 4px 0 rgba(34, 211, 238, 0.06)',
            custom: '5px 5px 5px 5px rgba(0, 255, 255, 0.2)',
            none: 'none',
        }
    },
    variants: {
        extend: {
            ringWidth: ['hover'],
            ringColor: ['hover'],
            borderWidth: ["hover"],
        },
    },
    plugins: [],
}
