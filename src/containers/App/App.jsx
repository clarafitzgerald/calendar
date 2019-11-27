import React, { Component } from "react";
import styles from "./App.module.scss";
import Event from "../../Components/Event";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
  state = {
    events: "",
    filter: "",
    availableStart: 0,
    availableEnd: new Date(2030, 1, 1).getTime()
  };
  getEvents = () => {
    fetch(
      "https://www.googleapis.com/calendar/v3/calendars/nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com/events?key=AIzaSyC1KI_JdgrNT4D1ZUh5zAjVSNsMvSD-6Mg"
    )
      .then(response => {
        return response.json();
      })
      .then(events => {
        this.setState({ events: events.items });
      });
  };

  renderOnlyIDIEvents = () => {
    let IDIevents = this.state.events
      ? this.state.events.filter(
          event =>
            event.organizer.displayName === "Interpretive Dance Institute"
        )
      : null;
    console.log(IDIevents);
    return IDIevents;
  };

  orderEventsByStartDate = () => {
    let IDIevents = this.renderOnlyIDIEvents();
    let orderedEvents = IDIevents
      ? IDIevents.sort((a, b) =>
          a.start[Object.keys(a.start)[0]] > b.start[Object.keys(b.start)[0]]
            ? 1
            : -1
        )
      : null;
    return orderedEvents;
  };

  filterEventsByInterest = () => {
    let orderedEvents = this.orderEventsByStartDate();
    let filteredEvents = this.state.filter
      ? orderedEvents.filter(
          event =>
            event.summary.includes(this.state.filter) ||
            event.summary.includes(this.state.filter.toLowerCase())
        )
      : orderedEvents;
    return filteredEvents;
  };

  filterEventsByDate = () => {
    let filteredEvents = this.filterEventsByInterest();
    let filteredByDate = filteredEvents
      ? filteredEvents.filter(
          event =>
            new Date(event.start[Object.keys(event.start)[0]]).getTime() >=
              new Date(this.state.availableStart).getTime() &&
            new Date(event.end[Object.keys(event.end)[0]]).getTime() <=
              new Date(this.state.availableEnd).getTime()
        )
      : null;
    return filteredByDate;
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    let events = this.filterEventsByDate();
    let eventsHTML = events
      ? events.map(item => (
          <Event
            startDate={item.start[Object.keys(item.start)[0]]}
            endDate={item.end[Object.keys(item.start)[0]]}
            key={item.etag}
            link={item.htmlLink}
            summary={item.summary}
          />
        ))
      : null;

    return (
      <>
        <section className={styles.welcome}>
          <div>
            <p className={styles.header}>WELCOME</p>
            <i>to the Interpretive Dance Institute</i>
          </div>
          <a href="#events">
            <FontAwesomeIcon className={styles.arrow} icon={faChevronDown} />
          </a>
        </section>

        <section id="events" className={styles.events}>
          <p>Show:</p>
          <section className={styles.buttons}>
            <button onClick={() => this.setState({ filter: "" })}>
              All Events
            </button>
            <button onClick={() => this.setState({ filter: "Dance" })}>
              Dance Events
            </button>
            <button onClick={() => this.setState({ filter: "Shea" })}>
              Shea Events
            </button>
            <button onClick={() => this.setState({ filter: "Barry" })}>
              Barry Events
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://twitter.com/dog_feelings?lang=en",
                  "_blank"
                )
              }
            >
              A Magnificent Pup <FontAwesomeIcon icon={faExternalLinkAlt} />
            </button>
          </section>
          <p>When? </p>
          <div className={styles.inputs}>
            <p>Between</p>
            <input
              type="date"
              onChange={event =>
                this.setState({ availableStart: event.target.value })
              }
            ></input>
            <p>and</p>
            <input
              type="date"
              onChange={event =>
                this.setState({ availableEnd: event.target.value })
              }
            ></input>
          </div>
          {eventsHTML}
        </section>
      </>
    );
  }
}
export default App;
