//IMPORTING NECESSSARY COMPONENTS
import Home from './pages/Home';
import Properties from './pages/Properties';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import AllProperties from './pages/AllProperties';
import PropertyPage from './pages/PropertyPage';

//IMPORTING REAC ROUTER COMPONENTS
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="create-post" element={<CreatePost />} />
      <Route path="/all-properties" element={<AllProperties />} />
      <Route path="/view-property/:id" element={<PropertyPage />} />
    </Routes>
  );
};

export default App;
