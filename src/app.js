import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom"

import EventsManagement from "./pages/events/eventsManagement";
import VolunteersManagement from "./pages/volunteers/volunteersManagement";
import RegistrationsManagement from "./pages/registrations/registrationsManagement";
import TimeEntry from "./pages/timeentries/timeEntry";

const App = () => {

  return (

    <div>
    <nav>
        <Link to="/events"> Event Management </Link><br/>
        <Link to="/volunteers"> Volunteer Management</Link><br/>
        <Link to="/registrations"> Registration Management</Link><br/>
        <Link to="/timeentry"> Time Entry</Link><br/>
    </nav>    
     <Routes>
       <Route exact path="/events" element={<EventsManagement />} />   
       <Route exact path="/volunteers" element={<VolunteersManagement />} />   
       <Route exact path="/registrations" element={<RegistrationsManagement />} />
       <Route exact path="/timeentry" element={<TimeEntry />} />
     </Routes>
    </div>
  );

}

export default App;