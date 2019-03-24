import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getStyles from './WhatWeDoCard.styles'

function WhatWeDoCard({ content, align, image, navigateTo }) {
  const theme = useTheme()
  const { width } = useWindowSize()
  const style = getStyles(theme, width, align)

  return (
    <Card style={style.Card}>
      <Grid
        style={style.Container}
        container
        spacing={16}
        direction={align !== 'left' ? 'row-reverse' : null}
      >
        <Grid style={style.ImageGrid} item sm={3} xs={4}>
          <img alt='sadness' style={style.Image} src={image} />
        </Grid>
        <Grid style={style.Item} item xs={8}>
          <div style={style.Title}>{content.title} </div>
          <div style={style.Text}>{content.text} </div>
          <div onClick={() => navigateTo(content.link)} style={style.Tag}>
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
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(WhatWeDoCard)
