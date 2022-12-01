import React, {Fragment} from "react";

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'

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

const EditableRow = ({editFormData, handleCancelButtonClick, handleTimeInChange, handleTimeOutChange }) => {

    return (

    <Fragment>  
        <tr>
          <td>{editFormData.volunteer_firstname}</td>
          <td>{editFormData.volunteer_lastname}</td>
          <td>{formatAppDate(editFormData.regdatetime)}</td>
          <td>
            <DateTimePicker onChange={handleTimeInChange}  value={ new Date(editFormData.time_in)} disableClock={true} />
            </td>
            <td>
            <DateTimePicker onChange={handleTimeOutChange}  value={ new Date(editFormData.time_out)} disableClock={true} />
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
        </Fragment>

    )

}

export default EditableRow;