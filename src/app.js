import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom"

import EventsManagement from "./pages/events/eventsManagement";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

const App = () => {

  return (

    <div>
    <nav>
        <Link to="/events"> Event Management </Link><br/>
        <Link to="/registration"> Registration </Link><br/>
    </nav>    
     <Routes>
       <Route exact path="/events" element={<EventsManagement />} />   
     </Routes>
    </div>
  );

}

export default App;