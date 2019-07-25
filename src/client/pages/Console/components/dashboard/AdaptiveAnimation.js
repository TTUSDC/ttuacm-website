import React from 'react'
import PropTypes from 'prop-types'

class AdaptiveAnimation extends React.Component {
  static defaultProps = {
    interval: 1000,
  }

  state = {
    valuesIndex: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      })
    }, this.props.interval)
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex])
  }
}

AdaptiveAnimation.propTypes = {
  values: PropTypes,
  children: PropTypes,
  interval: PropTypes,
}
export default AdaptiveAnimation
