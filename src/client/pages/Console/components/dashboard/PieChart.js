import 'react-circular-progressbar/dist/styles.css'
import React, { Component } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import PropTypes from 'prop-types'
import ProgressProvider from './AdaptiveAnimation'

export class PieChart extends Component {
  render() {
    return (
      <ProgressProvider valueStart={0} valueEnd={this.props.percentage}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${(value / 100) * this.props.totalMembers}`}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: 'round',
              textSize: '16px',
              pathTransitionDuration: 1.5,
              pathColor: 'red',
              textColor: 'black',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        )}
      </ProgressProvider>
    )
  }
}

PieChart.propTypes = {
  percentage: PropTypes,
  totalMembers: PropTypes,
}

export default PieChart
