import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MUIDataTable from 'mui-datatables'

const options = {
  filterType: 'multiselect',
}

export class TableView extends Component {
  render() {
    return (
      <div>
        <MUIDataTable
          title={`${this.props.tableType} List`}
          data={this.props.data}
          columns={this.props.columns}
          options={options}
        />
      </div>
    )
  }
}

TableView.propTypes = {
  tableType: PropTypes.isRequired,
  data: PropTypes.isRequired,
  columns: PropTypes.isRequired,
}

export default TableView
