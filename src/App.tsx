//IMPORTING NECESSSARY COMPONENTS
import Home from './pages/Home';
import Properties from './pages/Properties';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import AllProperties from './pages/AllProperties';
import PropertyPage from './pages/PropertyPage';
import MyProperties from './pages/MyProperties';
import FeaturedProperties from './pages/FeaturedProperties';

//IMPORTING REACT ROUTER COMPONENTS
import { Route, Routes } from 'react-router-dom';

//IMPORTING MANTINE UI DEPS
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const App = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="create-property" element={<CreatePost />} />
        <Route path="/all-properties" element={<AllProperties />} />
        <Route path="/view-property/:id" element={<PropertyPage />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/featured-properties" element={<FeaturedProperties />} />
      </Routes>
    </MantineProvider>
  );
};

export default App;
