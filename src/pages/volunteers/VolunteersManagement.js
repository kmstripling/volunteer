import React, { useState, useEffect, Fragment} from "react";
import axios from 'axios';

import '../../assets/global.css'
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Form = props => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = async (event) => {
  	event.preventDefault();

    await axios.post(`http://192.168.9.235:3000/persons`,{
      firstname: firstname,
      lastname: lastname
    });

    setFirstname('');
    setLastname('');

    props.refreshVolunteers();
  
  };


    return(
    
    <form onSubmit={handleSubmit}>
      <div>
    <label>
      First Name:
        <input 
          type="text" 
          value ={firstname}
          onChange={event => setFirstname(event.target.value)}
          placeholder="First Name" 
          required 
          />
      </label>
      </div>
      <br/>
      <div>
    <label>
      Last Name:
        <input 
          type="text" 
          value ={lastname}
          onChange={event => setLastname(event.target.value)}
          placeholder="Last Name" 
          required 
          />
      </label>
      </div>
      <br/>
      
      <button>Add Volunteer</button>
    </form>
    )
}

const Table = props => {

  const [editContactId, setEditContactId] = useState(null);

  const [editFormData, setEditFormData] = useState(
    {
      id:"",
      firstname:"",
      lastname:""
    }
  );

  const handleEditClick = (event, volunteer) => {

    event.preventDefault();
    setEditContactId(volunteer.id);
    
    const formValues = {
      id: volunteer.id,
      firstname: volunteer.firstname,
      lastname: volunteer.lastname,

    }
  
    setEditFormData(formValues);
  
  };

  const handleEditFormChange = (event) => {

    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
  
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  
  };

  const handleSaveButtonClick =  async (event) => {

    event.preventDefault();
  
    await axios.put(`http://192.168.9.235:3000/persons/`+ editFormData.id,{
      id: editFormData.id,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname
    });
    
    setEditContactId(null);
    props.refreshVolunteers();
  
  }

  const handleDeleteButtonClick = async (event, id) => {
    event.preventDefault();
    await axios.delete(`http://192.168.9.235:3000/persons/`+ id);
  
    props.refreshVolunteers();
   
  }

  const handleCancelButtonClick = () => {
    setEditContactId(null);
  }

return(
<div className="app-container">
<form onSubmit={handleSaveButtonClick}>
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.volunteers.map((volunteer) => (
        <Fragment>
          {editContactId === volunteer.id ? <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelButtonClick={handleCancelButtonClick} />: <ReadOnlyRow volunteer={volunteer} handleEditClick = {handleEditClick} handleDeleteButtonClick={handleDeleteButtonClick} /> }
        </Fragment>
      ))}
    </tbody>
  </table>
  </form>
</div>
);

}


const VolunteersManagement = () => {

  const [volunteers, set_volunteers] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(`http://192.168.9.235:3000/persons`);
      set_volunteers(result.data);
    })();
  }, []);


  const refreshVolunteers = () =>
  {

   axios(`http://192.168.9.235:3000/persons`).then (
    result => {
        set_volunteers(result.data);
    }
      );

  }

  return (
    <div>
      <div className="app-header">Volunteer Management</div>
      <br></br>

      <Form refreshVolunteers={refreshVolunteers} />
      <Table refreshVolunteers={refreshVolunteers} volunteers={volunteers}/>

    </div>
  );

}

export default  VolunteersManagement;