import logo from './logo.svg';
import './App.css';
import React, {Component, useState, useEffect} from 'react';


import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/home.js";
import PublicReservation from "./pages/public/reservation.js";
import AdminReservation from "./pages/admin/reservation.js";
import Features from "./pages/admin/features.js";



class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pages/public/reservation/" component={PublicReservation}/>
          <Route exact path="/pages/admin/reservation/" component={AdminReservation}/>
          <Route exact path="/pages/admin/features" component={Features}/>

        </Switch> 
      </BrowserRouter>
    );
  }
}

export default App;
