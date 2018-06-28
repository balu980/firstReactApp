import React, { Component } from 'react';
import { Provider } from "react-redux"
import Layout from "./components/Layout"
import store from "./store"

import './App.css';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
            <div className="main-app">
                <header className="main-header">
                    <h1>Search GitHub</h1>
                </header>
            </div>
            <div className="main-content">
            <Layout />
            </div>
            </div>
        </Provider>
    );
  }
}

export default App;


