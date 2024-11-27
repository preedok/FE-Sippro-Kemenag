import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Bookman',
            'Poppins',
            'Roboto',
            'Inter',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

export default theme;
