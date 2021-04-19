import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {Chip} from '@material-ui/core/'
import { red,grey,blue } from '@material-ui/core/colors'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  keyWords:string[]
}

type State = {}

const styles = (theme:Theme) => createStyles({
      root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.3),
        color: theme.palette.common.white,
        padding:5,
        backgroundColor: blue[600],
        fontSize:12,
        fontWeight:600
      }
    }
})

class KeyWords extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes,keyWords} = this.props
    return (
      <div className={classes.root}>
        {
          keyWords.map((s:string)=> ( 
            <Chip size="small" label={s} />
          )) 
        }
      </div>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(KeyWords))
