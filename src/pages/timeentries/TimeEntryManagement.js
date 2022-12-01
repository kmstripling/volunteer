import React, { useState, useEffect, Fragment} from "react";
import axios from 'axios';

import '../../assets/global.css'
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";


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

  const [editTimeEntryId, setEditTimeEntryId] = useState(null);

  const [editFormData, setEditFormData] = useState(
    {
      id:"",
      volunteer_firstname:"",
      volunteer_lastname:"",
      regdatetime: new Date(),
      time_in: new Date(),
      time_out: new Date()
    }
  );

  const handleTimeInChange = (time_in) => {

    const newFormData = { ...editFormData };
    newFormData["time_in"] = time_in;
    setEditFormData(newFormData);
  
  }
  
  const handleTimeOutChange = (time_out) => {

    const newFormData = { ...editFormData };
    newFormData["time_out"] = time_out;
    setEditFormData(newFormData);
  
  }

  const handleEditButtonClick = (event, timeentry) => {

    event.preventDefault();
    setEditTimeEntryId(timeentry.id);
    
    console.log(new Date(timeentry.time_in));
    console.log(new Date(timeentry.time_out));
  
    const formValues = {
      id: timeentry.id,
      volunteer_firstname: timeentry.volunteer_firstname,
      volunteer_lastname: timeentry.volunteer_lastname,
      regdatetime: new Date(timeentry.regdatetime),
      time_in: new Date(timeentry.time_in),
      time_out: new Date(timeentry.time_out)
    }
  
    setEditFormData(formValues);
  
  };
  
  const handleDeleteButtonClick = async (event, id) => {
    event.preventDefault();
    await axios.delete(`http://192.168.9.235:3000/timeentries/`+ id);
  
    props.refreshTimeEntries();
   
  }

  const handleCancelButtonClick = () => {
    setEditTimeEntryId(null);
  }

  const handleSaveButtonClick =  async (event) => {

    event.preventDefault();
  
    console.log(formatAppDate(editFormData.time_in));
    console.log(formatAppDate(editFormData.time_out));

    await axios.put(`http://192.168.9.235:3000/timeentries/`+ editTimeEntryId,{
      id: editFormData.id,
      time_in: formatAppDate(editFormData.time_in),
      time_out: formatAppDate(editFormData.time_out)
    });
    
    setEditTimeEntryId(null);
    props.refreshTimeEntries();
  
  }

    return(
    
  <form onSubmit={handleSaveButtonClick}>
      <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Registration Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Actions</th>
          </tr>
        </thead>
    <tbody>

      { props.timeentries?.map((timeentry) => (

        <Fragment>
          { editTimeEntryId === timeentry.id ? <EditableRow editFormData={editFormData} handleCancelButtonClick={handleCancelButtonClick} handleSaveButtonClick={handleSaveButtonClick} handleTimeInChange={handleTimeInChange} handleTimeOutChange={handleTimeOutChange}/> : <ReadOnlyRow timeentry={timeentry} handleEditButtonClick={handleEditButtonClick} handleDeleteButtonClick={handleDeleteButtonClick}/> }
          </Fragment>
      ) 
      
      )}

    </tbody>
  </table>
      </div>
  
    </form>
    )
};

const TimeEntryManagement = () => {

  const [timeentries, setTimeEntries] = useState([]);

  useEffect(() => {

    axios(`http://192.168.9.235:3000/timeentries`).then (
      result => {
        setTimeEntries(result.data);
      }
        );

  }, []);

  const refreshTimeEntries = (event_id) =>{

    axios(`http://192.168.9.235:3000/timeentries`).then (
      result => {
        setTimeEntries(result.data);
      }
        );

  } 

  return (
    <div>
      <div className="app-header">Time Entry Management</div>
      <br></br>
      <Form  timeentries={timeentries} refreshTimeEntries= {refreshTimeEntries }/>
    </div>
  );

}

export default  TimeEntryManagement;