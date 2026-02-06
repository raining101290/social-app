/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
            primary: '#00C26F',
            primaryDark: '#008C4F',
            dark: '#3E3E3E',
            darkLight: '#E1E1E1',
            gray: '#E3E3E3',

            text: '#494949',
            textLight: '#7C7C7C',
            textDark: '#1C1C1C',
            white: '#FFFFFF',
            error: '#FF3B30',
            warning: '#FF9500',
            info: '#5AC8FA',
            success: '#4CD964',
            background: '#F2F2F7',
            textPrimary: '#000000',
            textSecondary: '#3C3C4399',
            border: '#C6C6C8',
        },
        fonts: {
            medium:'500',
            semiBold:'600',
            bold:'700',
            extraBold:'800',
        },
        borderColor: {
            light: '#E5E5E5',
            dark: '#3E3E3E',
            primary: '#00C26F',
            error: '#FF3B30',
        },
        borderRadius: {
            xs: 4,
            sm: 8,
            md: 12,
            lg: 16,
            xl: 24,
            xxl: 32,
        },
    },
  },
  plugins: [],
}