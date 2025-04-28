import { useState, useEffect } from "react";
import axios from "axios";


const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  const [newStock, setNewStock] = useState({
    stockname: "",
    price: "",
  });

  const [editedStock, setEditedStock] = useState({
    stockname: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/stocks")
      .then(res => setStocks(res.data))
      .catch(err => console.error("Error fetching stocks:", err));
  }, []);

  const validateStock = (stock) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!stock.stockname.trim()) {
      errors.stockname = "Stock name is required.";
    } else if (!nameRegex.test(stock.stockname)) {
      errors.stockname = "Only letters allowed.";
    }

    if (!stock.price.trim()) {
      errors.price = "Price is required.";
    } else if (!priceRegex.test(stock.price)) {
      errors.price = "Enter valid price.";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStock({ ...editedStock, [name]: value });
  };

  const handleAddStock = () => {
    const validationErrors = validateStock(newStock);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post("http://localhost:5000/stocks", newStock)
      .then(response => {
        const added = response.data;
        setStocks([...stocks, added]);
        setNewStock({ stockname: "", price: "" });
        setAdding(false);
        setNewlyAddedId(added._id);
        setTimeout(() => setNewlyAddedId(null), 2000);
      })
      .catch(err => console.error("Error adding stock:", err));
  };

  const handleSaveEdit = (id) => {
    const validationErrors = validateStock(editedStock);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:5000/stocks/${id}`, editedStock)
      .then(response => {
        const updated = response.data;
        setStocks(stocks.map(s => s._id === id ? updated : s));
        setEditingId(null);
      })
      .catch(err => console.error("Error updating stock:", err));
  };

  const handleDeleteStock = (id) => {
    axios.delete(`http://localhost:5000/stocks/${id}`)
      .then(() => {
        setStocks(stocks.filter(s => s._id !== id));
      })
      .catch(err => console.error("Error deleting stock:", err));
  };

  return (
    <div className="container table-wrapper">
      <button className="add" onClick={() => setAdding(true)}>
      <span className="add-text">Add stock</span>
      <span className="add-icon">+</span>
      </button>
      <h2>Stock Page</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adding && (
            <tr>
              <td>{stocks.length + 1}</td>
              <td>
                <input name="stockname" value={newStock.stockname} onChange={handleInputChange} />
                {errors.stockname && <div className="error">{errors.stockname}</div>}
              </td>
              <td>
                <input name="price" value={newStock.price} onChange={handleInputChange} />
                {errors.price && <div className="error">{errors.price}</div>}
              </td>
              <td>
                <button className="btn btn-save" onClick={handleAddStock}>Save</button>
                <button className="btn btn-cancel" onClick={() => setAdding(false)}>Cancel</button>
              </td>
            </tr>
          )}

          {stocks.map((stock, index) => (
            <tr key={stock._id} className={stock._id === newlyAddedId ? "highlight" : ""}>
              <td>{index + 1}</td>
              {editingId === stock._id ? (
                <>
                  <td>
                    <input name="stockname" value={editedStock.stockname} onChange={handleEditInputChange} />
                    {editErrors.stockname && <div className="error">{editErrors.stockname}</div>}
                  </td>
                  <td>
                    <input name="price" value={editedStock.price} onChange={handleEditInputChange} />
                    {editErrors.price && <div className="error">{editErrors.price}</div>}
                  </td>
                  <td>
                    <button className="btn btn-save" onClick={() => handleSaveEdit(stock._id)}>Save</button>
                    <button className="btn btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{stock.stockname}</td>
                  <td>{stock.price}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => {
                      setEditingId(stock._id);
                      setEditedStock({ stockname: stock.stockname, price: stock.price });
                    }}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteStock(stock._id)}>Delete</button>
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

export default Stock;
