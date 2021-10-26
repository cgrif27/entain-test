import React, { ReactElement } from "react";
import "./NextToGoSlider.scss";

const NextToGoSlider = (): ReactElement => {
  return (
    <div className="NextToGoSlider">
      <div className="sliderContainer">
        <div className="listBox">
          <div className="sliderCard">
            <p className="race-name">Test Race</p>
          </div>
          <div className="sliderCard">
            <p className="race-name">Test Race 2</p>
          </div>
          <div className="sliderCard">
            <p className="race-name">Test Race 3</p>
          </div>
          <div className="sliderCard">
            <p className="race-name">Test Race 4 </p>
          </div>
          <div className="sliderCard">
            <p className="race-name">Test Race 5</p>
          </div>
          <div className="sliderCard">
            <p className="race-name">Test Race 6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextToGoSlider;
