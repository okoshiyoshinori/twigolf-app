import React from 'react'
import {Grid,CircularProgress} from '@material-ui/core'

interface Props {
}
interface State {}

export default class Progress extends React.Component<Props,State> {
  render() {
    return (
      <Grid container alignItems="center" justify="center">
          <CircularProgress/>
      </Grid>
    )
  }
}
