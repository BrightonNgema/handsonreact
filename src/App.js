import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Navbar from './components/navbar';
import Book from './components/book';
import MyMap from './components/mymap';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div className="Container">
          <Navbar />    
          <Route exact path='/home' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/about/:book_id' component={Book} />
          <Route path='/contact' component={Contact} />
          <Route path='/mymap' component={MyMap} />
        </div>
      </BrowserRouter>
      
    )
  }
  
}

export default App;
