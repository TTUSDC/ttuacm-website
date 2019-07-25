import 'react-circular-progressbar/dist/styles.css'
import React, { Component } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import PropTypes from 'prop-types'
import ChangingProgressProvider from './AdaptiveAnimation'

export class PieChart extends Component {
  render() {
    return (
      <ChangingProgressProvider values={[0, this.props.percentage]}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage * 300}`}
            styles={buildStyles({
              pathTransitionDuration: 0.15,
            })}
          />
        )}
      </ChangingProgressProvider>
    )
  }
}

PieChart.propTypes = {
  percentage: PropTypes,
}

export default PieChart
