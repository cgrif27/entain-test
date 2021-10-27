import './App.scss';
import { RaceStore } from './context/RaceContext';
import NextToGo from './pages/NextToGo';

function App() {
  return (
    <div className="App">
      <RaceStore>
        <NextToGo />
      </RaceStore>
    </div>
  );
}

export default App;
