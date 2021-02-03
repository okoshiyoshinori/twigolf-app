import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Grid,Typography} from '@material-ui/core'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
  }
}) 

class Guid extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return (
      <Grid container>
          <Grid item sm={12}>
            <Typography variant="h1" style={{marginBottom:"28px"}}>
              使い方ガイド
            </Typography>
          </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Guid))
