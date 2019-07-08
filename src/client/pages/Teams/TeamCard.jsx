import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import EmailIcon from '@material-ui/icons/Email'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import axios from 'axios'
import classnames from 'classnames'
import { getEndpoint } from 'client/services/useEndpoint'
import useSnackbar from 'client/services/useSnackbar'
import { withFirebase } from 'client/services/withFirebase'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const styles = (theme) => ({
  Image: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

function TeamCard({
  preventJoin,
  name, // Name of the group
  groupId,
  leader, // Name of the leader
  description,
  image,
  email,
  day,
  time,
  classes,
}) {
  const [open, setOpen] = useState(false)
  const { currentUser } = withFirebase()
  const [SnackBar, enqueueSnackbar] = useSnackbar()

  function handleEmail() {
    document.getElementById('send-email-tag').click()
  }

  async function unsubscribe() {
    try {
      await axios.delete(
        `${getEndpoint()}/sdc/groups/${groupId}/users/${currentUser.uid}`,
      )
      enqueueSnackbar(`Unsubscribed from ${name}`, 'success')
      return
    } catch (err) {
      enqueueSnackbar('Error Occured. Please try again later', 'error')
      console.error(err)
    }
  }

  async function subscribe() {
    try {
      await axios.put(
        `${getEndpoint()}/sdc/groups/${groupId}/users/${currentUser.uid}`,
      )
      enqueueSnackbar(`Subscribed to ${name}`, 'success')
      return
    } catch (err) {
      enqueueSnackbar('Error Occured. Please try again later', 'error')
      console.error(err)
    }
  }

  // Turns the array of days to a comma separated string
  function fmtDays(days) {
    if (days.length < 1) {
      throw Error('days.length must be greater than 0')
    }

    let res = ''
    for (const eachDay of days) {
      res += `${eachDay}, `
    }

    // Gets rid of the trailing space and comma
    return res.slice(0, res.length - 2)
  }

  return (
    <Card>
      <CardMedia image={image} title={name} className={classes.Image} />
      <CardContent>
        <Typography variant='h5' style={{ fontWeight: 'bold' }} gutterBottom>
          {name}
        </Typography>
        <Typography variant='body1'>Led by {leader}</Typography>
        <Typography variant='body1' gutterBottom>
          {fmtDays(day)} @ {time}
        </Typography>
      </CardContent>
      <CardActions disableActionSpacing>
        <IconButton
          aria-label='Add to groups'
          disabled={preventJoin}
          onClick={subscribe}
          data-testid={`sub-${email}`}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label='Remove from groups'
          disabled={preventJoin}
          onClick={unsubscribe}
          data-testid={`unsub-${email}`}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label='Email'
          disabled={preventJoin}
          onClick={handleEmail}
          data-testid={`email-${email}`}
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: open,
          })}
          onClick={() => setOpen(!open)}
          data-testid={`expand-${email}`}
        >
          <ExpandMoreIcon />
        </IconButton>
        <a
          id='send-email-tag'
          target='_blank'
          rel='noopener noreferrer'
          hidden
          href={`mailto:${email}?Subject=${encodeURIComponent(
            `Hi! I'm interested in ${name}`,
          )}`}
        >
          Send Mail
        </a>
      </CardActions>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {preventJoin ? (
          <CardContent>
            <Typography
              variant='h6'
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              data-testid={`sign-up-notif-${email}`}
            >
              Please login to sign up for classes
            </Typography>
          </CardContent>
        ) : null}
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
      <SnackBar />
    </Card>
  )
}
TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  leader: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  day: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  preventJoin: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
}

TeamCard.defaultProps = {
  classes: {},
}

export default withStyles(styles)(TeamCard)
