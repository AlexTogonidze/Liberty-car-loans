import React from 'react';
import Header from './main/Header';
import CarCarousel from './main/Carousel';
import MainForm from './main/MainForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ReactGA from 'react-ga';

function App() {


  ReactGA.initialize('UA-39762819-15', {
    debug: true,
    titleCase: false,
   
  });


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
