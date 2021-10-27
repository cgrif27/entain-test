import React, { ReactElement, useContext, useRef, useState } from 'react';
import './NextToGoSlider.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useElementWidth from '../../hooks/useElementWidth';
import RaceContext from '../../context/RaceContext';
import SliderCard from '../SliderCard/SliderCard';

const NextToGoSlider = (): ReactElement => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const { nextToGo, fetchNextToGo } = useContext(RaceContext);

  const sliderContainerRef = useRef<any>();
  const rightButtonRef = useRef<any>();

  const rightButtonWidth = useElementWidth(rightButtonRef);
  const sliderContainerWidth =
    useElementWidth(sliderContainerRef) - rightButtonWidth * 2;

  const increaseSlider = (increase: boolean, numSlides: number): void => {
    setSliderIndex((prevState) => {
      if (prevState > 0 && !increase) {
        return prevState - 1;
      } else if (prevState < numSlides - 1 && increase) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  const numSlides = Math.ceil(
    nextToGo?.next_to_go_ids ? nextToGo?.next_to_go_ids.length / 5 : 0
  );

  return (
    <div className="NextToGoSlider">
      <h1>Next to go racing</h1>
      <div className="sliderContainer" ref={sliderContainerRef}>
        <button
          disabled={sliderIndex <= 0}
          className="moveRaceBtn left"
          onClick={() => increaseSlider(false, numSlides)}>
          <BsChevronLeft />
        </button>
        {nextToGo && (
          <div
            className="listBox"
            style={{
              transform: `translateX(-${sliderContainerWidth * sliderIndex}px)`,
            }}>
            {nextToGo.next_to_go_ids.map((id) => {
              const race = nextToGo.race_summaries[id];

              return (
                <SliderCard
                  race={race}
                  key={id}
                  requestNewData={fetchNextToGo}
                />
              );
            })}
          </div>
        )}
        <button
          ref={rightButtonRef}
          className="moveRaceBtn right"
          onClick={() => increaseSlider(true, numSlides)}
          disabled={sliderIndex >= 1}>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NextToGoSlider;
