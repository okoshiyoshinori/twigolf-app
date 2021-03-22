import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Divider} from '@material-ui/core'
import {Container,Grid,Tabs,Tab,Card,Button,Typography} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EventList from '../components/eventlist'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}

type State = {
  tabindex:number
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "20px" 
    }
  },
  button: {
    color: theme.palette.common.white,
    fontWeight:700
  }
})

class Event extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      tabindex:0
    }
  }
  handeleChange(e:React.ChangeEvent<{}>,val:number) {
    this.setState({tabindex:val})
  }
  handleNew() {
    this.props.history.push("/creation")
  }
  render() {
    const {classes} = this.props
    const {tabindex} = this.state
    return (
    <Grid container spacing={2}  >
    <Grid item xs={12} sm={12}>
        <Typography variant="h1">
           イベント管理 
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button size="medium" onClick={()=> this.handleNew()} startIcon={<AddCircleOutlineIcon/>} variant="contained"  color="primary" className={classes.button}>
         イベント作成
        </Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grid container>
        { /*
          [1,2,3,4].map((i) => ( 
            <EventList key={i} editable={true}/>
          ))
          */
        }
        </Grid>
      </Grid>
    </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Event))
