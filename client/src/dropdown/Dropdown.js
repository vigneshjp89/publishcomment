import React, { Component, useCallback, useState } from "react";
import LoadProps from "./LoadProps";
import DPPNG from './down.png';
import './styles.css';
function Dropdown({
  id,
  label,
  setLabel,
  options,
  setOptions,
  value,
  setValue,
  visibility,
  changeVisibility
}) {
  
  return (
    <>
      <div className="buttonContainer">
        <button
          style={{ width: "100%" }}
          id={id}
          type="button"
          className="dpbutton"
          onClick={changeVisibility}
        >
          <span className="buttonlabel" id={`bspan_${id}`}>{label}</span>
          <img
            src={DPPNG}
            alt={"down"}
            
            style={{
              marginTop: "-6%",
              marginLeft: "1%",
              position: "relative",
              float: "right",
              width:"15%"
            }}
          />
        </button>
        <div className="inputMenu" style={{ width: "100%" }}>
          {(options!==null||options!==undefined)?(<LoadProps
            id={`lp_` + id}
            options={options}
            setValue={setValue}
            visible={visibility}
            setLabel={setLabel}
            setVisibility={changeVisibility}
          />):(<></>)}
        </div>
      </div>
    </>
  );
}
export default Dropdown;
