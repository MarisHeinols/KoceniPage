import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
	palette: {
		mode: 'light', // or 'dark'
		primary: {
			main: '#1976d2', // your brand color
		},
		secondary: {
			main: '#9c27b0',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
		body1: {
			fontSize: '1rem',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: 'none',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					height: '3rem',
					width: '25rem',
					backgroundColor: 'none',
					borderRadius: 8,
					padding: '10px 14px',
					'&:hover': {
						backgroundColor: '#e0e0e0',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#558746',
					},
				},
				notchedOutline: {
					borderColor: '#ccc',
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					border: '1px solid #ccc',
					borderRadius: 8,
					minHeight: 40,
				},
				indicator: {
					display: 'none',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					minHeight: 40,
					textTransform: 'none',
					'&.Mui-selected': {
						backgroundColor: '#4caf50',
						color: '#fff',
					},
				},
			},
		},
	},
});

export default theme;
