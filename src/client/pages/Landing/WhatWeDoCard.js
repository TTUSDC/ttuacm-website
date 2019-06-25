import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './WhatWeDoCard.styles'

function WhatWeDoCard({ content, align, image, classes }) {
  return (
    <Card className={classes.Card}>
      <Grid
        className={classes.Container}
        container
        spacing={16}
        direction={align !== 'left' ? 'row-reverse' : null}
        style={{
          justifyContent: align === 'left' ? 'start' : 'space-between',
        }}
      >
        <Grid className={classes.ImageGrid} item sm={3} xs={4}>
          <img alt='sadness' className={classes.Image} src={image} />
        </Grid>
        <Grid
          className={classes.Item}
          item
          xs={8}
          style={{ padding: '0px 30px' }}
        >
          <div className={classes.Title}>{content.title} </div>
          <div className={classes.Text}>{content.text} </div>
          <div
            tabIndex={0}
            onKeyUp={() => ({})}
            role='button'
            onClick={() => navigate(content.link)}
            className={classes.Tag}
          >
            {content.linkTag}{' '}
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

WhatWeDoCard.propTypes = {
  content: PropTypes.shape({}),
  align: PropTypes.string,
  image: PropTypes.string,
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(WhatWeDoCard)
