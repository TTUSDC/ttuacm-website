import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@material-ui/core'

const options = {
  filterType: 'multiselect',
}

export class TableView extends Component {
  render() {
    return (
      <div>
        <Typography
          variant='h2'
          style={{
            color: 'black',
            textEmphasis: 'true',
            textAlign: 'center',
            padding: 40,
          }}
        >
          {this.props.tableType}
        </Typography>

        <MUIDataTable
          data={this.props.rows}
          columns={this.props.columns}
          options={options}
        />
      </div>
    )
  }
}

TableView.propTypes = {
  tableType: PropTypes.isRequired,
  rows: PropTypes.isRequired,
  columns: PropTypes.isRequired,
}

export default TableView
