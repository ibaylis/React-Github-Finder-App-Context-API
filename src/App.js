import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
        return (
            <GithubState>
                <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar title='Github Finder' icon='fab fa-github' />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/user/:login' component={User} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
                </AlertState>
            </GithubState>
 
        );
}

export default App;

    // componentDidMount() {
    //     axios.get('https://api.github.com/users')
    //          .then(res => console.log(res.data))
    // }

// Notes
//                       componentDidMount() {} -> async componentDidMount() {}
// axios.get('https://api.github.com/users') -> const res = await axios.get('https://api.github.com/users');
//       .then(res => console.log(res.data)) -> console.log(res.data);

    // async componentDidMount() {
    //     this.setState({ loading: true })

    //     const res = await axios.get(`https://api.github.com/users?client_id=
    //     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    //     ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //     this.setState({ users: res.data, loading: false });
    //     console.log(res.data);
    // }


    // state = {
    //     users: [],
    //     user: {},
    //     repos: [],
    //     loading: false,
    //     alert: null

    // }

    

    // Search Github users



    // Get single Github user






// Get users repos






    // Clear users from state
    //clearUsers = () => this.setState({ users: [], loading: false })
 

    // Set Alert