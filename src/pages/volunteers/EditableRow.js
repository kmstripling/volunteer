import React from "react";


const EditabledRow = ({ editFormData, handleEditFormChange,  handleCancelButtonClick }) => {

    return (

        <tr>
          <td>
            <input
                type="text"
                required="required"
                placeholder= "Enter First Name"
                name="firstname"
                value={editFormData.firstname}
                onChange={handleEditFormChange}
            ></input>
            </td>
            <td>
            <input
                type="text"
                required="required"
                placeholder= "Enter Last Name"
                name="lastname"
                value={editFormData.lastname}
                onChange={handleEditFormChange}
            ></input>
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