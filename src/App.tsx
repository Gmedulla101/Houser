//IMPORTING NECESSSARY COMPONENTS
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import AllProperties from './pages/AllProperties';
import PropertyPage from './pages/PropertyPage';
import MyProperties from './pages/MyProperties';
import FeaturedProperties from './pages/FeaturedProperties';
import Names from './pages/signup-flow/Names';
import EmailConfirmation from './pages/signup-flow/EmailConfirmation';
import Passwords from './pages/signup-flow/Passwords';
import UserRole from './pages/signup-flow/UserRole';
import GoogleConfirmation from './pages/signup-flow/GoogleConfirmation';
import RequestATour from './pages/RequestATour';
import ForgotPassword from './pages/forgotPassword-flow/ForgotPassword';
import PaymentConfirmation from './pages/PaymentConfirmation';

//IMPORTING REACT ROUTER COMPONENTS
import { Route, Routes } from 'react-router-dom';

//IMPORTING MANTINE UI DEPS
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const App = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="create-property" element={<CreatePost />} />
        <Route path="/all-properties" element={<AllProperties />} />
        <Route path="/view-property/:id" element={<PropertyPage />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/featured-properties" element={<FeaturedProperties />} />
        <Route path="/signupflow-name&username" element={<Names />} />
        <Route path="/signupflow-passwords" element={<Passwords />} />
        <Route path="/signupflow-user_user-role" element={<UserRole />} />
        <Route
          path="/signupflow-email_confirmation"
          element={<EmailConfirmation />}
        />
        <Route path="/google-success/token" element={<GoogleConfirmation />} />
        <Route path="/request-tour/:id" element={<RequestATour />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-payment/:id" element={<PaymentConfirmation />} />
      </Routes>
    </MantineProvider>
  );
};

export default App;
