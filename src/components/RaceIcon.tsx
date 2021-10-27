import React from 'react';
import { ReactComponent as Greyhound } from '../icons/greyhound-racing.svg';
import { ReactComponent as Harness } from '../icons/harness-racing.svg';
import { ReactComponent as Horse } from '../icons/horse-racing.svg';
import { CategoryTypes } from '../types/categoryTypes';

interface RaceIconProps {
  raceCategory: string;
}

const RaceIcon = ({ raceCategory }: RaceIconProps) => {
  switch (raceCategory) {
    case CategoryTypes.Greyhound:
      return <Greyhound />;
    case CategoryTypes.Harness:
      return <Harness />;
    case CategoryTypes.Horse:
      return <Horse />;

    //I wasn't sure what the other race category id was for the rest of them so i've added this as a default icons but ideally all of the category cases would be covered
    default:
      return <Greyhound />;
  }
};

export default RaceIcon;
