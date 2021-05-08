import React from "react";
// import "./node_modules/react-typist/dist/Typist.css";
import "react-typist/dist/Typist.css";
import Typist from "react-typist";

const Name = (props) => {
  const [toShow, setToShow] = React.useState(true);

  setTimeout(() => {
    setToShow(!toShow);
  }, 750);

  return (
    <div>
      {props.data && (
        <h1 className="responsive-headline">
          {/* {props.data} */}
          {/* <span style={{ visibility: !toShow && "hidden" }}>{"|"}</span> */}
          <Typist className="responsive-headline" avgTypingDelay={150}>
            <Typist.Delay ms={500} />
            {props.data}
          </Typist>
        </h1>
      )}
    </div>
    // <Typist>

    // </Typist>
  );
};

export default Name;
