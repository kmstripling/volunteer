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

const TimeEntryRow = ({ registration, timeentries, handleCheckInButtonClick, handleCheckOutButtonClick }) => {

  const registrationTimeEntries = timeentries?.filter(timeentry => timeentry.volunteer_id === registration.volunteer_id && timeentry.registration_id === registration.id && timeentry.time_out === "0001-01-01T00:00:00Z")
  const numRows = registrationTimeEntries?.length

  const CheckInButton = props => {

    return (
    
      <button type ="button" onClick={(event) => handleCheckInButtonClick(event, registration)}>
      Check In
    </button>
    
    )
    
    };

    const CheckOutButton = props => {

      return (
      
        <button type ="button" onClick={(event) => handleCheckOutButtonClick(event, registrationTimeEntries[0])}>
        Check Out
      </button>
      
      )
      
      };

    return (

    <Fragment>  
        <tr>
          <td>{registration.volunteer_firstname}</td>
          <td>{registration.volunteer_lastname}</td>
          <td>{formatAppDate(registration.regdatetime)}</td>
          <td>

          { numRows > 0 ?  <CheckOutButton registration={registration}/> : <CheckInButton registration={registration}/>}

          </td>
        </tr>
        </Fragment>

    )

}

export default TimeEntryRow;