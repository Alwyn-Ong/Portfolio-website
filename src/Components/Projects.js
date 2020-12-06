import React, { Component } from "react";

class Resume extends Component {
  render() {
    if (this.props.data) {
      var projects = this.props.data.projects.map(function (project) {
        return (
          <div key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.technology.join(" | ")}</p>
            <p>{project.description}</p>
            {project.link !== "" && (
              <a href={project.link} className="button btn project-btn">
                <i className="fa fa-book"></i>Project
              </a>
            )}
            {project.github !== "" && (
              <a href={project.github} className="button btn github-btn">
                <i className="fa fa-github"></i>Github
              </a>
            )}
          </div>
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
