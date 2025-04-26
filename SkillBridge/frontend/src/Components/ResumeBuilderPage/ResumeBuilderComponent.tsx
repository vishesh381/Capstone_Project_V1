import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumeBuilderHome from '../HomePage/ResumeBuilderHome';
import Navbar from '../Navigation/Navbar';
import MyResume from '../../Components/ResumeDisplay/MyResume';
import AboutUs from '../../Components/AboutUs/AboutUs';

const ResumeBuilderComponent = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResumeBuilderHome />} />
        <Route path="myresume" element={<MyResume />} />
        <Route path="about" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default ResumeBuilderComponent;
