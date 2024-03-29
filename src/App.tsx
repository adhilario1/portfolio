import React from 'react';

import Footer from './components/Footer';
import Body from './components/Body';
import Home from './components/pages/Home';

import useWindowDimensions from './components/code/WindowDimensions';
import './components/css/App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Gallery from './components/pages/Gallery';
import Exhibit from './components/pages/Exhibit';
import Games from './components/pages/Games';
import About from './components/pages/About';
import Guestbook from './components/pages/GuestBook';
import Contact from './components/pages/Contact';
import AdminLogin from './components/pages/AdminLogin';
import Test from './components/pages/test';
import GamePage from './components/pages/GamePage';

//AWS



const breakpoint=685;
function App() {

  const {height, width} = useWindowDimensions();

  var device;
  if (height && width < breakpoint) {
    device = "handheld";
  } else {
    device = "desktop";
  }
  return (
    <div>
      <div className={`background ${device}`}/>
      <Routes>
        <Route 
          path='/'
          element={<Body><Home breakpoint={breakpoint} /></Body>}
        />
        <Route
          path='/projects/web-dev' 
          element={<Body><Exhibit breakpoint={breakpoint}/></Body>}
        />
        <Route 
          path="/projects/gallery"
          element={<Body><Gallery breakpoint={breakpoint}/></Body>}
        />                
        <Route          
          path="/projects/:exhibitID"
          element={<Body><Exhibit breakpoint={breakpoint}/></ Body>} 
        />
        <Route          
          path="/games"
          element={<Body><Games breakpoint={breakpoint} /></Body>}
        />              
        <Route 
          path='/games/:id'
          element={<GamePage breakpoint={breakpoint} />}
        />

        <Route
          path='/about'
            element={<Body><About breakpoint={breakpoint}/></Body>}
        />
        <Route  
          path="/guestbook"
          element={<Body><Guestbook breakpoint={breakpoint}/></Body>}
        />
        <Route     
          path="/contact/email"
          element={<Body><Contact breakpoint={breakpoint}/></Body>}
        />
        <Route
          path='/test'
          element={<Body><Test /></Body>} 
        />
        
        <Route
          path='/admin'
          element={<Body><AdminLogin /></Body>} 
        />
       
        <Route 
          path="*"
          element={<NotFound />}
        />
      </Routes>
      
      
      <Footer />
    </div>
  );
}

export default App;
