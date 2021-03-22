import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import {CardHeader,CardContent,colors} from '@material-ui/core/'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import TopBar from './components/TopBar'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import SearchIcon from '@material-ui/icons/Search'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import {NavLink,withRouter,RouteComponentProps} from 'react-router-dom'
import {RootState} from './store'

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Hiragino Kaku Gothic ProN',
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
    h1: {
      fontWeight:700,
      fontSize:"1.4rem",
//      color:"#2a2b52"
    },
    h2: {
      fontWeight:700,
      fontSize:"1rem",
 //     color:"#2a2b52"
    },
    h3: {
      fontWeight:600,
      fontSize:"0.9rem",
  //    color:"#2a2b52"
    }
  },
  palette: {
    primary: {
      light:"#6ec6ff",
      main:"#2196f3",
      dark:"#0069c0",
      contrastText:"#000"
    },
    secondary: {
      light: '#aee571',
      main:"#7cb342",
      dark: "#4b830d",
      contrastText:"#000",
    },
    text: {
      primary: "#000",
      secondary:"#fafafa"
    },
    divider: "#dedede",
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
     default: "#edf2f7",
     paper: "#fafafc"
    },
    type: 'light',
  },
  mixins: {
    toolbar: {
      minHeight:60
    }
  },
  direction: 'ltr',
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": { 
          backgroundColor: "white",
          color: "#0069c0",
          '& svg': {
            color:"#0069c0"
          }
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor:"#0069c0"
      }
    },
    MuiTab: {
      root: {
        color:"#000000",
        '&$selected': {
          fontWeight: 700,
          color: "#0069c0"
        }
      }
    },
    MuiRadio: {
      root: {
        color: colors.grey[500],
        '&$checked': {
          color: colors.blue[700]
        }
      }
    }
  }
})
theme = responsiveFontSizes(theme)
type State = {}
interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
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
  toolbar: theme.mixins.toolbar,
  menu: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0 0 0 0",
    borderColor: theme.palette.divider
  },
  menuHeader: {
    color: theme.palette.common.white,
    borderBottom:"1px solid",
    borderBottomColor: theme.palette.divider,
  },
  menuContents: {
    color: theme.palette.common.white,
    paddingLeft: 0,
    paddingRight:0,
    paddingTop:0
  },
  icon: {
    color: theme.palette.common.white,
  },
  itemTxt: {
    fontWeight:"bold"
  }
})

class App extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <CssBaseLine />
          {this.props.children}
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(App))
