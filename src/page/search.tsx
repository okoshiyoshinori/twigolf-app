import React from 'react'
import {Typography} from '@material-ui/core'

type Props = {}
type State = {}

class Search extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return (
    <Typography variant="h1" style={{marginBottom:"20px"}}>
        検索
      </Typography>
    )
  }
}

export default Search
