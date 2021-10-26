import axios from "axios";
import React, { useEffect } from "react";
import "./App.scss";
import NextToGoSlider from "./components/NextToGoSlider/NextToGoSlider";

function App() {
  useEffect(() => {
    axios
      .get("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10")
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="App">
      <p>Next to go</p>
      <NextToGoSlider />
    </div>
  );
}

export default App;
