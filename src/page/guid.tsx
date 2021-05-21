import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Button,Box,colors,Theme,Grid,Typography,Paper} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import TwitterIcon from '@material-ui/icons/Twitter'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {TwitterLogin} from '../store/app/api'
import MoreVertIcon from '@material-ui/icons/MoreVert'
const {TwitterDMButton} = require("react-twitter-embed")

interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"20px",
    borderRadius: "10px"
  },
  contents :{
    lineHeight:"1.4rem",
    marginBttom:5
  },
  button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight:700
  }
}) 

class Guid extends React.Component<Props,State> {
  render() {
    const {classes} = this.props
    return (
      <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className="quid">
              <Helmet>
                <title>使い方ガイド</title>
              </Helmet>
            </div>
            <Typography variant="h1" style={{marginBottom:"10px"}}>
              使い方ガイド
            </Typography>
            <Paper variant="outlined" className={classes.paper}>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
               twigolfについて 
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={3}>
                <Typography variant="body2" component="p" className={classes.contents}>
                 ツイッター利用者の方が、かんたんにゴルフのイベントの告知管理を行えるサービスです。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                まずはツイッターアカウントでログインしよう
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={3}>
                <Typography variant="body2" component="p" className={classes.contents}>
                ツイッターアカウントをお持ちの方は下記、ボタンよりログインできます。<br/>
                ログイン後、基本情報(氏名、性別、生年月日)を登録してください。
                登録して頂くと参加イベント主催者が、ゴルフ場予約や当日の資料作成などに情報を利用する事ができます。
                なお基本情報は登録者本人と参加イベント主催者のみ閲覧可能になります。
                <br/>
                 <span style={{color:colors.red[700]}}>
                  ※当サイトがユーザーの許可なくツートやフォロー、DM送信をすることはありません。
                 </span>
                </Typography>
                <Typography component="p" align="center" >
                <Button size="large" className={classes.button} variant="contained" disableElevation 
                  color="primary" startIcon={<TwitterIcon/>}
                  onClick={() => this.props.login()}>
                ログイン
                </Button>
              </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                イベントを告知しよう
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                  コンペを企画したい、ゴルフを始めたいけど誰かと練習場に行きたい、
                  近所のゴルフ仲間を募集したいなど、はっきりした予定がなくてもとりあえず投稿してみましょう。<br/>
                  ※ログイン後、「マイページ」のユーザーアイコン右の<MoreVertIcon style={{fontSize:14}}/>より「イベント作成」を選択してください。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                イベントに参加しよう
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                 気になったイベントを見つけたら、イベントページから「参加する」ボタンを押してイベントに参加してみよう。
                 まだ、参加するかどうか迷っている場合は「興味あり」ボタンを押してブックマークしよう。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                参加者にまとめて連絡
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                  急な予定変更や、連絡事項などをツイッターのダイレクトメッセージを利用して、参加者に一括送信できます。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                ペアリング表を作成しよう
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                かんたんな操作で、ペアリング表を作成することができます。作ったペアリング表は公開して参加者に通知することができます。
                また、ペアリング表はエクセルファイルでダウンロードできます。ゴルフ場への提出や、当日の参加者への配布資料
                として活用する事ができます。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}}>
                質問・要望
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                本サービスに対する質問・要望に関しましては下記リンクよりDMをお願いします。
                <TwitterDMButton id={'1394906726931910660'}/>
                </Typography>
              </Box>
            </Paper>
          </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    login() {
      TwitterLogin()(dispatch)
    },
  }
}

type ReduxProps =  ReturnType<typeof mapDispatchToProps>

export default connect(null,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Guid)))
