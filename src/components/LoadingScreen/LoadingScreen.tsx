import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import RaceContext from '../../context/RaceContext';
import './LoadingScreen.scss';

const LoadingScreen = (): ReactElement => {
  const { loading } = useContext(RaceContext);
  const [renderScreen, setRenderScreen] = useState(loading);

  const transitionSpeed = 300;

  // This will display it until the animation is complete which is 300ms currently
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderScreen(loading);
    }, transitionSpeed);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {renderScreen && (
        <div
          className={`LoadingScreen ${loading ? '' : 'loaded'}`}
          style={{ transition: `opacity ${transitionSpeed}ms` }}>
          <div className="spinner">
            <ClipLoader color="white" loading size={150} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
