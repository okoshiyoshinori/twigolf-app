import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {withRouter,RouteComponentProps,Switch} from 'react-router-dom'
import Menu from '../components/menu'
import {Container,Theme,Grid,Hidden} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import All from './all'
import Search from './search'
import Guid from './guid'
import BottomNavi from '../components/bottomNavi'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  root: {
    paddingTop: "50px",
    [theme.breakpoints.up("sm")]: {
      padding: "50px 10px 10px 10px"
    }
  },
  toolbar: theme.mixins.toolbar
})

class Home extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes} = this.props
    return (
    <div>
      <Container  >
        <div className={classes.toolbar}/>
        <Grid container  className={classes.root} >
        <Hidden smDown >
          <Grid sm={3} item style={{paddingRight:"30px"}}>
            <Menu />
          </Grid>
        </Hidden>
          <Grid sm={9}  item>
              <Route  path="/home/all" component={All} />
              <Route  path="/home/search" component={Search} />
              <Route  path="/home/guid" component={Guid} />
          </Grid>
        </Grid>
     </Container>
          <BottomNavi />
     </div>
    )
  }
}
export default withRouter(withStyles(styles,{withTheme:true})(Home))
