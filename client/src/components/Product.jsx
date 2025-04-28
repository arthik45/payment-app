import { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [newProduct, setNewProduct] = useState({
    devicename: "",
    deviceid: "",
    userid: "",
    version: "",
  });

  const [editedProduct, setEditedProduct] = useState({
    devicename: "",
    deviceid: "",
    userid: "",
    version: "",
  });

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const validateProduct = (product) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /\S+@\S+\.\S+/;

    const trimmed = {
      devicename: String(product.devicename || "").trim(),
      deviceid: String(product.deviceid || "").trim(),
      userid: String(product.userid || "").trim(),
      version: String(product.version || "").trim(),
    };
    

    if (!trimmed.devicename) {
      errors.devicename = "Product name is required.";
    } else if (!nameRegex.test(trimmed.devicename)) {
      errors.devicename = "Product name must contain letters only.";
    }

    if (!trimmed.deviceid) {
      errors.deviceid = "Device ID is required.";
    } else if (!numberRegex.test(trimmed.deviceid)) {
      errors.deviceid = "Device ID must contain numbers only.";
    }

    if (!trimmed.userid) {
      errors.userid = "User ID is required.";
    } else if (!emailRegex.test(trimmed.userid)) {
      errors.userid = "Invalid email format.";
    }

    if (!trimmed.version) {
      errors.version = "Version is required.";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleAddProduct = () => {
    const validationErrors = validateProduct(newProduct);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    axios
      .post("http://localhost:5000/products", newProduct)
      .then((response) => {
        const added = response.data;
        setProducts([...products, added]);
        setNewProduct({ devicename: "", deviceid: "", userid: "", version: "" });
        setAdding(false);
        setNewlyAddedId(added._id);
        setTimeout(() => setNewlyAddedId(null), 2000);
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        console.error("Error response:", err.response);
      })
      .finally(() => setIsSaving(false));
  };

  
  const handleSaveEdit = (id) => {
    const validationErrors = validateProduct(editedProduct); 
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    console.log("Saving edited product:", editedProduct);
    axios
      .put(`http://localhost:5000/products/${id}`, editedProduct)
      .then((response) => {
        const updatedProduct = response.data;
        setProducts(products.map((p) => (p._id === id ? updatedProduct : p)));
        setEditingId(null);
        setEditedProduct({ devicename: "", deviceid: "", userid: "", version: "" });
        setNewlyAddedId(updatedProduct._id);  
      })
      .catch((err) => {
        console.error("Error updating product:", err);  
        console.error("Error response:", err.response);
      });
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className="container table-wrapper">
      <button className="add" onClick={() => setAdding(true)}>
        <span className="add-text">Add Product</span>
        <span className="add-icon">+</span>
      </button>
      <h2>Product Page</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Device Name</th>
            <th>Device ID</th>
            <th>User ID</th>
            <th>Version</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adding && (
            <tr>
              <td>{products.length + 1}</td>
              <td>
                <input
                  name="devicename"
                  value={newProduct.devicename}
                  onChange={handleInputChange}
                  placeholder="Device Name"
                />
                {errors.devicename && <div className="error">{errors.devicename}</div>}
              </td>
              <td>
                <input
                  name="deviceid"
                  value={newProduct.deviceid}
                  onChange={handleInputChange}
                  placeholder="Device ID"
                />
                {errors.deviceid && <div className="error">{errors.deviceid}</div>}
              </td>
              <td>
                <input
                  name="userid"
                  value={newProduct.userid}
                  onChange={handleInputChange}
                  placeholder="User ID (email)"
                />
                {errors.userid && <div className="error">{errors.userid}</div>}
              </td>
              <td>
                <input
                  name="version"
                  value={newProduct.version}
                  onChange={handleInputChange}
                  placeholder="Version"
                />
                {errors.version && <div className="error">{errors.version}</div>}
              </td>
              <td>
                <button className="btn btn-save" onClick={handleAddProduct} disabled={isSaving}>
                  Save
                </button>
                <button className="btn btn-cancel" onClick={() => setAdding(false)}>
                  Cancel
                </button>
              </td>
            </tr>
          )}

          {products.map((product, index) => (
            <tr key={product._id} className={product._id === newlyAddedId ? "highlight" : ""}>
              <td>{index + 1}</td>
              {editingId === product._id ? (
                <>
                  <td>
                    <input
                      name="devicename"
                      value={editedProduct.devicename}
                      onChange={handleEditInputChange}
                      placeholder="Device Name"
                    />
                    {editErrors.devicename && <div className="error">{editErrors.devicename}</div>}
                  </td>
                  <td>
                    <input
                      name="deviceid"
                      value={editedProduct.deviceid}
                      onChange={handleEditInputChange}
                      placeholder="Device ID"
                    />
                    {editErrors.deviceid && <div className="error">{editErrors.deviceid}</div>}
                  </td>
                  <td>
                    <input
                      name="userid"
                      value={editedProduct.userid}
                      onChange={handleEditInputChange}
                      placeholder="User ID (email)"
                    />
                    {editErrors.userid && <div className="error">{editErrors.userid}</div>}
                  </td>
                  <td>
                    <input
                      name="version"
                      value={editedProduct.version}
                      onChange={handleEditInputChange}
                      placeholder="Version"
                    />
                    {editErrors.version && <div className="error">{editErrors.version}</div>}
                  </td>
                  <td>
                    <button className="btn btn-save" onClick={() => handleSaveEdit(product._id)}>
                      Save
                    </button>
                    <button className="btn btn-cancel" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.devicename}</td>
                  <td>{product.deviceid}</td>
                  <td>{product.userid}</td>
                  <td>{product.version}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setEditingId(product._id);
                        setEditedProduct({
                          devicename: product.devicename,
                          deviceid: product.deviceid,
                          userid: product.userid,
                          version: product.version,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDeleteProduct(product._id)}>
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

export default Product;
