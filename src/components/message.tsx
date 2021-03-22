import React from 'react'
import {Grid,Typography} from '@material-ui/core'

interface Props {
  mes:string
}
interface State {}

export default class Message extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return (
      <Grid container style={{padding:40}} alignItems="center" justify="center">
        <Typography  variant="h2" style={{color:"#808080"}}>
        {this.props.mes}
        </Typography>
      </Grid>
    )
  }
}
