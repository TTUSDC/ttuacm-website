import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import 'typeface-roboto';
import { Typography } from '@material-ui/core';

const styles = {
  PageHeader: {
    display: 'flex',
    color: 'white',
    width: '100%',
    minHeight: '980px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#253F51',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  info: {
    display: 'flex',
    width: '61%', // '65.5%',
    margin: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
};

const PageHeader = ({
  classes = {}, title, info, // color,
}) => (
  <div className={classes.PageHeader}>
    <div><Typography variant='h2' className={classes.title}>{title}</Typography></div>
    <div><Typography variant='h4' className={classes.info}>{info}</Typography></div>
  </div>
)

PageHeader.propTypes = {
//   color: PropTypes.string,
  classes: PropTypes.shape({}),
  title: PropTypes.string,
  info: PropTypes.string,
};

export default withStyles(styles)(PageHeader);
