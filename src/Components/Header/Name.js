import React from "react";
import "react-typist/dist/Typist.css"
import Typist from "react-typist";
import 'babel-polyfill'

const Name = (props) => {
  return (
    <div>
      {props.data && (
        <h1 className="responsive-headline">
          <Typist className="responsive-headline" avgTypingDelay={150}>
            <Typist.Delay ms={500} />
            {props.data}
          </Typist>
        </h1>
      )}
    </div>

  );
};

export default Name;
