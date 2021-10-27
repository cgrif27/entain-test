import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { RaceSummaries } from '../../types/NextToGo';
import { secondsToMinsSeconds } from '../../utils/secondsToMinsSeconds';
import RaceIcon from '../RaceIcon';
import './SliderCard.scss';

interface SliderCardProps {
  race: RaceSummaries;
  children?: ReactNode;
  requestNewData?: () => void;
}

const getRelativeTime = (advertised_start: number) => {
  // Ideally the Date.now() would be from a server of some sort to make sure its the correct time and not the users computer time
  const timeNowSeconds = Date.now() / 1000;
  const remainingTime = advertised_start - timeNowSeconds;

  return remainingTime;
};
const SliderCard = ({
  race,
  children,
  requestNewData,
}: SliderCardProps): ReactElement => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const remainingTime = getRelativeTime(race.advertised_start.seconds);
    setRemainingSeconds(Math.round(remainingTime));

    const timer = setInterval(() => {
      const remainingTime = getRelativeTime(race.advertised_start.seconds);
      setRemainingSeconds(Math.round(remainingTime));

      if (remainingTime <= -60 && requestNewData) {
        requestNewData();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [requestNewData, race.advertised_start.seconds]);

  return (
    <>
      {remainingSeconds > -60 && (
        <div className="SliderCard">
          <div className="sliderCardInformation">
            <div className="raceType">
              <RaceIcon raceCategory={race.category_id} />
              <p className="race-name">{race.meeting_name}</p>
              <p className="race-number">{`R${race.race_number}`}</p>
            </div>
            <p className="countdown">
              {secondsToMinsSeconds(remainingSeconds)}
            </p>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default SliderCard;
