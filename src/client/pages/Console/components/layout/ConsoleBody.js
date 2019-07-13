import React, { Component } from 'react'
import SideBar from './SideNavBar'

const bodystyle = {
  backgroundColor: 'white',
}
export class ConsoleBody extends Component {
  render() {
    return (
      <div style={bodystyle}>
        <SideBar container={this} />
      </div>
    )
  }
}

export default ConsoleBody
