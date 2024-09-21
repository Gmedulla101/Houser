//IMPORTING NECESSSARY COMPONENTS
import Home from './pages/Home';
import Properties from './pages/Properties';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';

//IMPORTING REAC ROUTER COMPONENTS
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Dashboard />} />
      <Route path="create-post" element={<CreatePost />} />
    </Routes>
  );
};

export default App;
