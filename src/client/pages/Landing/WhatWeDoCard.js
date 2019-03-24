import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const getStyles = (theme, width, align) => {
  let titleSize = theme.typography.h4
  let textSize = theme.typography.body1
  let imageSize = 100

  console.log(theme.typography)
  if (width > theme.breakpoints.values.sm) {
    titleSize = theme.typography.h2
    textSize = theme.typography.h6
    imageSize = 150
  }

  if (width > theme.breakpoints.values.md) {
    imageSize = 300
  }

  const curr = {
    Image: {
      width: imageSize,
      height: imageSize,
    },
    ImageGrid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E9EBED',
    },
    Card: {
      display: 'flex',
      flexDirection: 'row',
      flexFlow: 'row',
      alignItems: 'stretch',
      width: '86vw',
      height: '37vh',
      margin: '0 auto 2em',
      padding: 10,
      backgroundColor: 'white',
    },
    Title: {
      ...titleSize,
      color: '#D63333',
    },
    Text: {
      ...textSize,
      color: '#333333',
      margin: '10px 0px',
    },
    Item: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      textAlign: 'right',
      padding: 25,
    },
    Tag: {
      ...textSize,
      color: '#D63333',
      textTransform: 'uppercase',
    },
    Container: {
      justifyContent: 'space-between',
    },
  }

  if (align !== 'left') {
    delete curr.Item.alignItems
    delete curr.Item.textAlign
  }

  return curr
}

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
