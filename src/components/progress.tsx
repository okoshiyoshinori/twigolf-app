import React from 'react'
import {Grid,CircularProgress} from '@material-ui/core'

interface Props {
}
interface State {}

export default class Progress extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return (
      <Grid container style={{marginTop:"10px"}} alignItems="center" justify="center">
          <CircularProgress/>
      </Grid>
    )
  }
}
