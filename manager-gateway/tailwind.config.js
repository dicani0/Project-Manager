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
