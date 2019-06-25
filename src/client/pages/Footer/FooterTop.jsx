import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { navigate, Location } from '@reach/router'
import useWindowSize from 'context/withWindowSize'
import PropTypes from 'prop-types'
import React from 'react'

import { sections } from './FooterInfo'
import FooterTopSection from './FooterTopSection'

const styles = {
  FooterTop: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '95%',
    margin: '18px auto 30px',
  },
}

function FooterTop({ classes = {}, theme }) {
  const { width } = useWindowSize()
  let filteredSections = sections
  if (theme.breakpoints.values.sm > width) {
    filteredSections = sections.filter(
      ({ title }) => title.toLowerCase() === 'contact us',
    )
  }

  return (
    <Location>
      {({ location }) => {
        const handleNavigation = (nextPage) => () => {
          if (location.pathname !== nextPage) {
            navigate(nextPage)
          }
        }
        return (
          <Grid
            container
            className={classes.FooterTop}
            spacing={32}
            direction='row'
          >
            {filteredSections.map(
              ({
                title,
                description,
                containsAppLink,
                containsOutsideLink,
              }) => (
                <FooterTopSection
                  key={title}
                  title={title}
                  description={description}
                  handleNavigation={
                    containsAppLink ? handleNavigation : () => {}
                  }
                  containsAppLink={containsAppLink}
                  containsOutLink={containsOutsideLink}
                />
              ),
            )}
          </Grid>
        )
      }}
    </Location>
  )
}

FooterTop.propTypes = {
  classes: PropTypes.shape({}),
  theme: PropTypes.shape({}).isRequired,
}

export default withStyles(styles, { withTheme: true })(FooterTop)
