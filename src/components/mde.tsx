import React from 'react'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

interface Props {
  handlerProps: (s:string) => void
  data:string
}
interface State {}

export default class Mde extends React.Component<Props,State> {
  handleChange(e:string) {
    this.props.handlerProps(e)
  }
  render() {
    return (
      <SimpleMde value={this.props.data} onChange={(e)=> this.handleChange(e)}/>
    )
  }
}
