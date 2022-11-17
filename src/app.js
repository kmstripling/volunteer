import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'

import './app.css'
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";

function formatAppDate(dateTimeString){

  return(
    dateTimeString.getUTCFullYear() + "/" +
    ("0" + (dateTimeString.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + dateTimeString.getUTCDate()).slice(-2) + " " +
    ("0" + dateTimeString.getUTCHours()).slice(-2) + ":" +
    ("0" + dateTimeString.getUTCMinutes()).slice(-2) + ":" +
    ("0" + dateTimeString.getUTCSeconds()).slice(-2)
  )
}

const Form = props => {

  const [name, setName] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const handleSubmit = async (event) => {
  	event.preventDefault();

    console.log(name);
    console.log(startDateTime);
    console.log(endDateTime);
    
    await axios.post(`http://192.168.9.235:3000/events`,{
      name: name,
      startdatetime: formatAppDate(startDateTime),
      enddatetime: formatAppDate(endDateTime)
    });

    setName('');
    setStartDateTime(new Date());
    setEndDateTime(new Date());

    props.refreshEvents();
  
  };

    return(
    
    <form onSubmit={handleSubmit}>
      <div>
    <label>
      Event Name:
        <input 
          type="text" 
          value ={name}
          onChange={event => setName(event.target.value)}
          placeholder="Event Name" 
          required 
          />
      </label>
      </div>
      <br/>
      <div>
      <div>
        <label>
          Start Date/Time:
          <DateTimePicker onChange={setStartDateTime} value={startDateTime} disableClock={true} />
          {/* <Calendar onChange={setStartDateTime} value={startDateTime} />             */}
        </label>
      </div>
      <>
        <label>
          End Date/Time:
          <DateTimePicker onChange={setEndDateTime} value={endDateTime} disableClock={true}/>
          {/* <Calendar onChange={setEndDateTime} value={endDateTime} />   */}
        </label>
      </>
      </div>
      <br/>
      <button>Add New Event</button>
    </form>
    )
}

const Table = props => {

  const [editContactId, setEditContactId] = useState(null);

  const [editFormData, setEditFormData] = useState(
    {
      id:"",
      name:"",
      startdatetime: new Date(),
      enddatetime: new Date()
    }
  );

const handleEditClick = (event, v_event) => {

  event.preventDefault();
  setEditContactId(v_event.id);
  
  console.log(new Date(v_event.startdatetime));
  console.log(new Date(v_event.enddatetime));

  const formValues = {
    id: v_event.id,
   name: v_event.name,
   startdatetime: new Date(v_event.startdatetime),
   enddatetime: new Date(v_event.enddatetime)
  }

  setEditFormData(formValues);

};

const handleEditFormChange = (event) => {

  event.preventDefault();
  const fieldName = event.target.getAttribute("name");
  const fieldValue = event.target.value;

  //Write Logic to put update
  const newFormData = { ...editFormData };
  newFormData[fieldName] = fieldValue;
  setEditFormData(newFormData);

};

const handleStartDateChange = (startdatetime) => {

  const newFormData = { ...editFormData };
  newFormData["startdatetime"] = startdatetime;
  setEditFormData(newFormData);

}

const handleEndDateChange = (enddatetime) => {

  const newFormData = { ...editFormData };
  newFormData["enddatetime"] = enddatetime;
  setEditFormData(newFormData);

}

const handleSaveButtonClick =  async (event) => {

  event.preventDefault();

  console.log(editFormData.id);
  console.log(editFormData.name);
  console.log(formatAppDate(editFormData.startdatetime));
  console.log(formatAppDate(editFormData.enddatetime));
  
  await axios.put(`http://192.168.9.235:3000/events/`+ editFormData.id,{
    id: editFormData.id,
    name: editFormData.name,
    startdatetime: formatAppDate(editFormData.startdatetime),
    enddatetime: formatAppDate(editFormData.enddatetime)
  });
  
  setEditContactId(null);
  props.refreshEvents();

}

const handleDeleteButtonClick = async (event, id) => {
  event.preventDefault();
  await axios.delete(`http://192.168.9.235:3000/events/`+ id);

  props.refreshEvents();
 
}

const handleCancelButtonClick = () => {
  setEditContactId(null);
}

return(
<div className="app-container">
<form onSubmit={handleSaveButtonClick}>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Start Date/Time</th>
        <th>End Date/Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.v_events.map((v_event) => (
        <Fragment>
          {editContactId === v_event.id ? <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelButtonClick={handleCancelButtonClick} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange}/>: <ReadOnlyRow v_event={v_event} handleEditClick={handleEditClick} handleDeleteButtonClick={handleDeleteButtonClick}/> }
        </Fragment>
      ))}
    </tbody>
  </table>
  </form>
</div>
);
}

const App = () => {

  const [v_events, setV_events] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(`http://192.168.9.235:3000/events`);
      setV_events(result.data);
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

  return (
    <div>
      <div className="app-header">Event Management</div>
      <br></br>

      <Form refreshEvents={refreshEvents}/>
      <Table refreshEvents={refreshEvents} v_events={v_events} setV_events={setV_events}/>

    </div>
  );

}

export default App;