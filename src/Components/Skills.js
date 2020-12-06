import React, { Component } from "react";

class Resume extends Component {
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
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

          <div className="nine columns main-col">
            <div className="bars">
              <ul className="skills">{skills}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
