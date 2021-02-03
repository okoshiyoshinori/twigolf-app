import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import {CardHeader,CardContent} from '@material-ui/core/'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import {createStyles,Theme,withStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import TopBar from './components/TopBar'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import SearchIcon from '@material-ui/icons/Search'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import {NavLink} from 'react-router-dom'

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
      fontSize:"1.25rem",
    },
    h2: {
      fontWeight:700,
      fontSize:"1rem"
    }
  },
  palette: {
    primary: {
      light:"#182f4d",
      main:"#142840",
      dark:"#000010",
      contrastText:"#fff"
    },
    secondary: {
      light: '#0d47a1',
      main:"#23b8fb",
      dark: "#004079",
      contrastText:"#fff",
    },
    text: {
      primary: "#fff",
      secondary:"#fff"
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
     default: "#142840"
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
          <TopBar/>
          <Container maxWidth={"md"} style={{minHeight: '100vh'}}>
            <div className={classes.toolbar}/>
            <Grid container>
              <Grid item xs={12} sm={8} className={classes.main}  >
                {this.props.children}
              </Grid>
              <Grid item xs={12} sm={4} className={classes.right}>
                <Card className={classes.menu}>
                  <CardHeader className={classes.menuHeader}
                  titleTypographyProps={{variant:'h1'}}
                  title="メニュー" >
                  </CardHeader>
                  <CardContent className={classes.menuContents}>
                    <List>
                      <NavLink to="/" style={{textDecoration: 'none', color: 'unset'}}>
                      <ListItem button key={"a"} >
                        <ListItemIcon><AccountBoxIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary={<Typography style={{fontWeight:'bold'}}>マイページ</Typography>} />
                      </ListItem>
                      </NavLink>
                      <NavLink to="/all" style={{textDecoration: 'none', color: 'unset'}}>
                      <ListItem button key={"b"}>
                        <ListItemIcon><EmojiPeopleIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary={<Typography style={{fontWeight:'bold'}}>みんなのイベント</Typography>} />
                      </ListItem>
                      </NavLink>
                      <NavLink to="/search" style={{textDecoration: 'none', color: 'unset'}}>
                      <ListItem button key={"c"}>
                        <ListItemIcon><SearchIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary={<Typography style={{fontWeight:'bold'}}>検索</Typography>} />
                      </ListItem>
                      </NavLink>
                      <ListItem button key={"d"}>
                        <ListItemIcon><DataUsageIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary={<Typography style={{fontWeight:'bold'}}>使い方</Typography>} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles,{withTheme:true})(App)
