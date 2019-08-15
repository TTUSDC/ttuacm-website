import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MUIDataTable from 'mui-datatables'
import { Grid, Typography } from '@material-ui/core'

const options = {
  filterType: 'multiselect',
}

export class TableView extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={12}>
          <Grid item xs={4} />
          <Grid item xs={4} style={{ padding: 50 }}>
            <Typography
              variant='h2'
              style={{ color: 'black', textEmphasis: 'true' }}
            >
              {this.props.tableType}
            </Typography>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        <MUIDataTable
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
