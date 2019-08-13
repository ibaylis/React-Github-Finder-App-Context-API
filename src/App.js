import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null

    }

    

    // Search Github users
    searchUsers = async text => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({ users: res.data.items, loading: false });
    }


    // Get single Github user
    getUser = async (username) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}
            ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({ user: res.data, loading: false });
    }





// Get users repos
getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
}





    // Clear users from state
    clearUsers = () => this.setState({ users: [], loading: false })

    // Set Alert
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        const { users, user, loading, repos } = this.state;

        return (
            <Router>
                <div className='App'>
                    <Navbar 
                        title='Github Finder' 
                        icon='fab fa-github'
                    />
                    <div className='container'>
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route 
                                exact path='/'
                                render={props => (
                                    <>
                                        <Search 
                                            searchUsers={this.searchUsers} 
                                            clearUsers={this.clearUsers} 
                                            showClear={user.length > 0 ? true : false }
                                            setAlert={this.setAlert}
                                            />
                                        <Users loading={loading} users={users} />    
                                    </>
                                )} 
                                />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/user/:login' render={props => (
                                    <User 
                                        { ...props } 
                                        getUser={this.getUser} 
                                        getUserRepos={this.getUserRepos} 
                                        user={user} 
                                        repos={repos}
                                        loading={loading} 
                                    />
                                )} />
                        </Switch>
                        
                    </div>
                </div>
            </Router>
        )
    }
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