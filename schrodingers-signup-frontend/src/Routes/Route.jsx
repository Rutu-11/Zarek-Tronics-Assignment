import {} from 'react';
import {  Route, Routes } from "react-router-dom";
import RegistrationForm from '../RegistrationForm';
import Login from '../Login';

const AllRoutes = () => {
  return (
    <Routes>
    <Route exact path="/" element={<RegistrationForm />} />
    <Route exact path="/login" element={<Login/>} />
    </Routes>
  );
};

export default AllRoutes;
