import React, { useState, useEffect, Fragment} from "react";
import axios from 'axios';

import Dropdown from 'react-dropdown';

import ReadOnlyRow from "./ReadOnlyRow";
import 'react-dropdown/style.css'
import '../../assets/global.css'

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



//  <li key={v_event.id} value={v_event.name + " [" + formatAppDate(v_event.startdatetime) + " - " + formatAppDate(v_event.enddatetime) + "]"} />

const Form = props => {

  const listEvents = props.v_events?.map( (v_event) => 
  {   
    const listEvent = {
      value: v_event.id,
      label: v_event.name + " [" + formatAppDate(v_event.startdatetime) + " - " + formatAppDate(v_event.enddatetime) + "]"
    
  } 
  
    return listEvent;

})|| [];

const listVolunteers = props.volunteers?.map( (volunteer) => 
{   
  const listVolunteer = {
    value: volunteer.id,
    label: volunteer.lastname + ", " + volunteer.firstname
  
}

  return listVolunteer;

}) || [];

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [defaultEventOption, setDefaultEventOption] = useState(listEvents[selectedEventId]);
  const [defaultVolunteerOption,setDefaultVolunteerOption] = useState(listVolunteers[selectedVolunteerId]);

  const handleOnSelectEvent = (registration) => {
    setSelectedEventId(registration.value);
    setSelectedVolunteerId(null);

    setDefaultEventOption(listEvents[selectedEventId]);
    setDefaultVolunteerOption(listVolunteers[selectedVolunteerId]);

    props.refreshRegistrations(registration.value);
  };

  const handleOnSelectVolunteer = (volunteer) => {
    setSelectedVolunteerId(volunteer.value);
  };

  const handleSubmit = async (event) => {
  	event.preventDefault();

    await axios.post(`http://192.168.9.235:3000/registrations`,{
      event_id: selectedEventId,
      volunteer_id: selectedVolunteerId
    });

    props.refreshRegistrations(selectedEventId);

    setSelectedVolunteerId(null);
    setDefaultVolunteerOption(listVolunteers[selectedVolunteerId]);
  
  };

  const handleDeleteButtonClick = async (event, id) => {
    event.preventDefault();
    await axios.delete(`http://192.168.9.235:3000/registrations/`+ id);
  
    props.refreshRegistrations(selectedEventId);

    //setSelectEventId(null); #Let the Event Stay Selected
    setSelectedVolunteerId(null);

    setDefaultEventOption(listEvents[selectedEventId]);
    setDefaultVolunteerOption(listVolunteers[selectedVolunteerId]);

  }

    return(
    
    <form onSubmit={handleSubmit}>
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
        <Fragment>
          {  <ReadOnlyRow registration={registration} handleDeleteButtonClick={handleDeleteButtonClick}/> }
        </Fragment>
      ) 
      
      )}

    </tbody>

  </table>
  <label>
        Add Volunteer:
        <Dropdown options={listVolunteers} onChange={handleOnSelectVolunteer} value={defaultVolunteerOption} placeholder="Select an Volunteer" />

      </label>
        <button type="onsubmit">Add Registration</button>
      </div>
  
    </form>
    )
};

const RegistrationManagement = () => {

  const [v_events, setV_events] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [volunteers, set_volunteers] = useState([]);

  useEffect(() => {
    
    (async () => {
      const result = await axios(`http://192.168.9.235:3000/events`);
      setV_events(result.data);
    })();

    (async () => {
      const result = await axios(`http://192.168.9.235:3000/persons`);
      set_volunteers(result.data);
    })();

  }, []);

  const refreshEvents = () =>
  {

   axios(`http://192.168.9.235:3000/events`).then (
    result => {
        setV_events(result.data);
    }
      );

  }

  const refreshRegistrations = (event_id) =>{

    axios(`http://192.168.9.235:3000/registrations?event_id=` + event_id).then (
      result => {
        setRegistrations(result.data);
      }
        );

  } 

  const refreshVolunteers = (event_id) =>{

    (async () => {
      const result = await axios(`http://192.168.9.235:3000/persons`);
      set_volunteers(result.data);
    })();

  } 

  return (
    <div>
      <div className="app-header">Registration Management</div>
      <br></br>
      <Form  v_events={v_events} registrations={registrations} refreshRegistrations={refreshRegistrations} volunteers={volunteers} refreshVolunteers={refreshVolunteers}/>
    </div>
  );

}

export default  RegistrationManagement;