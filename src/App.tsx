import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import {createStyles,Theme,withStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import TopBar from './components/TopBar'

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Meiryo',
      'ヒラギノ角ゴ Pro W9',
      'Hiragino Kaku Gothic Pro',
      'Osaka',
      'Meiryo',
      'メイリオ',
      'MS PGothic',
      'sans-serif'
    ].join(','),
    button: {
      textTransform: "none"
    },
  },
  palette: {
    primary: {
      light:"#2e3f5f",
      main:"#001935",
      dark:"#000010",
      contrastText:"#fff"
    },
    secondary: {
      light: '#5e98da',
      main:"#226aa8",
      dark: "#004079",
      contrastText:"fff",
    },
    text: {
      primary: "#fff"
    },
    divider: "#2b3b56",
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
     default: "#001935"
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
      minHeight: 50
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
  main: {
    [theme.breakpoints.up("sm")]: {
      borderRightColor: theme.palette.divider,
      borderRightWidth: "1px",
      borderRightStyle: "solid",
      minHeight: "100vh",
      paddingRight:theme.spacing(3)
    },
    paddingTop:theme.spacing(5),
  },
  right: {
    paddingTop:theme.spacing(5),
    paddingLeft:theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
})


class App extends React.Component<Props,State> {
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
          <Container maxWidth={"md"} style={{minHeight: '100vh'}}>
            <div className={classes.toolbar}/>
            <Grid container>
              <Grid item xs={12} sm={8} className={classes.main}  >
                {this.props.children}
              </Grid>
              <Grid item xs={12} sm={4} className={classes.right}>
                    <Typography paragraph >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                  facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                  </Typography>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles,{withTheme:true})(App)
