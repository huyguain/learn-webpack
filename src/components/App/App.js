import React, { Component } from 'react';
import './App.css';
import Menu from './../Menu/Menu';
import routes from './../../routes';
import { Routes, Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Menu />
                    <div className="container">
                        <div className="row">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                const Component = route.main;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Component />}
                    />
                );
            });
        }
        return <Routes>{result}</Routes>;
    }

}

export default App;
