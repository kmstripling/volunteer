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

const App = () => {

  return (

    <div>
    <nav>
        <Link to="/events"> Event Management </Link><br/>
        <Link to="/volunteers"> Volunteer Management</Link><br/>
        <Link to="/registrations"> Registration Management</Link><br/>
    </nav>    
     <Routes>
       <Route exact path="/events" element={<EventsManagement />} />   
       <Route exact path="/volunteers" element={<VolunteersManagement />} />   
       <Route exact path="/registrations" element={<RegistrationsManagement />} />   
     </Routes>
    </div>
  );

}

export default App;