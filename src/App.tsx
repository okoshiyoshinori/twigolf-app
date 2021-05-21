import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine'
import {colors} from '@material-ui/core'
import { createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import {withRouter,RouteComponentProps} from 'react-router-dom'


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
      fontSize:"1.6rem",
    },
    h2: {
      fontSize:"1.4rem",
    },
    h3: {
      fontSize:"1.2rem",
    },
    h4: {
      fontSize:"1.0rem"
    },
    h5: {
      fontSize:"0.8rem"
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
          color: colors.blue[600],
          '& svg': {
            color:colors.blue[600]
          }
        }
      }
    },
    MuiTabs: {
      root:{
        color:colors.blueGrey[500]
       },
      indicator: {
        backgroundColor:colors.grey[800],
        height:3,
      },
    },
    MuiTab: {
      root: {
        '&$selected': {
          fontWeight:500,
          color: colors.grey[800] 
        }
      }
    },
    MuiTableCell: {
      root: {
          borderBottomColor: colors.grey[300]
      }
    },
    MuiRadio: {
      root: {
        color: colors.grey[500],
        '&$checked': {
          color: colors.blue[700]
        }
      }
    },
    MuiCardHeader: {
      root: {
        alignItems:"left"
        },
      avatar:{
        marginRight:10,
      }
    }
  }
})
theme = responsiveFontSizes(theme)
type State = {}
interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
const styles = (them:Theme) => createStyles({
})

class App extends React.Component<Props,State> {
  render() {
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
