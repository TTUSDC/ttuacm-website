import React, { Component } from 'react'
import axios from 'axios'
import SideNavBar from '../components/layout/SideNavBar'
import Table from '../components/layout/TableView'

const bodyStyle = {
  backgroundColor: 'white',
}

export class ConsoleMembers extends Component {
  state = {
    hasError: false,
    columns: ['Name', 'Email', 'Paying Member', 'Active', 'Committees'],
    rows: [],
  }

  componentWillMount() {
    this.fetchData()
  }

  // filterData(response) {
  //   response.forEach((object) => {
  //     this.setState({ rows: this.state.rows
  //       .push([object.name, object.email, object.isPaying, object.isOfficer, object.committees]),
  //     })
  //   })
  // }

  fetchData() {
    axios
      .get(
        'https://us-central1-acm-texas-tech-web-app-2-dev.cloudfunctions.net/api/members',
      )
      .then((response) => {
        if (response.status === 200 && response != null) {
          console.log(response.data)
          this.setState({ rows: response.data })
        } else {
          throw new Error('Empty data')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div style={bodyStyle}>
        <SideNavBar>
          <Table
            tableType='Members'
            columns={this.state.columns}
            error={this.state.hasError}
            rows={this.state.rows.map((object) => [
              object.name,
              object.email,
              object.isPaying,
              object.isActive,
              object.committees,
            ])}
          />
        </SideNavBar>
      </div>
    )
  }
}

export default ConsoleMembers
