import React from "react";
// import "./styles.css";
import ScrollAnimation from "react-animate-on-scroll";

const Resume = (props) => {
  if (props.data) {
    var work = props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <ScrollAnimation animateIn="fadeIn">
            <div className="company-logo">
              <img src={`/images/${work.logo}`} alt=""/>
            </div>
            <h3>{work.company}</h3>
            <p className="info">
              {work.title}
              <span>&bull;</span> <em className="date">{work.years}</em>
            </p>
            {work.description.map((activity, i) => {
              return <li key={i}>{activity}</li>;
            })}
            <br></br>
          </ScrollAnimation>
        </div>
      );
    });
  }

  return (
    <section className="resume" id="work">
      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">{work}</div>
      </div>
    </section>
  );
};

export default Resume;
