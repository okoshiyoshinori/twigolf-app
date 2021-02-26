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

class Config extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return (
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h1">
              設定
            </Typography>
          </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Config))
