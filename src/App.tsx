//IMPORTING NECESSSARY COMPONENTS
import Home from './pages/Home';
import Properties from './pages/Properties';

//IMPORTING REAC ROUTER COMPONENTS
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/properties' element={<Properties />} />
      </Routes>
  );
};

export default App;
