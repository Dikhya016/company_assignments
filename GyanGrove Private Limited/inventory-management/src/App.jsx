import React from 'react'
import InventoryTable from './components/InventoryTable'

const App = () => {
  return (
    <div className="container mt-2 ">
      <h1 className="text-center mb-4 ">Inventory Management</h1>
      <InventoryTable />
    </div>
  );
}

export default App