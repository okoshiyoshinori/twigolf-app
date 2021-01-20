import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import {createStyles,Theme,withStyles} from '@material-ui/core/styles'

import TopBar from './components/TopBar'

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    button: {
      textTransform: "none"
    },
  },
  palette: {
    primary: {
      light:"#63a4ff",
      main:"#1976d2",
      dark:"#004ba0",
      contrastText:"#fff"
    },
    secondary: {
      light: '#5e92f3',
      main:"#1565c0",
      dark: "#003c8f",
      contrastText:"fff",
    },
    error:{
      main:"#f44336"
    },
    warning: {
      main: "#ff9800"
    },
    info: {
      main: "#2196f3"
    },
    success: {
      main: "#4caf50"
    },
    background: {
      default: "#ffffff"
    },
    type: 'light',
  },
  /*
  shadows: Array(25).fill("none") as Shadows,
     props: {
        MuiTextField: {
            variant: "outlined"
        }
  },
  */
  mixins: {
    toolbar: {
      minHeight: 55,
    }
  },
  direction: 'ltr'
})
theme = responsiveFontSizes(theme)
type State = {}
type Props = {
  classes:any
}

const styles = (them:Theme) => createStyles({
  content: {
    flexGrow:1,
    [theme.breakpoints.up("sm")]: {
      marginLeft:240
    },
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar
})


export class App extends React.Component<Props,State> {
  constructor(props:any) {
    super(props)
  }
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <CssBaseLine />
          <TopBar/>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} >
                  <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                  facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                    <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                  facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                  </Typography>
              </Grid>
            </Grid>
          </main>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles,{withTheme:true})(App)
