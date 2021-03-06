// src/Tabs.js

import React from 'react';
import  '../css/tabs.css';

const Tabs = ({state,onClickHandler,loggedIn}) =>{
    console.log(state)
    return (
        <div className="container-fluid">
            <div className="row tabs">
                <div id="login" className={state.login ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('login')}>
                     {loggedIn.loggedIn===true? '':'Login'}
                </div>
                <div  id="tracker"  className={state.tracker ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('tracker')}>
                    Time Tracker
                </div>
                <div  id="tracker"  className={state.dashboard ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('dashboard')}>
                    Dashboard
                </div>
                <div id="projects"  className={state.projects ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('projects')}>
                    Projects
                </div>
                <div  id="revenue"  className={state.revenue ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('revenue')}>
                    Revenue
                </div>
                <div  id="auctions"  className={state.auctions ? 'col-md-2 selected':'col-md-2 tab'} onClick={() => onClickHandler('auctions')}>
                    Auctions
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 alert alert-danger text-center" role="alert">
                    This is a preview of coming attractions. Not all documented functionality is
                    yet publicly available. Broken links are to be expected. Check back soon.
                </div>
            </div>
        </div>
    )
}
export  default Tabs 
 