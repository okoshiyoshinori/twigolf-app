import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {Button,Checkbox,Grid,Chip,Typography,Card,TextField,Paper} from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {red} from '@material-ui/core/colors'
import Mde from '../components/mde'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}

type keyData = {
  key:number,
  word:string
}
interface State{
  keywords: keyData[] 
  _word: string
}

const styles = (theme:Theme) => createStyles({
      root: {
        width:"100%",
        '& > *': {
          margin: theme.spacing(1),
          width: '100%'
        }
      },
      label :{
        color: "black"
      },
      check: {
        color: theme.palette.grey[400],
        '&$checked': {
          color: theme.palette.primary.main
        }
      },
      keywords: {
       display: 'flex',
       justifyContent: 'left',
       flexWrap: 'wrap',
       listStyle: 'none',
       padding: theme.spacing(0.5),
       margin: 0,
      },
      chip: {
       margin: theme.spacing(0.5),
       color: theme.palette.common.black,
       fontWeight:600,
      }
})

class New extends React.Component<Props,State>{
  constructor(props:Props) {
    super(props)
    this.state = {
      keywords: [], 
      _word: ''
    }
  }
  handleDelete(data:keyData) {
    const result = this.state.keywords.filter((d)=> d.word != data.word)
    this.setState({keywords:result})
  }
  check():boolean {
    return this.state.keywords.some((data) => data.word === this.state._word)
  }
  render(){
    const {classes} = this.props
    const {keywords} = this.state
    return (
     <Grid container spacing={3}> 
      <Grid item xs={12} sm={12}>
        <Typography variant="h1">
          イベントを作成する
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
         <Paper elevation={0} variant="outlined" style={{padding:15}}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            タイトル*
            </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField  fullWidth multiline required id="title"
            variant="outlined"  InputLabelProps={{className:classes.label}}/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            詳細*
           </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Mde/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            キーワード*
            </Typography>
            <ul className={classes.keywords}>
              {
                keywords.map((d:keyData)=> (
                <li >
                  <Chip label={d.word} size="small" onDelete={() => this.handleDelete(d) }  className={classes.chip}/>
                </li>
                ))
              }
            </ul>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="keyword"
              variant="outlined"
              value={this.state._word}
              fullWidth
              onChange={(e)=>this.setState({_word:e.target.value})}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  if (!this.check()) {
                    keywords.push({key:0,word:this.state._word})
                    this.setState({_word:''})
                  }
                }
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            場所(未定の場合は空欄)
            </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField fullWidth multiline id="place"
            variant="outlined"  InputLabelProps={{className:classes.label}}/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            開催日時(未定の場合は空欄)
           </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="Helddate"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{
              shrink: true,
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            締切日時(未定の場合は空欄)
           </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="Deadline"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{
              shrink: true,
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography variant="h2">
            参加定員(未定の場合は空欄)
            </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
           <TextField
              id="capacity"
              type="number"
              fullWidth
              variant="outlined"
              InputLabelProps={{
              shrink: true,
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
             <FormControlLabel
              control={
                <Checkbox
                className={classes.check}
                name="twitter"
                color="primary"
                />
              }
              label="Twitterにも投稿"/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Button disableElevation size="medium" style={{color:"#fff",fontWeight:700}} variant="contained" color="primary">
              登録する 
            </Button>
           </Grid>
         </Grid>
        </Paper>
      </Grid>
     </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(New))
