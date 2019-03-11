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
  },
};

const PageHeader = ({
  classes = {}, title, info, color,
}) => (
  <div style={{ backgroundColor: color }} className={classes.PageHeader}>
    <div><Typography variant='h2' className={classes.title}>{title}</Typography></div>
    <div><Typography variant='h4' className={classes.info}>{info}</Typography></div>
  </div>
)

PageHeader.propTypes = {
  color: PropTypes.string,
  classes: PropTypes.shape({}),
  title: PropTypes.string,
  info: PropTypes.string,
};

PageHeader.defaultProps = {
  color: '#253F51',
}

export default withStyles(styles)(PageHeader);
