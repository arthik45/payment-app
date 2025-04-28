import { useState, useEffect } from "react";
import axios from "axios";
import './style.css';



const CustomerPage = () => {
  const [users, setusers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
  });

  const [editedCustomer, setEditedCustomer] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
  });
const [errors, setErrors] = useState({});
const [editErrors, setEditErrors] = useState({});


  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then(response => {
        setusers(response.data);
      })
      .catch(err => {
        console.error("Error fetching customers:", err);
      });
  }, []);

  const validateCustomer = (customer) => {
    const errors = {};
  
    
    const nameRegex = /^[A-Za-z\s'-]+$/;
  
    if (!customer.firstname.trim()) {
      errors.firstname = "First name is required.";
    } else if (!nameRegex.test(customer.firstname)) {
      errors.firstname = "First name must contain only letters.";
    }
  
    if (!customer.lastname.trim()) {
      errors.lastname = "Last name is required.";
    } else if (!nameRegex.test(customer.lastname)) {
      errors.lastname = "Last name must contain only letters.";
    }
  
    if (!customer.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      errors.email = "Invalid email format.";
    }
  
    if (customer.phonenumber && !/^\d{10}$/.test(customer.phonenumber)) {
      errors.phonenumber = "Phone must be 10 digits.";
    }
  
    return errors;
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleAddCustomer = () => {
    if (!newCustomer.firstname || !newCustomer.lastname || !newCustomer.email) {
      alert("Please fill all required fields.");
      return;
    }
    const validationErrors = validateCustomer(newCustomer);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    axios.post("http://localhost:5000/customers", newCustomer)
      .then(response => {
        const added = response.data;
  
        setusers([...users, added]);
  
        setNewCustomer({
          firstname: "",
          lastname: "",
          phonenumber: "",
          email: ""
        });
  
        setAdding(false);
  
        // Optional: highlight the added row
        setNewlyAddedId(added._id);
        setTimeout(() => setNewlyAddedId(null), 2000);
      })
      .catch(err => {
        console.error("Error adding customer:", err);
      });
  };
  
  

  const handleSaveEdit = (id) => {
    const validationErrors = validateCustomer(editedCustomer);
  if (Object.keys(validationErrors).length > 0) {
    setEditErrors(validationErrors);
    return;
  }
    axios.put(`http://localhost:5000/customers/${id}`, editedCustomer)
      .then(response => {
        console.log("Updated successfully:", response.data);
        const updatedUsers = users.map(user =>
          user._id === id ? response.data : user
        );
        setusers(updatedUsers);
        setEditingId(null);
      })
      .catch(err => {
        console.error("Error updating customer:", err.response?.data || err.message);
      });
  };
  

  const handleDeleteCustomer = (id) => {
    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => {
        setusers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.error("Error deleting customer:", err);
      });
  };
  

  return (
    <div className="container table-wrapper">
      <button className="add" onClick={() => setAdding(true)}>
      <span className="add-text">Add customer</span>
      <span className="add-icon">+</span>
      </button>
      <h2>Customer Page</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date/Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adding && (
            <tr>
              <td>{users.length + 1}</td>
              <td><input name="firstname" type="text" value={newCustomer.firstname} onChange={handleInputChange} />{errors.firstname && <div className="error">{errors.firstname}</div>}</td>
              <td><input name="lastname" type="text" value={newCustomer.lastname} onChange={handleInputChange} />{errors.lastname && <div className="error">{errors.lastname}</div>}</td>
              <td><input name="phonenumber" type="number" value={newCustomer.phonenumber} onChange={handleInputChange} /> {errors.phonenumber && <div className="error">{errors.phonenumber}</div>}</td>
              <td><input name="email" type="email" value={newCustomer.email} onChange={handleInputChange} />{errors.email && <div className="error">{errors.email}</div>}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>
                <button className="btn btn-save"  onClick={handleAddCustomer}>Save</button>
                <button className="btn btn-cancel" onClick={() => setAdding(false)}>Cancel</button>
              </td>
            </tr>
          )}

          {users.map((user, index) => (
            <tr
              key={user._id}
              className={user._id === newlyAddedId ? "highlight" : ""}
            >
              <td>{index + 1}</td>

              {editingId === user._id ? (
                <>
                  <td><input name="firstname" value={editedCustomer.firstname} onChange={handleEditInputChange} />{editErrors.firstname && <div className="error">{editErrors.firstname}</div>}</td>
                  <td><input name="lastname" value={editedCustomer.lastname} onChange={handleEditInputChange} />{editErrors.lastname && <div className="error">{editErrors.lastname}</div>}</td>
                  <td><input name="phonenumber" value={editedCustomer.phonenumber} onChange={handleEditInputChange} /> {editErrors.phonenumber && <div className="error">{editErrors.phonenumber}</div>}</td>
                  <td><input name="email" value={editedCustomer.email} onChange={handleEditInputChange} /> {editErrors.email && <div className="error">{editErrors.email}</div>}</td>
                  <td>{user.regtimestamp ? new Date(user.regtimestamp).toLocaleString() : "-"}</td>
                  <td>
                    <button className="btn btn-save"  onClick={() => handleSaveEdit(user._id)}>Save</button>
                    <button className="btn btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.email}</td>
                  <td>{user.regtimestamp ? new Date(user.regtimestamp).toLocaleString() : "-"}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => {
                      setEditingId(user._id);
                      setEditedCustomer({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phonenumber: user.phonenumber,
                        email: user.email
                      });
                    }}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteCustomer(user._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPage;
