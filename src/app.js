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

const App = () => {

  return (

    <div>
    <nav>
        <Link to="/events"> Event Management </Link><br/>
        <Link to="/volunteers"> Volunteers Management</Link><br/>
    </nav>    
     <Routes>
       <Route exact path="/events" element={<EventsManagement />} />   
       <Route exact path="/volunteers" element={<VolunteersManagement />} />   
     </Routes>
    </div>
  );

}

export default App;