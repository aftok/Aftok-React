import React, { useState, Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import Login from './components/Login';

import Projects from './components/Projects';
import Tracker from './components/Tracker';
import Revenue from './components/Revenue';
import Auctions from './components/Auctions';
import Dashboard from './components/DashBoard';
import './css/App.css';


class App extends React.Component {

  constructor() {
    super()

    this.state = {
      workIndex: [],
      selectedProject: '',
      userProjects: [],
      loggedIn: false,
      login: true,
      tracker: false,
      revenue: false,
      auctions: false,
      dashboard: false,
      projects: false,
      workStarted: false
    }

    this.isoNow = this.isoNow.bind(this);

    this.getWorkIndex = this.getWorkIndex.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.handleSelectedProjectState = this.handleSelectedProjectState.bind(this);
    this.handleProjectsState = this.handleProjectsState.bind(this);
    this.handleProjectState = this.handleProjectState.bind(this);
    this.handleLoggedinState = this.handleLoggedinState.bind(this);
    this.handlePageFocus = this.handlePageFocus.bind(this);
    this.getPage = this.getPage.bind(this)

    this.startWorkHandler = this.startWorkHandler.bind(this);
    this.stopWorkHandler = this.stopWorkHandler.bind(this);

    if(this.state.userProjects.length === 0) {this.getProjects()}

  }
    
  isoNow = () =>{
    var myDate = new Date(); // Set this to your date in whichever timezone.
    var isoDate = myDate.toISOString();
    return isoDate
  };

  startWorkHandler = (event) =>{

    const apiUrl = "/api/user/projects/091be765-7493-426f-8203-be611ab3ea13/logStart"
    let body = { schemaVersion: "2.0" }

    fetch(apiUrl, {
        body: JSON.stringify(body),
        method: 'POST',
    })
        .then(
            (result) => {
                this.setState({
                    workStarted: true,
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.props.loggedInHandler(false)
                this.setState({
                    loggedIn: false,
                    error
                });
            }
        )

    event.preventDefault();
}


stopWorkHandler = (event) =>{
    const apiUrl = "/api/user/projects/091be765-7493-426f-8203-be611ab3ea13/logEnd"
    let body = { schemaVersion: "2.0" }

    fetch(apiUrl, {
        body: JSON.stringify(body),
        method: 'POST',
    })
        .then(
            (result) => {
                this.setState({
                    workStarted: false,
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.props.loggedInHandler(false)
                this.setState({
                    loggedIn: false,
                    error
                });
            }
        )

    event.preventDefault();
}

  /** 
   * 
   * 
   * 
   * Centralize api as calls to us across components
   * 
   * Pass as props as needed
   * 
   * 
   * */
  getWorkIndex = (selectedProject) => {
    const apiUrl = "/api/projects/" + selectedProject + "/workIndex?limit=100&before=" + this.isoNow()

    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'text/application' },
      credentials: 'include',
      cache: 'default'
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ workIndex: result })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          //  this.setState({
          //      isLoaded: false,
          //      error
          //  });
          console.log(error)
        }
      )
  }


/**
 * 
 * @param {*} selectedProject 
 */
  handleSelectedProjectState = (selectedProject) => {
    // repopulate workindex
    this.getWorkIndex(selectedProject)
    this.setState({
      selectedProject: selectedProject
    })
  }

  /**
  * @param {Array} userProjects 
  */
  handleProjectsState = (userProjects) => {
    this.setState({ userProjects: userProjects })
  }

  handleProjectState = (project) => {
    console.log(project)
    //this.setState({ userProjects: userProjects })
  }

  getProjects = () => {
    const apiUrl = "/api/projects"
    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'text/application' },
      credentials: 'include',
      cache: 'default'
    }, this)
      .then(res => res.json())
      .then(
        (result) => {
          this.handleProjectsState(result)
        }, this,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // make default and entry , error to login if cookie expired
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  getProject = (projectId) => {
    const apiUrl = "/api/projects/"+projectId
    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'text/application' },
      credentials: 'include',
      cache: 'default'
    }, this)
      .then(res => res.json())
      .then(
        (result) => {
          this.handleProjectState(result)
        }, this,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  handleLoggedinState = (bool) => {
    this.setState({ loggedIn: bool })
  }


  handlePageFocus = (selected) => {
    
    switch (selected) {
      case 'login':
        this.setState({
          login: true,
          projects: false,
          tracker: false,
          revenue: false,
          auctions: false,
          dashboard: false
        })
        break;
      case 'projects':
        this.setState({
          login: false,
          projects: true,
          tracker: false,
          revenue: false,
          auctions: false,
          dashboard: false
        })
        break;
      case 'tracker':
        this.setState({
          login: false,
          projects: false,
          tracker: true,
          revenue: false,
          auctions: false,
          dashboard: false
        })
        break;
      case 'revenue':
        this.setState({
          login: false,
          projects: false,
          tracker: false,
          revenue: true,
          auctions: false,
          dashboard: false
        })
        break;
      case 'auctions':
        this.setState({
          login: false,
          projects: false,
          tracker: false,
          revenue: false,
          auctions: true,
          dashboard: false
        })
        break;
      case 'dashboard':
        this.setState({
          login: false,
          projects: false,
          tracker: false,
          revenue: false,
          auctions: false,
          dashboard: true
        })
        break;
      default:
        console.log('oopsie doopsie!');

    }

  }

  getPage = () => {
    if (this.state.login) {
      return <Login state={this.state} onClickHandler={this.handlePageFocus} loggedIn={this.state.loggedIn} loggedInHandler={this.handleLoggedinState} />;
    } else if (this.state.projects) {
      return <Projects />;
    } else if (this.state.revenue) {
      return <Revenue />;
    } else if (this.state.tracker) {
      return <Tracker workIndex={this.state.workIndex}
        projects={this.state.userProjects}
        selectedProject={this.state.selectedProject}
        handleSelectedProjectState={this.handleSelectedProjectState}
        startWorkHandler={this.startWorkHandler}
        stopWorkHandler={this.stopWorkHandler}
        workStarted={this.state.workStarted} />;
    } else if (this.state.auctions) {
      return <Auctions />;
    } else if (this.state.dashboard) {
      return <Dashboard />;
    }
  }

  componentDidMount() {
    //this.state.selectedProject !== '' && this.state.workIndex.workIndex === undefined ? this.getWorkIndex() : console.log(this.state.workIndex.workIndex)
    //this.state.projects.projects === undefined ? this.getProjects() : console.log(this.state.projects.projects)
  }
  render() {
    //this.state.projects.projects === undefined ? this.getProjects() : console.log(this.state.projects.projects)
    return (
      <div className="App">
        <Header />
        <div className="app-body">
          <Tabs state={this.state} onClickHandler={this.handlePageFocus} loggedIn={this.state.loggedIn} />
          {this.getPage()}
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
