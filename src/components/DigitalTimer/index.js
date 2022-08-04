// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  timeElapsedInMinutes: 25,
  timerInSeconds: 0,
  timerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  OnDecreaseTime = () => {
    const {timeElapsedInMinutes} = this.state
    if (timeElapsedInMinutes > 1) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({
      timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeElapsedInMinutes, timerInSeconds} = this.state
    const isDisabled = timerInSeconds > 0

    return (
      <div>
        <p className="set-timer-limit ">Set Timer Limit</p>
        <div className="time-set-container">
          <button
            type="button"
            className="time-controller-icon"
            onClick={this.OnDecreaseTime}
            disabled={isDisabled}
          >
            -
          </button>
          <p className="timer-limit-value">{timeElapsedInMinutes}</p>
          <button
            type="button"
            className="time-controller-icon"
            onClick={this.onIncreaseTime}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  OnReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerInSeconds, timeElapsedInMinutes} = this.state

    const isTimerCompleted = timerInSeconds === timeElapsedInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({timerRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onClickStartOrPauseButton = () => {
    const {timerInSeconds, timeElapsedInMinutes, timerRunning} = this.state

    const isTimerCompleted = timerInSeconds === timeElapsedInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }

    if (timerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      timerRunning: !prevState.timerRunning,
    }))
  }

  renderTimerController = () => {
    const {timerRunning} = this.state
    const startOrPauseUrl = timerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseName = timerRunning ? 'Pause' : 'Start'
    const startOrPauseAltText = timerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="start-reset-container">
        <div className="start-container ">
          <button
            type="button"
            className="start-reset-button"
            onClick={this.onClickStartOrPauseButton}
          >
            <img
              src={startOrPauseUrl}
              alt={startOrPauseAltText}
              className="image"
            />
            <div>
              <h1 className="start-reset-heading">{startOrPauseName}</h1>
            </div>
          </button>
        </div>
        <div className="start-container ">
          <button type="button" className="start-reset-button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="image"
              onClick={this.OnReset}
            />
          </button>
          <h1 className="start-reset-heading">Reset</h1>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInMinutes, timerInSeconds} = this.state
    const totalRemainingSeconds = timeElapsedInMinutes * 60 - timerInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerRunning} = this.state
    const labelText = timerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-container">
          <div className="timer-container">
            <div className="time-status-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="time-status">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
