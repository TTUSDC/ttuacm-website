import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.secondary.dark,
  },
}))(TableCell)

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})

const rows = [
  {
    Name: 'Cooper Dean',
    Paying: 0,
    Committees: 'sdc',
    Officer: 1,
    Active: 0,
    Email: 'Donec.porttitor@lectus.ca',
    eventsAttended: 92,
  },
  {
    Name: 'Jared King',
    Paying: 0,
    Committees: '',
    Officer: 1,
    Active: 1,
    Email: 'semper@eutelluseu.com',
    eventsAttended: 56,
  },
  {
    Name: 'Oren Buckley',
    Paying: 0,
    Committees: ' hackwestx, sdc',
    Officer: 0,
    Active: 1,
    Email: 'odio.a@vehiculaaliquet.co.uk',
    eventsAttended: 15,
  },
  {
    Name: 'Malik Hendricks',
    Paying: 0,
    Committees: 'sdc',
    Officer: 1,
    Active: 0,
    Email: 'convallis.erat.eget@parturientmontes.edu',
    eventsAttended: 10,
  },
  {
    Name: 'Burke Chambers',
    Paying: 1,
    Committees: 'sdc,  hackwestx',
    Officer: 1,
    Active: 0,
    Email: 'ullamcorper@Nunc.net',
    eventsAttended: 79,
  },
  {
    Name: 'Otto Burke',
    Paying: 0,
    Committees: '',
    Officer: 0,
    Active: 0,
    Email: 'adipiscing.Mauris@velpedeblandit.co.uk',
    eventsAttended: 68,
  },
  {
    Name: 'Abraham David',
    Paying: 1,
    Committees: 'sdc',
    Officer: 0,
    Active: 1,
    Email: 'sagittis.felis@tinciduntaliquam.com',
    eventsAttended: 25,
  },
]

function CustomizedTable(props) {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align='right'>Name</CustomTableCell>
            <CustomTableCell align='right'>Paying Member</CustomTableCell>
            <CustomTableCell align='right'>Committees</CustomTableCell>
            <CustomTableCell align='right'>Officer</CustomTableCell>
            <CustomTableCell align='right'>Active</CustomTableCell>
            <CustomTableCell align='right'>Email </CustomTableCell>
            <CustomTableCell align='right'>Events Attended</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell align='right'>{row.Name}</CustomTableCell>
              <CustomTableCell align='right'>{row.Paying}</CustomTableCell>
              <CustomTableCell align='right'>{row.Committees}</CustomTableCell>
              <CustomTableCell align='right'>{row.Officer}</CustomTableCell>
              <CustomTableCell align='right'>{row.Active}</CustomTableCell>
              <CustomTableCell align='right'>{row.Email}</CustomTableCell>
              <CustomTableCell align='right'>
                {row.eventsAttended}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

CustomizedTable.propTypes = {
  classes: PropTypes.isRequired,
}

export default withStyles(styles)(CustomizedTable)
