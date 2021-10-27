import React from 'react';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import NextToGoSlider from '../components/NextToGoSlider/NextToGoSlider';
import Racing from '../components/Racing/Racing';

const NextToGo = () => {
  return (
    <div className="NextToGO">
      <LoadingScreen />
      <NextToGoSlider />
      <Racing />
    </div>
  );
};

export default NextToGo;
