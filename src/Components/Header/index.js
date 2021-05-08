import ParticlesBg from "particles-bg";
import React, { Component } from "react";
import Name from "./Name";

class Header extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var description = this.props.data.description;
      var networks = this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#education">
                Education
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#work">
                Work
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#skills">
                Skills
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#projects">
                Projects
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            {/* <ScrollAnimation animateIn="bounce" animatePreScroll={true}> */}
              {/* <h1 className="responsive-headline">{name}</h1> */}
              <Name data={name}/>
            {/* </ScrollAnimation> */}
            <h3>{description}</h3>
            <hr />
            <ul className="social">
              <div className="twelve columns">
                <ul className="social-links">{networks}</ul>
              </div>
            </ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
