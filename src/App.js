import React from 'react';
import Header from './main/Header';
import CarCarousel from './main/Carousel';
import MainForm from './main/MainForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


function App() {
  return (
    <div className="App">
      <div className='container'>
        <Header />
        <div className='contentContainer'>
          <CarCarousel />
          <MainForm />
        </div>

      </div>
    </div>
  );
}

export default App;
