import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {Chip,colors} from '@material-ui/core/'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps{
  keyWords:string[]
}

class KeyWords extends React.Component<Props,{}> {
  render() {
    const {keyWords} = this.props
    return (
      <div>
        {
          keyWords.map((s:string)=> ( 
            <Chip size="small" label={s} />
          )) 
        }
      </div>
    )
  }
}

export default withRouter(KeyWords)
