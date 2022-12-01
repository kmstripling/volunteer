import React, { useState, useEffect, Fragment} from "react";
import axios from 'axios';

import Dropdown from 'react-dropdown';

import '../../assets/global.css'
import TimeEntryRow from "./TimeEntryRow";


function formatAppDate(dateTimeString){

  const dateTime = new Date(dateTimeString)
  dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })

  return(
    dateTime.getFullYear() + "/" +
    ("0" + (dateTime.getMonth()+1)).slice(-2) + "/" +
    ("0" + dateTime.getDate()).slice(-2) + " " +
    ("0" + dateTime.getHours()).slice(-2) + ":" +
    ("0" + dateTime.getMinutes()).slice(-2) + ":" +
    ("0" + dateTime.getSeconds()).slice(-2)
  )
}

const Form = props => {

  const listEvents = props.v_events?.map( (v_event) => 
  {   
    const listEvent = {
      value: v_event.id,
      label: v_event.name + " [" + formatAppDate(v_event.startdatetime) + " - " + formatAppDate(v_event.enddatetime) + "]"
    
  } 
  
    return listEvent;

})|| [];

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [defaultEventOption, setDefaultEventOption] = useState(listEvents[selectedEventId]);

  const handleOnSelectEvent = (registration) => {
    setSelectedEventId(registration.value);
    setDefaultEventOption(listEvents[selectedEventId]);
    props.refreshRegistrations(registration.value);
    props.refreshTimeEntries(registration.value);
  };

  const handleCheckInButtonClick = async (event, registration) => {
  	event.preventDefault();

    await axios.post(`http://192.168.9.235:3000/timeentries`,{
      registration_id: registration.id
    });

    console.log("CheckIn")
    props.refreshTimeEntries(registration.event_id);

  };

  const handleCheckOutButtonClick = async (event, timeentry) => {
  	event.preventDefault();

    await axios.put(`http://192.168.9.235:3000/timeentries/` + timeentry.id,{
      id : timeentry.id,
      time_in: formatAppDate(timeentry.time_in),
      time_out: formatAppDate(new Date())
    });

    console.log("CheckOut")
    props.refreshTimeEntries(timeentry.event_id);

  };

    return(
    
    <form>
      <div>
      <label>
        Event:
        <Dropdown options={listEvents} onChange={handleOnSelectEvent} value={defaultEventOption} placeholder="Select an Event" />
      </label>
      <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Registration Date</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      { props.registrations?.map((registration) => (

          <TimeEntryRow registration={registration} timeentries={props.timeentries} handleCheckInButtonClick={handleCheckInButtonClick} handleCheckOutButtonClick={handleCheckOutButtonClick}/>
          
      ) 
      
      )}

    </tbody>
  </table>
      </div>
  
    </form>
    )
};

const TimeEntry = () => {

  const [v_events, setV_events] = useState([]);
  const [timeentries, setTimeEntries] = useState([]);
  const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
      (async () => {
        const result = await axios(`http://192.168.9.235:3000/events`);
        setV_events(result.data);
      })();
    }, []);

  const refreshRegistrations = (event_id) =>{

    axios(`http://192.168.9.235:3000/registrations?event_id=` + event_id).then (
      result => {
        setRegistrations(result.data);
      }
        );

  } 

  const refreshTimeEntries = (event_id) =>{

    axios(`http://192.168.9.235:3000/timeentries?event_id=` + event_id).then (
      result => {
        setTimeEntries(result.data);
      }
        );

  } 

  return (
    <div>
      <div className="app-header">TimeEntry</div>
      <br></br>
      <Form  v_events={v_events} timeentries={timeentries} refreshTimeEntries= {refreshTimeEntries }registrations={registrations} refreshRegistrations={refreshRegistrations}/>
    </div>
  );

}

export default  TimeEntry;