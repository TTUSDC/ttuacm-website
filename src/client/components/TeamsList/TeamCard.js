import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import classnames from 'classnames'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EmailIcon from '@material-ui/icons/Email'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withFirebase } from 'context/Firebase'
import { getEndpoint } from 'hooks/useEndpoint'
import useSnackbar from 'hooks/useSnackbar'

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
  leader, // Name of the leader
  description,
  image,
  email,
  day,
  time,
  classes,
}) {
  const [open, setOpen] = useState(false)
  const { firebase } = withFirebase()
  const [SnackBar, enqueueSnackbar] = useSnackbar()

  function handleEmail() {
    document.getElementById('send-email-tag').click()
  }

  async function unsubscribe() {
    if (process.env.NODE_ENV !== 'production') {
      enqueueSnackbar(`Unsubscribed from ${name}`, 'success')
      return
    }
    try {
      await axios.put(`${getEndpoint()}/members/unsubscribe`, {
        email: firebase.getUserEmail(),
        groups: [name],
      })
      enqueueSnackbar(`Unsubscribed from ${name}`, 'success')
      return
    } catch (err) {
      enqueueSnackbar('Error Occured. Please try again later', 'error')
      console.error(err)
    }
  }

  async function subscribe() {
    if (process.env.NODE_ENV !== 'production') {
      enqueueSnackbar(`Subscribed to ${name}`, 'success')
      return
    }
    try {
      await axios.put(`${getEndpoint()}/members/subscribe`, {
        email: firebase.getUserEmail(),
        groups: [name],
      })
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
