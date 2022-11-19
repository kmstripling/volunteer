import React from "react";

const ReadOnlyRow = ({ volunteer, handleEditClick, handleDeleteButtonClick }) => {

    return (

        <tr>
          <td>{volunteer.firstname}</td>
          <td>{volunteer.lastname}</td>
          <td>
          <button type ="button" onClick={(event) => handleEditClick(event, volunteer)}>
                Edit
                </button>

                <button type ="button" onClick={(event) => handleDeleteButtonClick(event,volunteer.id)}>
                    Delete
                </button>

          </td>
        </tr>

    )

}

export default ReadOnlyRow;