import React from 'react'
import {FormControl,TextField,FormLabel,FormControlLabel,Radio,RadioGroup,InputLabel,Typography,Grid,Paper,Select,MenuItem} from '@material-ui/core'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'


interface Props extends RouteComponentProps,WithStyles<typeof styles>{}

type State = {
  day:string
  date:string
}

const styles = (theme:Theme)=> createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formLabel: {
      color: theme.palette.grey[900],
      fontSize: 15,
      '&.Mui-focused': {
        color:theme.palette.primary.main
      }
    }
})

class Search extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      day:"0",
      date:"" 
    }
  }
  render() {
    const {classes} = this.props
    return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1">
          検索
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper elevation={0} variant="outlined" style={{padding:15}}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.formLabel}>日付</FormLabel>
                  <RadioGroup row  value={this.state.day} onChange={(e)=>this.setState({day:(e.target as HTMLInputElement).value})}>
                    <FormControlLabel 
                      control={<Radio color="default"/>}
                      value="0"
                      labelPlacement="end"
                      label="指定"
                     />
                     <FormControlLabel 
                      control={<Radio color="default"/>}
                      labelPlacement="end"
                      value="1"
                      label="未定"
                     />
                  </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
               id="date"
               label="開催日"
               type="date"
               defaultValue="2021-02-26"
               onChange={(e)=>this.setState({date:e.target.value})}
               InputLabelProps={{
               shrink: true,
               className: classes.formLabel
               }}
             />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Search))  
