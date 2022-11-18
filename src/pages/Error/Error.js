import React from "react";
import { useHistory } from "react-router-dom";
import "../../utils/Error.css";
export const Error = (props) => {
  const history = useHistory();
  // font-size: 20px;
  // font-family: 'IBM Plex Mono';
  // line-height: 1.5;
  // color: rgba(white, 0.25);
  // height: 100vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  // background: #333333;
  return (
    <div classNameName="exception-body error" onClick={() => history.push("/")}>
      <section className="centered">
        <h1>500 Server Error</h1>

        <h1>Regresar</h1>
      </section>
    </div>
  );
};
