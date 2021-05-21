import React from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps {}

class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(Prev:Props) {
    if (this.props.location !== Prev.location) {
        window.scroll(0,0)
      }
  }
  render() {
      return (this.props.children)
  }
}
export default withRouter(ScrollToTop)
