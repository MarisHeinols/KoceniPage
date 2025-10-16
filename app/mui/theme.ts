import { createTheme } from '@mui/material/styles';

// Create a custom theme
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    nav: true; 
  }
}

const theme = createTheme({
	palette: {
		mode: 'light', // or 'dark'
		primary: {
			main: '#4caf50', // your brand color
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
		    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '50px bottom black',
        },
      },
    },
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: 'none',
				},
				containedPrimary: {
					backgroundColor: '#4caf50',
					padding:'1rem',
					width:'10rem',
					fontSize:'1rem',
					color: '#fff',
					'&:hover': {
						backgroundColor: '#66ed6b',
          			},
        		},
			},
	 variants: [
        {
          props: { variant: 'nav' },
          style: ({ theme }) => ({
            textTransform: 'none',
            fontWeight: 600,
            color: theme.palette.common.black,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              height: '2px',
              width: '100%',
              bottom: 0,
              left: 0,
              backgroundColor: theme.palette.primary.main,
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
            },
            '&:hover::after': {
              transform: 'scaleX(1)',
            },
          }),
        },
      ],
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					height: '3rem',
					width: '100%',
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
