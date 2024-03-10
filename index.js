const moment = require('moment');

class Timer {
  constructor() {
    this.startTime = null;
    this.endTime = null;
    this.pausedTime = 0;
    this.isRunning = false;
  }

  start(hours, minutes, seconds) {
    if (this.isRunning) {
      console.error('Timer is already running.');
      return;
    }

    this.startTime = moment();
    this.endTime = moment().add({ hours, minutes, seconds });
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      const remainingTime = this.calculateRemainingTime();
      console.log(this.formatTime(remainingTime));

      if (remainingTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  pause() {
    if (!this.isRunning) {
      console.error('Timer is not running.');
      return;
    }

    clearInterval(this.intervalId);
    this.pausedTime = this.calculateRemainingTime();
    this.isRunning = false;
  }

  resume() {
    if (this.isRunning) {
      console.error('Timer is already running.');
      return;
    }

    this.endTime = moment().add(this.pausedTime, 'seconds');
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      const remainingTime = this.calculateRemainingTime();
      console.log(this.formatTime(remainingTime));

      if (remainingTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isRunning = false;
    console.log('Timer stopped.');
  }

  calculateRemainingTime() {
    if (this.endTime) {
      return Math.max(0, this.endTime.diff(moment(), 'seconds'));
    } else {
      return 0; // Timer has completed
    }
  }
  

  formatTime(seconds) {
    const duration = moment.duration(seconds, 'seconds');
    const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    return formattedTime;
  }
}

module.exports = Timer;
