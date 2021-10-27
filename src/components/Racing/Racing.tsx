import React, { ReactElement, useContext, useState } from 'react';
import RaceContext from '../../context/RaceContext';
import { CategoryTypes } from '../../types/categoryTypes';
import SliderCard from '../SliderCard/SliderCard';
import RaceIcon from '../RaceIcon';
import './Racing.scss';

const Racing = (): ReactElement => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    ...Object.values(CategoryTypes),
  ]);

  const { nextToGo } = useContext(RaceContext);

  const updateSelectedFilters = (selectedFilter: string) => {
    setSelectedFilters((prevState) => {
      if (prevState) {
        const filterIndex = prevState?.findIndex(
          (value) => value === selectedFilter
        );
        const temp = [...prevState];

        if (filterIndex !== -1) {
          temp.splice(filterIndex, 1);
        } else {
          temp.push(selectedFilter);
        }
        return temp;
      }
      return prevState;
    });
  };

  const filteredRaces = nextToGo?.next_to_go_ids
    .map((id) => {
      const race = nextToGo.race_summaries[id];

      if (selectedFilters.includes(race.category_id)) {
        return (
          <SliderCard race={race} key={id}>
            <div className="raceCard">
              <p className="stats">Information</p>
              <p className="venue-name">
                <strong>Venue Name: </strong>
                {race.venue_name}
              </p>
              <p className="venue-country">
                <strong>Venue Country: </strong>
                {race.venue_country}
              </p>
            </div>
          </SliderCard>
        );
      }
      return null;
    })
    .filter((race) => race);

  return (
    <div className="Racing">
      <div className="headingContainer">
        <p className="heading">Racing</p>
        <div className="filterIconsContainer">
          {Object.values(CategoryTypes).map((category, i) => (
            <button
              key={category}
              className={`filterIcon ${
                selectedFilters.includes(category) ? 'selected' : ''
              }`}
              onClick={() => updateSelectedFilters(category)}>
              <RaceIcon raceCategory={category} />
            </button>
          ))}
        </div>
      </div>

      {filteredRaces && filteredRaces?.length > 0 ? (
        <div className="raceCardContainers">{filteredRaces}</div>
      ) : (
        <p className="no-races">
          Sorry there appears to be no available races, place update your
          filters or try again later.
        </p>
      )}
    </div>
  );
};

export default Racing;
