import React, { useEffect, useState } from "react";

const AddEditForm = ({ addItem, editItem, editingItem, setEditingItem }) => {
  const [formdata, setFormdata] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  

  // Pre-fill form data 
  useEffect(() => {
    if (editingItem) {
      setFormdata({
        name: editingItem.name || "",
        category: editingItem.category || "",
        quantity: editingItem.quantity || 0,
      });
    } else {
      setFormdata({ name: "", category: "", quantity: 0 });
    }
  }, [editingItem]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    //validation
    if (!formdata.name || !formdata.category || formdata.quantity === "") {
      alert("All fields are required.");
      return;
    }

    if (isNaN(formdata.quantity) || formdata.quantity < 0) {
      alert("Quantity must be a positive number.");
      return;
    }

    if (editingItem) {
      editItem({ ...formdata, id: editingItem.id }); 
    } else {
      addItem(formdata); 
    }

    
    setFormdata({ name: "", category: "", quantity: 0 });
    setEditingItem(null); 
  };

  
  const handleCancel = () => {
    setFormdata({ name: "", category: "", quantity: 0 }); 
    setEditingItem(null); 
  };

  return (
    <div className="mb-4">
      <h3>{editingItem ? "Edit Item" : "Add Item"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formdata.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formdata.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formdata.quantity}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingItem ? "Edit Item" : "Add Item"}
        </button>

        {editingItem && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditForm;
