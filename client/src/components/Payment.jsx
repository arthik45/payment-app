import { useState, useEffect } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPayment, setEditedPayment] = useState({
    userid: "",
    deviceid: "",
    payment: "",
    paymentid: "",
    time: "",
  });
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/payments")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  const validatePayment = (payment) => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const numberRegex = /^\d+(\.\d{1,2})?$/;
  
    const userid = String(payment.userid || "").trim();
    const deviceid = String(payment.deviceid || "").trim();
    const payAmount = String(payment.payment || "").trim();
    const paymentid = String(payment.paymentid || "").trim();
    const time = String(payment.time || "").trim();
  
    if (!userid) {
      errors.userid = "User ID is required.";
    } else if (!emailRegex.test(userid)) {
      errors.userid = "Invalid email format.";
    }
  
    if (!deviceid) {
      errors.deviceid = "Device ID is required.";
    }
  
    if (!payAmount) {
      errors.payment = "Payment amount is required.";
    } else if (!numberRegex.test(payAmount)) {
      errors.payment = "Payment must be a number.";
    }
  
    if (!paymentid) {
      errors.paymentid = "Payment ID is required.";
    }
  
    if (!time) {
      errors.time = "Time is required.";
    }
  
    return errors;
  };
  

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPayment({ ...editedPayment, [name]: value });
  };

  const handleSaveEdit = (id) => {
    const validationErrors = validatePayment(editedPayment);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }

    axios
      .put(`http://localhost:5000/payments/${id}`, editedPayment)
      .then((res) => {
        const updated = res.data;
        setPayments(payments.map((p) => (p._id === id ? updated : p)));
        setEditingId(null);
      })
      .catch((err) => console.error("Error updating payment:", err));
  };

  const handleDelete = (id) => {
    console.log("Deleting payment ID:", id); // Debug
    axios.delete(`http://localhost:5000/payments/${id}`)
      .then(() => setPayments(payments.filter(p => p._id !== id)))
      .catch(err => console.error('Error deleting payment:', err));
  };
  return (
    <div className="container table-wrapper">
      <h2>Payment Page</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>User ID</th>
            <th>Device ID</th>
            <th>Payment</th>
            <th>Payment ID</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              {editingId === payment._id ? (
                <>
                  <td>
                    <input
                      name="userid"
                      value={editedPayment.userid}
                      onChange={handleEditInputChange}
                      placeholder="User ID (email)"
                    />
                    {editErrors.userid && <div className="error">{editErrors.userid}</div>}
                  </td>
                  <td>
                    <input
                      name="deviceid"
                      value={editedPayment.deviceid}
                      onChange={handleEditInputChange}
                      placeholder="Device ID"
                    />
                    {editErrors.deviceid && <div className="error">{editErrors.deviceid}</div>}
                  </td>
                  <td>
                    <input
                      name="payment"
                      value={editedPayment.payment}
                      onChange={handleEditInputChange}
                      placeholder="Payment"
                    />
                    {editErrors.payment && <div className="error">{editErrors.payment}</div>}
                  </td>
                  <td>
                    <input
                      name="paymentid"
                      value={editedPayment.paymentid}
                      onChange={handleEditInputChange}
                      placeholder="Payment ID"
                    />
                    {editErrors.paymentid && <div className="error">{editErrors.paymentid}</div>}
                  </td>
                  <td>
                    <input
                      name="time"
                      value={editedPayment.time}
                      onChange={handleEditInputChange}
                      placeholder="Time"
                    />
                    {editErrors.time && <div className="error">{editErrors.time}</div>}
                  </td>
                  <td>
                    <button className="btn btn-save" onClick={() => handleSaveEdit(payment._id)}>
                      Save
                    </button>
                    <button className="btn btn-cancel" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{payment.userid}</td>
                  <td>{payment.deviceid}</td>
                  <td>{payment.payment}</td>
                  <td>{payment.paymentid}</td>
                  <td>{payment.time}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setEditingId(payment._id);
                        setEditedPayment({ ...payment });
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(payment._id)}>
                      Delete
                    </button>
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

export default PaymentPage;
