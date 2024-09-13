// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import FeedbackForm from './components/FeedbackForm';
import AdminTable from './components/AdminTable';
import Navbar from './components/Navbar';
import './index.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/admin" element={<AdminTable />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
