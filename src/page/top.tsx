import React from 'react'
import {List,ListItem} from '@material-ui/core'
import EventCard from '../components/EventCard'
import {Typography,Divider} from '@material-ui/core'


type Props = {}
type State = {}

export default class Top extends React.Component<Props,State> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
      <div>
      <Typography variant='h5'>
        新着イベント
      </Typography>
      <Divider />
      <List>
        {[1,2,3,4,5].map((i) => (
          <ListItem key={i} style={{paddingLeft:0,paddingRight:0}}>
            <EventCard />
          </ListItem>
        ))}
      </List>
      </div>
    )
  }
}
