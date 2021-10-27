import axios from 'axios';
import React, { createContext, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { NextToGo } from '../types/NextToGo';

interface RaceContextInterface {
  nextToGo?: NextToGo;
  fetchNextToGo: () => void;
  loading: boolean;
}

const RaceContext = createContext({} as RaceContextInterface);
export default RaceContext;

export const RaceStore: FunctionComponent = ({ children }) => {
  const [nextToGo, setNextToGo] = useState<NextToGo>();
  const [loading, setLoading] = useState(true);

  const fetchNextToGo = () => {
    axios
      .get('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10')
      .then((res) => {
        setNextToGo(res.data.data);
      })
      // I would replace this with a global error state or run a function that displays an error here instead of logging it to the console
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNextToGo();
  }, []);

  return (
    <RaceContext.Provider value={{ nextToGo, fetchNextToGo, loading }}>
      {children}
    </RaceContext.Provider>
  );
};
