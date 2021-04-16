import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSeconds: 0,
      intervalId: null
    }
  }

  componentDidMount() {
    this.setState({ totalSeconds: this.props.time }, this.startCountdown())
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  startCountdown = () => {
    const interval = setInterval(() => {
      if (this.state.totalSeconds <= 0) {
        this.props.onCountdownComplete()
        clearInterval(this.state.intervalId)
        return
      }
      this.setState({ totalSeconds: this.state.totalSeconds - 1 })
    }, 1000) 
    this.setState({ intervalId: interval })
  }

  ms = () => {
    const minutes = this.timeFormat(Math.floor(this.state.totalSeconds / 60))
    const seconds = this.timeFormat(Math.floor(this.state.totalSeconds % 60))
    return { minutes, seconds }
  }

  timeFormat = number => ('0' + number).slice(-2)

  render() {
    const { minutes, seconds } = this.ms()
    return (
      <div>
        {minutes} : {seconds}
      </div>
    )
  }
}

export default Countdown


Countdown.propTypes = {
  time: PropTypes.number.isRequired,
  onCountdownComplete: PropTypes.func.isRequired
}