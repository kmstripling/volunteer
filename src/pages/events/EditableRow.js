import React from "react";

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'

function formatAppDate(dateTimeString){

    const dateTime = new Date(dateTimeString)

    return(
      dateTime.getFullYear() + "/" +
      ("0" + (dateTime.getMonth()+1)).slice(-2) + "/" +
      ("0" + dateTime.getDate()).slice(-2) + " " +
      ("0" + dateTime.getHours()).slice(-2) + ":" +
      ("0" + dateTime.getMinutes()).slice(-2) + ":" +
      ("0" + dateTime.getSeconds()).slice(-2)
    )
  }

const EditabledRow = ({ editFormData, handleEditFormChange,  handleCancelButtonClick, handleStartDateChange, handleEndDateChange }) => {

    return (

        <tr>
          <td>
            <input
                type="text"
                required="required"
                placeholder= "Enter Name"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
            ></input>
            </td>
            <td>
            <DateTimePicker onChange={handleStartDateChange}  value={ new Date(editFormData.startdatetime)} disableClock={true} />
            {/* <input
                type="text"
                required="required"
                placeholder= "Enter Start Date"
                name="startdatetime"
                value={ formatAppDate(editFormData.startdatetime)}
                onChange={handleEditFormChange}
            ></input> */}
            </td>
            <td>
            <DateTimePicker onChange={handleEndDateChange}  value={ new Date(editFormData.enddatetime)} disableClock={true} />
            {/* <input
                type="text"
                required="required"
                placeholder= "Enter end Date"
                name="enddatetime"
                value={ formatAppDate(editFormData.enddatetime)}
                onChange={handleEditFormChange}
            ></input> */}
            </td>
            <td>
                <button type ="submit">
                    Save
                </button>
                <button type ="button" onClick={(event) => handleCancelButtonClick()}>
                    Cancel
                </button>
            </td>
        </tr>

    )

}

export default EditabledRow;