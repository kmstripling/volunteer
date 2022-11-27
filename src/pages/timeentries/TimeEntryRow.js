import React from "react";

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

const TimeEntryRow = ({ timeentry }) => {

    return (

        <tr>
          <td>{timeentry.volunteer_firstname}</td>
          <td>{timeentry.volunteer_lastname}</td>
          <td>{formatAppDate(timeentry.time_in)}</td>
          <td>{formatAppDate(timeentry.time_out)}</td>
          <td></td>
        </tr>

    )

}

export default TimeEntryRow;