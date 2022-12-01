import React, {Fragment} from "react";

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

const ReadOnlyRow = ({ timeentry, handleEditButtonClick, handleDeleteButtonClick }) => {

    return (

    <Fragment>  
        <tr>
          <td>{timeentry.volunteer_firstname}</td>
          <td>{timeentry.volunteer_lastname}</td>
          <td>{formatAppDate(timeentry.regdatetime)}</td>
          <td>{formatAppDate(timeentry.time_in)}</td>
          <td>{formatAppDate(timeentry.time_out)}</td>
          <td>
            <button type ="button" onClick={(event) => handleEditButtonClick(event, timeentry)}>
                Edit
                </button>

                <button type ="button" onClick={(event) => handleDeleteButtonClick(event, timeentry.id)}>
                    Delete
                </button>

          </td>
        </tr>
        </Fragment>

    )

}

export default ReadOnlyRow;