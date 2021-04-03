import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";


const OverridesCss: React.FunctionComponent = ({ children }) => {

    const theme = createMuiTheme({
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    html: {
                        WebkitFontSmoothing: 'auto',
                    },
                },
            },
        },
        typography: {
            h1: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 900,
                fontSize: '32px',
                lineHeight: '44px',
                '@media (max-width:960px)': {
                    fontSize: '26px',
                },
                '@media (max-width:600px)': {
                    fontSize: '18px',
                },
            },
            h2: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 900,
                fontSize: '32px',
                lineHeight: '44px',
            },
            h3: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: '150%',
                letterSpacing: '0.0015em',
            },
            h4: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '0.0015em',
                textTransform: 'uppercase',
            },
            h5: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '24px',
                lineHeight: '150%',
                letterSpacing: 0,
                '@media (max-width:960px)': {
                    fontSize: '14px',
                },
            },
            h6: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '18px',
                lineHeight: '150%',
            },
            button: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '20px',
                lineHeight: '27px',
                textTransform: 'capitalize',
            },
            subtitle1: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0.005em',
            },
            subtitle2: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '14px',
                lineHeight: '142%',
                letterSpacing: '0.005em',
            },
            body1: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'bold',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '32px',
            },
            body2: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '18px',
                lineHeight: '150%',
                letterSpacing: '0.015em',
            },
            caption: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight: '150%',
                letterSpacing: '0.03em',
            },
            overline: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '10px',
                lineHeight: '150%',
                letterSpacing: '0.02em',
                textTransform: 'none',
            },
        },
        palette: {
            primary: {
                main: '#06C668',
            },
            secondary: {
                main: '#000000',
            },
            success: {
                main: '#FFC221',
            },
            error: {
                main: '#F44336',
            },
        },
    });

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StylesProvider>
    );
};

export default OverridesCss;