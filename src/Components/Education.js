import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";

class Resume extends Component {
  render() {
    if (this.props.data) {
      var education = this.props.data.education.map(function (education) {
        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            <p className="info">
              {education.degree} <span>&bull;</span>
              <em className="date">{education.graduated}</em>
            </p>
            {education.description.map((activity, i) => {
              return <li key={i}>{activity}</li>;
            })}
          </div>
        );
      });
    }

    return (
      <div className="resume" id="education">
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <ScrollAnimation animateIn="fadeIn">
            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}

export default Resume;
