import React from 'react'
import {OverView} from '../store/competition/types'
import {createStyles,Theme,withStyles} from '@material-ui/core/styles/'
import {Card,CardHeader,CardContent,Avatar,Typography} from '@material-ui/core/'
import { red } from '@material-ui/core/colors'

type Props = {
//  data: OverView 
  classes: any
}
type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 0 0",
    borderColor: theme.palette.divider,
  },
  header: {
    color: theme.palette.common.black,
    fontSize:45,
  },
  contents: {
    color: theme.palette.common.black
  },
  avatar: {
    backgroundColor: red[500] 
  }
})

class EventCard extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.root}>
        <CardHeader className={classes.header} avatar={
          <Avatar aria-label="event" className={classes.avatar}>
            R
          </Avatar>
        }
        titleTypographyProps={{variant:'h6' }}
        title="トマコマ＠苫小牧ボードゲーム会 2021.1.24"
        subheader="@nexx"
        />
              <CardContent className={classes.contents}>
        <Typography variant="body2" component="p">
        今日、WordPressウェブサイトの多くでは、イタリック体が全くなく、2種類のフォントウェイトしか使用されません。Google Fontsを自分で埋め込んでいる場合は、Google Fontsの「カスタマイズ」タブで使用するウェイトを選択できます：
        </Typography>
      </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles,{withTheme:true})(EventCard)
