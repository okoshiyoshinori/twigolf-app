import React from 'react'
import {Grid,Paper,Typography} from '@material-ui/core'

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
       <Grid sm={12} md={12} item style={{width:"100%"}}>
          <Paper elevation={0}  style={{alignItems:"center",padding:"30px 0 30px 0",border:"1px solid #dfdfdf"}}>
            <Typography  variant="h2" align="center" style={{color:"#808080"}}>
             {this.props.mes}
            </Typography>
          </Paper>
       </Grid>
    )
  }
}