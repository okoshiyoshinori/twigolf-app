import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {Chip} from '@material-ui/core/'
import { red } from '@material-ui/core/colors'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  keyWords:string[]
}

type State = {}

const styles = (theme:Theme) => createStyles({
      root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(0.5),
        color: theme.palette.common.white,
        backgroundColor: red[500],
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
