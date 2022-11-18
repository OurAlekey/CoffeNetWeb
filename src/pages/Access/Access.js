import React from "react";
import { useHistory } from "react-router-dom";
import "../../utils/Acces.scss";
export const Access = (props) => {
  const history = useHistory();

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: "#111111",
        fontFamily: "Roboto Condensed",
        texttransform: "uppercase",
        overflow: "hidden",
      }}
      onClick={() => history.push("/")}
    >
      <div class="ghost">
        <div class="ghost--navbar"></div>
        <div class="ghost--columns">
          <div class="ghost--column">
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
          </div>
          <div class="ghost--column">
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
          </div>
          <div class="ghost--column">
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
            <div class="code"></div>
          </div>
        </div>
        <div class="ghost--main">
          <div class="code"></div>
          <div class="code"></div>
        </div>
      </div>

      <h1 class="police-tape police-tape--1">
        &nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error:
        403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error: 403
      </h1>
      <h1 class="police-tape police-tape--2">
        Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </h1>
    </div>
  );
};
