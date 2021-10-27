import React, { ReactElement, useContext, useRef, useState } from 'react';
import './NextToGoSlider.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useElementWidth from '../../hooks/useElementWidth';
import RaceContext from '../../context/RaceContext';
import SliderCard from '../SliderCard/SliderCard';
import styled from 'styled-components';
import { ScreenSizes } from '../../types/ScreenSizes';
const numSliderElement = () => {
  const width = window.innerWidth;
  // Mobile
  if (width <= ScreenSizes.Mobile) return 2;
  // Tablet
  else if (width <= ScreenSizes.Tablet) return 3;
  // Desktop
  return 5;
};

const numSliderElementsStyle = (numSliderElements: number) => {
  return `calc(100% / ${numSliderElements} - 2em)`;
};

interface ListBoxProps {
  numSliderElements: number;
  sliderContainerWidth: number;
  sliderIndex: number;
}

const ListBox = styled.div<ListBoxProps>`
  display: flex;
  width: calc(100% - 3em);
  margin: 0 auto;
  flex-basis: ${(props) => numSliderElementsStyle(props.numSliderElements)};
  transition: transform 400ms;
  transform: ${(props) =>
    `translateX(-${props.sliderContainerWidth * props.sliderIndex}px)`};

  @media only screen and (min-width: ${ScreenSizes.Tablet}px) {
    flex-basis: ${(props) => numSliderElementsStyle(props.numSliderElements)};
  }

  @media only screen and (min-width: ${ScreenSizes.Desktop}px) {
    flex-basis: ${(props) => numSliderElementsStyle(props.numSliderElements)};
  }
`;

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

  const numElements = numSliderElement();

  const numSlides = Math.ceil(
    nextToGo?.next_to_go_ids ? nextToGo?.next_to_go_ids.length / numElements : 0
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
          <ListBox
            numSliderElements={numElements}
            sliderIndex={sliderIndex}
            sliderContainerWidth={sliderContainerWidth}
            className="listBox">
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
          </ListBox>
        )}
        <button
          ref={rightButtonRef}
          className="moveRaceBtn right"
          onClick={() => increaseSlider(true, numSlides)}
          disabled={sliderIndex >= numSlides - 1}>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NextToGoSlider;
