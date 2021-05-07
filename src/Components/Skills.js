import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";

class Resume extends Component {
  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      let randomColour = Math.floor(Math.random() * 56) + 175;
      color += randomColour.toString(16);
    }
    return color;
  }

  render() {
    if (this.props.data) {
      var skills = this.props.data.skills.map((skills) => {
        var className = "bar-expand " + skills.name.toLowerCase();
        return (
          <li key={skills.name}>
            <span
              style={{
                width: skills.level,
                backgroundColor: this.getRandomColor(),
              }}
              className={className}
            ></span>
            <em>{skills.name}</em>
          </li>
        );
      });
    }

    return (
      <section className="resume" id="skills">
        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <div className="nine columns main-col">
              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    );
  }
}

export default Resume;
