import React from 'react'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

interface Props {
}
interface State {}

export default class Mde extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  handleChange(e:string) {
  }
  render() {
    return (
      <SimpleMde onChange={(e)=> this.handleChange(e)}/>
    )
  }
}
