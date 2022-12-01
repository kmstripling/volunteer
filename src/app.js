import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom"

import EventsManagement from "./pages/events/EventsManagement";
import VolunteersManagement from "./pages/volunteers/VolunteersManagement";
import RegistrationsManagement from "./pages/registrations/RegistrationsManagement";
import TimeEntry from "./pages/timeentries/TimeEntry";
import TimeEntryManagement from "./pages/timeentries/TimeEntryManagement";

const App = () => {

  return (

    <div>
    <nav>
        <Link to="/events"> Event Management </Link><br/>
        <Link to="/volunteers"> Volunteer Management</Link><br/>
        <Link to="/registrations"> Registration Management</Link><br/>
        <Link to="/timeentry"> Time Entry</Link><br/>
        <Link to="/timeentry/manager"> Time Entry Management</Link><br/>
    </nav>    
     <Routes>
       <Route exact path="/events" element={<EventsManagement />} />   
       <Route exact path="/volunteers" element={<VolunteersManagement />} />   
       <Route exact path="/registrations" element={<RegistrationsManagement />} />
       <Route exact path="/timeentry" element={<TimeEntry />} />
       <Route exact path="/timeentry/manager" element={<TimeEntryManagement />} />
     </Routes>
    </div>
  );

}

export default App;