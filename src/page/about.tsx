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
    marginBttom:5,
    whiteSpace:"pre-wrap"
  },
  button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight:700
  },
  myul: {
      lineHeight:"1.4rem",
      marginTop:5,
      marginBottom:5,
      paddingLeft:25,
  },
  con: {
      lineHeight:"1.4rem",
      marginTop:2,
      marginBottom:2
    }
}) 

class About extends React.Component<Props,State> {
  render() {
    const {classes} = this.props
    return (
      <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className="quid">
              <Helmet>
                <title>About</title>
              </Helmet>
            </div>
            <Typography variant="h1" style={{marginBottom:"10px"}} id="a">
              About 
            </Typography>
            <Paper variant="outlined" className={classes.paper}>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}} id="a1">
               twigolfについて 
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={3}>
                <Typography variant="body2" component="p" className={classes.contents}>
                 ツイッター利用者の方が、かんたんにゴルフのイベントの告知管理を行えるサービスです。
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}} id="a2">
                運営者について
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={3}>
                <Typography variant="body2" component="p" className={classes.contents}>
                  DevYochi 個人で運営しております。<br/>
                  <a href="https://twitter.com/DevYochi" target="blank" style={{color:colors.grey[700]}}>
                    <TwitterIcon/>
                  </a>
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}} id="a3">
                twitter連携について
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
                 twigolfが勝手にツイート、フォロー、ダイレクトメッセージ送信等を利用者に許可なく実施することはありません
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}} id="a4">
                利用規約
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="span" className={classes.contents}>
この利用規約は、「twigolf」（以下、当サービス）における利用条件を定めるものです。当サービスの利用者は、本規約に同意するものといたします。<br/>
<ol className={classes.myul}>
<li>利用者によって当サービスに投稿されたイベント情報を掲載すること及びその他の方法で利用できるものとし、利用者はこれを無償にて承諾するものとします</li>
<li>当サービスは投稿された情報を予告なく閲覧し改変または削除できるものとし、いつでも当サービス内容を変更、停止できるものとします。</li>
<li>当サービスを利用することにより生じたいかなる損害についても責任を負わないものとします。</li>
<li>利用者は当サービスの利用にあたって、下記のいずれかに該当または類似する行為を行わないものといたします。</li>
</ol>
<ul style={{lineHeight:"1.0rem",marginTop:0}}>
　<li>誹謗中傷行為、名誉毀損行為、侮辱行為、業務妨害行為、詐欺行為</li>
　<li>違法行為、犯罪行為、犯罪を助長する行為、犯罪予告</li>
　<li>人種、民族、信条等を根拠にする差別行為</li>
　<li>公序良俗に反する行為</li>
　<li>プライバシーを侵害する行為、個人情報を無断で公開する行為</li>
　<li>他者になりすます行為、嫌がらせ行為、迷惑行為</li>
　<li>知的財産権、肖像権等、他者の権利を侵害する行為</li>
　<li>商用を目的とした宣伝・広告・勧誘その他の行為</li>
　<li>不正アクセス行為、過度な連続投稿や連続アクセス行為</li>
　<li>その他、当サイトが不適切と判断する行為</li>
</ul>
本規約は、予告なしに変更されることがあります。<br/><br/>
2021年5月21日制定
                </Typography>
              </Box>
              <Typography variant="h4" style={{marginBottom:"5px",fontWeight:600}} id="a5">
              プライバシーポリシー
              </Typography>
              <Box bgcolor={colors.grey[100]} p={1} marginBottom={2}>
                <Typography variant="body2" component="p" className={classes.contents}>
<ol className={classes.myul}>
<li>個人情報の利用について</li>
<p className={classes.con}>当サイトは、個人情報を当サービスの運営に必要な範囲内で利用致します。</p>
<li>個人情報の取得について</li>
<p className={classes.con}>当サイトは、偽りその他不正の手段によらず適正に個人情報を取得致します。</p>
<li>個人情報の安全管理について</li>
<p className={classes.con}>当サイトは、取り扱う個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。</p>
<li>個人情報の第三者提供について</li>
<p className={classes.con}>当サイトはは、個人情報保護法等の法令に定めのある場合を除き、個人情報をあらかじめご本人の同意を得ることなく、第三者に提供致しません。</p>
<li>本方針の変更</li>
<p className={classes.con}>本方針の内容は変更されることがあります。</p>
</ol>
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

export default connect(null,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(About)))
