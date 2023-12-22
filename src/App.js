import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { useState } from "react";

import HotelDisplay from './Screens/HotelDisplay';
import Home from "./Screens/Home";
import Browse from './Screens/Browse';
import Wishlist from "./Screens/Wishlist";
import Profile from './Screens/Profile';
import AvailableRooms from './Screens/AvailableRooms';
import ReservationFormScreen from './Screens/ReservationForm';
import AdminHome from './Screens/AdminHome';
import AdminRooms from './Screens/ManageRooms';
import Login from './Screens/Login';
import Registration from './Screens/Registration';
import NoPageFound from './Screens/NoPageFound';
import ResetPassword from './Screens/forgotPassword';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import ProfileAdmin from './Screens/ProfileAdmin';
import UserReservations from "./Screens/UserReservations";
import ReservationHistory from './Screens/ReservationHistory';

function App() {

  //Registration Variables
  const [regFullName, setRegFullName] = useState("");
  const [regEmailAddress, setRegEmailAddress] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhysicalAddress, setRegPhysicalAddress] = useState("");
  const [role, setRole] = useState("");

  //functions to capture the change to the state of the registration form variables
  function handleRegNameChange(e) {
    e.preventDefault();

    setRegFullName(e.target.value);
  };

  function handleRegEmailChange(e) {
    e.preventDefault();

    setRegEmailAddress(e.target.value);
  };

  function handleRegGenderChange(e) {
    e.preventDefault();

    setRegGender(e.target.value);
  };

  function handleRegAddressChange(e) {
    e.preventDefault();

    setRegPhysicalAddress(e.target.value);
  };

  function handleRegPasswordChange(e) {
    e.preventDefault();

    setRegPassword(e.target.value);
  }

//__________________________________________________________________________________________________________________________________________________
  //Reservation Form Functions
    //Reservation Form Variables
    const [reservationFormValues, setReservationFormValues] = useState({
      reserveName: "",
      reserveEmail: "",
      reservePhysicalAddress: "",
      specialRequests: "",
      hotelSuite: "",
      roomNumber: "",
      numberOfDays: "",
      numberOfAdults: "",
      numberOfChildren: "",
      arrivalDate: "",
      arrivalTime: "",
      departureDate: "",
      depatureTime: "",
    });

    //Function to handle the changes made to the input
    const handleChange = (e) => {
      const { name, value} = e.target;
      setReservationFormValues({
          ...reservationFormValues,
          [name]: value,
      });
    };

//___________________________________________________________________________________________________________________________________________________________________
    //Profile Form Functions
      //Profile Form Variables
      const [profileFullName, setProfileFullName] = useState(regFullName);
      const [profileNameEdit, setProfileNameEdit] = useState("");
      //const [profileEmailAddress, setProfileEmailAddress] = useState(loginEmailAddress);
      const [profileEmailEdit, setProfileEmailEdit] = useState("");
      const [profileGender, setProfileGender] = useState(regGender);
      const [profileGenderEdit, setProfileGenderEdit] = useState("");
      const [profilePhysicalAddress, setProfilePhysicalAddress] = useState(regPhysicalAddress);
      const [profileAddressEdit, setProfileAddressEdit] = useState("");

      //Edit Profile Form Function to Store Captured Values
      function handleProfileFullNameChange(e) {
        e.preventDefault();

        setProfileNameEdit(e.target.value);
      };

      function handleProfileEmailAddressChange(e) {
        e.preventDefault();

        setProfileEmailEdit(e.target.value);
      };

      function handleProfileGenderChange(e) {
        e.preventDefault();

        setProfileGenderEdit(e.target.value);
      };

      function handleProfilePhysicalAddressChange(e) {
        e.preventDefault();

        setProfileAddressEdit(e.target.value);
      }
//_____________________________________________________________________________________________________________________________________________________________

      //Wishlist Screen Variables
      const [wishlist, setWishlist] = useState([]);
      const [wishRoom, setWishRoom] = useState({});
  
//______________________________________________________________________________________________________________________________________________________________________

      //Available Rooms Variables
      const [avRooms, setAvRooms] = useState([]);
      const [selectedRoom, setSelectedRoom] = useState({});

//_____________________________________________________________________________________________________________________________________________________________________

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
          <Registration
                regFullName={regFullName}
                setRegFullName={setRegFullName}
                regEmailAddress={regEmailAddress}
                setRegEmailAddress={setRegEmailAddress}
                regGender={regGender}
                setRegGender={setRegGender}
                regPassword={regPassword}
                setRegPassword={setRegPassword}
                regPhysicalAddress={regPhysicalAddress}
                setRegPhysicalAddress={setRegPhysicalAddress}
                role={role}
                setRole={setRole}
                handleRegAddressChange={handleRegAddressChange}
                handleRegEmailChange={handleRegEmailChange}
                handleRegGenderChange={handleRegGenderChange}
                handleRegNameChange={handleRegNameChange}
                handleRegPasswordChange={handleRegPasswordChange}
                        />
        </Route>

        <Route path="/browse">
            <Browse
                  wishlist = {wishlist}
                  setWishlist = {setWishlist}
                  wishRoom = {wishRoom}
                  setWishRoom = {setWishRoom} 
                    />
        </Route>

        <Route path="/adminhome">
            <AdminHome />
        </Route>

        <Route path="/availablerooms">
          <AvailableRooms 
                wishlist = {wishlist}
                setWishlist = {setWishlist}
                wishRoom = {wishRoom}
                setWishRoom = {setWishRoom} 

                avRooms={avRooms}
                setAvRooms={setAvRooms}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
          />
        </Route>

        <Route path="/display">
          <HotelDisplay           
            wishlist = {wishlist}
            setWishlist = {setWishlist}
            wishRoom = {wishRoom}
            setWishRoom = {setWishRoom} 
          />
        </Route>

        <Route path="/reservationform">
          <ReservationFormScreen 
                            reservationFormValues={reservationFormValues}
                            setReservationFormValues={setReservationFormValues}
                            handleChange={handleChange}

                            wishlist = {wishlist}
                            setWishlist = {setWishlist}
                            wishRoom = {wishRoom}
                            setWishRoom = {setWishRoom} 
                            />
        </Route>

        <Route path="/managerooms">
            <AdminRooms />
        </Route>

        <Route path="/profile">
          <Profile 
                  profileFullName={profileFullName}
                  profileNameEdit={profileNameEdit}
                 // profileEmailAddress={profileEmailAddress}
                  profileEmailEdit={profileEmailEdit}
                  profilePhysicalAddress={profilePhysicalAddress}
                  profileAddressEdit={profileAddressEdit}
                  profileGender={profileGender}
                  profileGenderEdit={profileGenderEdit}
                  handleProfileFullNameChange={handleProfileFullNameChange}
                  handleProfileEmailAddressChange={handleProfileEmailAddressChange}
                  handleProfilePhysicalAddressChange={handleProfilePhysicalAddressChange}
                  handleProfileGenderChange={handleProfileGenderChange}

                  wishlist = {wishlist}
                  setWishlist = {setWishlist}
                  wishRoom = {wishRoom}
                  setWishRoom = {setWishRoom} 
                  />
        </Route>

        <Route path="/profileadmin">
          <ProfileAdmin 
                  profileFullName={profileFullName}
                  profileNameEdit={profileNameEdit}
                 // profileEmailAddress={profileEmailAddress}
                  profileEmailEdit={profileEmailEdit}
                  profilePhysicalAddress={profilePhysicalAddress}
                  profileAddressEdit={profileAddressEdit}
                  profileGender={profileGender}
                  profileGenderEdit={profileGenderEdit}
                  handleProfileFullNameChange={handleProfileFullNameChange}
                  handleProfileEmailAddressChange={handleProfileEmailAddressChange}
                  handleProfilePhysicalAddressChange={handleProfilePhysicalAddressChange}
                  handleProfileGenderChange={handleProfileGenderChange}
                  />
        </Route>

        <Route path="/wishlist">
          <Wishlist 
            wishlist = {wishlist}
            setWishlist = {setWishlist}
            wishRoom = {wishRoom}
            setWishRoom = {setWishRoom} 
          />
        </Route>

        <Route path="/forgotpassword">
          <ResetPassword />
        </Route>

        <Route path="/aboutus">
          <AboutUs />
        </Route>

        <Route path="/contactus">
          <ContactUs
                   />
        </Route>

        <Route path="/user-Reservation">
          <UserReservations />
        </Route>

        <Route path="/reservationhistory">
            <ReservationHistory />
        </Route>

        <Route path="*">
          <NoPageFound />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
