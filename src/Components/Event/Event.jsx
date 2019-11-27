import React, { Component } from "react";
import styles from "./Event.module.scss";

class Event extends Component {
  state = {};

  renderDateAndTime = input => {
    let timingInformation = input;
    let eventDate;
    let dateAndTime;
    let eventTime;
    if (timingInformation && timingInformation.includes("T")) {
      dateAndTime = new Date(timingInformation);
      eventDate = dateAndTime.toDateString();
      eventTime = `${dateAndTime.toTimeString().slice(0, 5)}`;
      timingInformation = `${eventDate} at ${eventTime}`;
    } else if (timingInformation) {
      timingInformation = new Date(timingInformation).toDateString();
    } else {
      timingInformation = null;
    }
    return timingInformation;
  };

  render() {
    return (
      <section className={styles.main}>
        <p className={styles.title}>{this.props.summary}</p>
        <i className={styles.dates}>
          {this.renderDateAndTime(this.props.startDate)} until{" "}
          {this.renderDateAndTime(this.props.endDate)}
        </i>
        <a
          className={styles.link}
          href={this.props.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open with Google Calendar
        </a>
      </section>
    );
  }
}

export default Event;
