import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HotelDisplay from './Screens/HotelDisplay';
import Home from "./Screens/Home";
import Browse from './Screens/Browse';
import Wishlist from "./Screens/Wishlist";
import Profile from './Screens/Profile';
import Reservation from './Screens/Reservation';
import AvailableRooms from './Screens/AvailableRooms';
import ReservationFormScreen from './Screens/ReservationForm';
import AdminHome from './Screens/AdminHome';
import AdminRooms from './Screens/ManageRooms';
import Login from './Screens/Login';
import Registration from './Screens/Registration';
import NoPageFound from './Screens/NoPageFound';
import ResetPassword from './Screens/forgotPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Registration />
        </Route>

        <Route path="/browse">
            <Browse />
        </Route>

        <Route path="/adminhome">
            <AdminHome />
        </Route>

        <Route path="/rooms">
            <AdminRooms />
        </Route>

        <Route path="/availablerooms">
          <AvailableRooms />
        </Route>

        <Route path="/display">
          <HotelDisplay />
        </Route>

        <Route path="/reservationform">
          <ReservationFormScreen />
        </Route>

        <Route path="/reservationlist">
          <Reservation />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/wishlist">
          <Wishlist />
        </Route>

        <Route path="/forgotpassword">
          <ResetPassword />
        </Route>

        <Route path="*">
          <NoPageFound />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
