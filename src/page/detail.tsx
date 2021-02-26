import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles,} from '@material-ui/styles'
import {Divider,Avatar,List,ListItem,ListItemAvatar,ListItemText,Theme,Grid,Typography,Paper} from '@material-ui/core'
import marked from 'marked'
import {Detail} from '../store/competition/types'
import CommentIcon from '@material-ui/icons/Comment'
import KeyWords from '../components/keyWord'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
type State = {
  detail:Detail
}

const styles = (theme:Theme) => createStyles({
  day: {
    color:theme.palette.primary.dark
  },
  mde: {
    '& img': {
      width:"100%",
      height:"100%",
      objectFit: 'fill'
    }
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  paper: {
    minHeight: "100px",
    padding: "15px",
    borderRadius: "10px"
  },
  wrapIcon: {
    verticalAlign: 'bottom',
    display: 'inline-flex'
   }
}) 

class CompeDetail extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes} = this.props
    const contents:string = ` ## 初心者歓迎カタンカフェカタン会 

毎週火曜夜にオープン！

ですが…今回は緊急事態宣言中で夜の営業ができないので昼間だけオープン！

日本で唯一のカタンカフェでカタンやりましょう！

カタン好きな方、やってみたい方お待ちしております♪

カタンやったことない方の参加大歓迎！
もちろん経験者も大歓迎！
お友達誘うのもシェアも大歓迎です(^-^)
ゆる～くまったり楽しくやりましょう♪ 

![golf](https://www.uniqlo.com/jp/ja/contents/ambassador/golf/common/images/200814-20SS_ambassador_golf_pc_kv.jpg)` 
const keyWord = ['初心者歓迎','誰でも参加OK','女性歓迎','クズ歓迎']
    return (
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h1" className={classes.day}> 
                2015年10月12日(月) 10:00
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h1" > 
                  第8回盛岡人狼マーダーミステリー会
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h2"> 
                場所: どっかの場所
                </Typography>
                <KeyWords keyWords={keyWord}/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <List>
                  <ListItem style={{padding:0}}>
                   <ListItemAvatar style={{minWidth:40}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="h3">nanahara</Typography>}
                  secondary={<Typography variant="caption">@kasu</Typography>}/>
                  </ListItem>
                </List>
                <Divider/>
                  <div className={classes.mde} dangerouslySetInnerHTML={{__html:marked(contents)}}/>
              </Grid>
            </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                  <Typography variant="caption" style={{fontWeight:700}}>
                  参加者(3人／定員10人)
                  </Typography>
                  <Divider/>
                  <List  style={{padding:"5px"}}>
                  { [1,2,3].map((key) => (
                  <ListItem style={{padding:0}} key={key}>
                   <ListItemAvatar style={{padding:0,minWidth:40}}> 
                    <Avatar  src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="h3">nanahara</Typography>}/>
                  </ListItem>
                  ))}
                </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                  <Typography variant="caption" style={{fontWeight:700}}>
                  興味あり(0人)
                  </Typography>
                  <Divider/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                <Typography variant="caption" style={{fontWeight:700}}>
                  不参加(0人) 
                  </Typography>
                  <Divider/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper variant="outlined" className={classes.paper}>
            <Typography  variant="h2" className={classes.wrapIcon}>
             <CommentIcon/>コメント
            </Typography>
            <List>
              { [1,2,3].map((key) => (
                  <ListItem key={key} divider style={{padding:0}} alignItems="flex-start">
                   <ListItemAvatar style={{minWidth:40,verticalAlign:"top"}} > 
                    <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="body2">初めてですが興味あります。参加させていただきたいです！</Typography>}
                  secondary={<Typography variant="caption">nanahara 3日前</Typography>}/>
                  </ListItem>
              ))}
            </List>
            </Paper>
          </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(CompeDetail))
