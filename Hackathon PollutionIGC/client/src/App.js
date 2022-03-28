import React,{ Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';

//store.subscribe(()=>console.log(store.getState()));

function App() {
  return (
    <Provider store = {store}>
        <Fragment>
            <Navbar />
            <Landing />
        </Fragment>
    </Provider>
  );
}

export default App;