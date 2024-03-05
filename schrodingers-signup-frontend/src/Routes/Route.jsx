import {} from 'react';
import {  Route, Routes } from "react-router-dom";
import RegistrationForm from '../Pages/RegistrationForm';
import Login from '../Pages/Login';

const AllRoutes = () => {
  return (
    <Routes>
    <Route exact path="/" element={<RegistrationForm />} />
    <Route exact path="/login" element={<Login/>} />
    </Routes>
  );
};

export default AllRoutes;
