import React, { Component } from "react";
import "./styles.css";
function LoadProps({
  id,
  options,
  setLabel,
  visible,
  setVisibility,
  setValue
}) {
  console.log(options);
  const selection = (e) => {
    e.preventDefault();
    if (Array.isArray(options)) {
      document.getElementById(id.substring(3, id.length)).value =
        e.target.firstChild.data;

      setValue(e.target.firstChild.data);
      setLabel(e.target.firstChild.data);
      console.log(e.target.children);
      setVisibility(!visible);
    } else {
      console.log(e.target.id);
      // document.getElementById(
      //   e.target.id.substring(
      //     e.target.id.lastIndexOf("_") + 1,
      //     e.target.id.length
      //   )
      // ).value = options[e.target.id.substring(7, e.target.id.lastIndexOf("_"))];
      setValue(e.target.id.substring(7, e.target.id.lastIndexOf("_")));
      setLabel(options[e.target.id.substring(7, e.target.id.lastIndexOf("_"))]);
      setVisibility(!visible);
    }
  };
  let data = [];
  if (Array.isArray(options)) {
    data = options.map((it) => (
      <div className="select-op">
        <span id={`sop_${id}`} onClick={selection}>
          {it}
        </span>
      </div>
    ));
  } else {
    data = Object.entries(options).map((it, index) => (
      <div className="select-op" tabIndex="0" style={{ position: "relative" }}>
        <div
          className="selectionWrapper"
          onClick={selection}
          id={`select_${it[0]}_${id.substring(3, id.length)}`}
          
        ></div>
        <span
        className="optionname"
          id={`sop_${id}_${index}`}
          style={{ position: "relative" }}
        >{`${it[1]} - `}</span>
        <span className="optionid">
          {it[0]}
        </span>
      </div>
    ));
  }
  return visible ? (
    <div
      className="select-pop"
    >
      {data}
    </div>
  ) : (
    <></>
  );
}
export default LoadProps;
