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

const ReadOnlyRow = ({ registration, handleDeleteButtonClick }) => {

    return (

        <tr>
          <td>{registration.volunteer_firstname}</td>
          <td>{registration.volunteer_lastname}</td>
          <td>{formatAppDate(registration.regdatetime)}</td>
          <td>
          <button type ="button" onClick={(event) => handleDeleteButtonClick(event, registration.id)}>
                    Delete
                </button>

          </td>
        </tr>

    )

}

export default ReadOnlyRow;