import React from 'react'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
  },
}

const Links = ({ classes }) => (
  <React.Fragment>
    <BookmarkIcon className={classes.root} />
    <BookmarkIcon className={classes.root} />
    <BookmarkIcon className={classes.root} />
  </React.Fragment>
)

export default withStyles(styles)(Links)
