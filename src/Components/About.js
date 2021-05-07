import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";

class About extends Component {
  render() {
    if (this.props.data) {
      var profilepic = "images/" + this.props.data.image;
      var bio = this.props.data.bio;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        <ScrollAnimation animateIn="fadeIn">
          <div className="row">
            <div className="three columns">
              <img className="profile-pic" src={profilepic} alt="Profile Pic" />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns download">
                  <p>
                    <a href={resumeDownload} className="button" download>
                      <i className="fa fa-download"></i>Download Resume
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>
    );
  }
}

export default About;
