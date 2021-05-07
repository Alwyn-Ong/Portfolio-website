import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";

class Resume extends Component {
  render() {
    if (this.props.data) {
      var projects = this.props.data.projects.map(function (project) {
        return (
          <ScrollAnimation animateIn="fadeIn">
            <div key={project.title} className={"projects"}>
              <h3>{project.title}</h3>
              <p>{project.technology.join(" | ")}</p>
              <p>{project.description}</p>
              {project.link !== "" && (
                <a
                  href={project.link}
                  className="button btn project-btn"
                  target="_blank"
                >
                  <i className="fa fa-book"></i> Demo
                </a>
              )}
              {project.github !== "" && (
                <a
                  href={project.github}
                  className="button btn github-btn"
                  target="_blank"
                >
                  <i className="fa fa-github"></i> Github
                </a>
              )}
            </div>
          </ScrollAnimation>
        );
      });
    }

    return (
      <section className="resume" id="projects">
        <div className="row projects">
          <div className="three columns header-col">
            <h1>
              <span>Projects</span>
            </h1>
          </div>

          <div className="nine columns main-col">{projects}</div>
        </div>
      </section>
    );
  }
}

export default Resume;
