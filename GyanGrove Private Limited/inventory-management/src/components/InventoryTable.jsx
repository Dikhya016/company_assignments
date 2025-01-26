import React, { useState } from "react";
import AddEditForm from "./AddEditForm";

const InventoryTable = () => {
    const [inventory, setInventory] = useState([
      { id: 1, name: "Item 1", category: "Category A", quantity: 15 },
      { id: 2, name: "Item 2", category: "Category B", quantity: 8 },
      { id: 3, name: "Item 3", category: "Category C", quantity: 20 },
    ])

    const [editingItem, setEditingItem] = useState(null);
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");

    //add item
    const addItem=(newItem)=>{
      setInventory((pre)=>[...pre,{...newItem,id:Date.now()}])
    }

    //edit item
    const editItem =(updateItem)=>{
      setInventory((pre)=>pre.map((item)=> item.id===updateItem.id ? {...item,updateItem} :item))
    }
    
    //delete item
    const deleteItem=(id)=>{
      setInventory((pre)=>pre.filter((item)=>item.id!==id))
    }

    //for sorting
    inventory.sort((a,b)=>{
      return sortOrder==='asc'? a.quantity-b.quantity : b.quantity-a.quantity
    })

    //for filter
    const filteredInventory =
      filterCategory === "All"
        ? inventory
        : inventory.filter((item) => item.category === filterCategory);

    

  return (
    <>
      <AddEditForm
        addItem={addItem}
        editItem={editItem}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />

      <div className="d-flex justify-content-between my-4">
        <div>
          <label htmlFor="filterCategory" className="form-label me-2">
            Filter by Category:
          </label>
          <select
            id="filterCategory"
            className="form-select d-inline-block w-auto"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All</option>
            {[...new Set(inventory.map((item) => item.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder" className="form-label me-2">
            Sort by Quantity:
          </label>
          <select
            id="sortOrder"
            className="form-select d-inline-block w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="table ">
        <thead className="table-primary">
          <tr>
            <th>
              <h4>Name</h4>
            </th>
            <th>
              <h4>Category</h4>
            </th>
            <th>
              <h4>Quantity</h4>
            </th>
            <th>
              <h4>Actions</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, ind) => (
            <tr key={ind} className={item.quantity < 10 ? "table-danger" : ""}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => setEditingItem(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InventoryTable;
