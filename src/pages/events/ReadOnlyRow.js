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

const ReadOnlyRow = ({ v_event, handleEditClick, handleDeleteButtonClick }) => {

    return (

        <tr>
          <td>{v_event.name}</td>
          <td>{formatAppDate(v_event.startdatetime)}</td>
          <td>{formatAppDate(v_event.enddatetime)}</td>
          <td>
            <button type ="button" onClick={(event) => handleEditClick(event, v_event)}>
                Edit
                </button>

                <button type ="button" onClick={(event) => handleDeleteButtonClick(event, v_event.id)}>
                    Delete
                </button>

          </td>
        </tr>

    )

}

export default ReadOnlyRow;