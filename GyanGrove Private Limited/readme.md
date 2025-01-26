Product Requirements Document (PRD)
---------------------------------------------

Project Name:
------------------
Dynamic Inventory Management Table

Objective:
-------------
Build a React.js-based inventory management application to display and manage stock items efficiently.

1. Scope and Purpose
=============================

The inventory management app will allow users to:

-> View all items in stock in a tabular format.
-> Add new items to the inventory.
-> Edit and delete existing items.
-> Filter items by category.
-> Sort items by quantity.
-> Highlight low-stock items (e.g., quantity < 10).

This app aims to provide a user-friendly interface to help users keep track of inventory effortlessly.

2. Features and Requirements
==================================
2.1 Core Features
------------------
a. Dynamic Table Display:
    -> Display items with columns for name, category, quantity, and actions (Edit/Delete).
b. Add New Item:
    -> A form to add a new item to the table, capturing details like name, category, and quantity.
c. Edit Existing Item:
    -> Update item details (name, category, or quantity) using an in-place editor or modal.
d. Delete Item:
    -> Remove an item from the inventory with a confirmation prompt.
e. Filter by Category:
    -> Dropdown or search-based filter to show items from a selected category.
f. Sort by Quantity:
    -> Allow sorting items in ascending/descending order by quantity.
g. Low-Stock Highlighting:
    -> Highlight rows for items with quantities below 10.

2.2 Additional Requirements
-----------------------------------

Basic Validation:
------------------
Prevent users from adding or updating items with invalid data (e.g., negative quantity or empty fields).

3. Technical Requirements
================================
3.1 Technology Stack
----------------------
Frontend: React.js
State Management: React state/hooks (useState, useEffect).
Styling: CSS or any library like Tailwind CSS/Bootstrap.
Data Storage: LocalStorage or mock API.

4. User Stories
=====================
➡️As a user, I want to:
 • View all inventory items in a structured table.
➡️As a user, I want to:
 • Add new items with name, category, and quantity.
➡️As a user, I want to:
 • Edit details of an existing item in the inventory.
➡️As a user, I want to:
 • Delete items from the inventory with a confirmation prompt.
➡️As a user, I want to:
 • Filter the table by item categories to find specific items easily.
➡️As a user, I want to:
 • Sort items by quantity to identify low or high-stock products quickly.
➡️As a user, I want to:
 • See low-stock items (quantity < 10) highlighted for quick action.

5. UI Wireframe
====================
Main Page (Table View)
--------------------
➡️Columns:
Item Name,Category,Quantity,Actions (Edit/Delete)

➡️Add/Edit Modal Form:
Fields:
Name (Text input),Category (Dropdown),Quantity (Number input)

➡️Filters and Sorts Section:
Category Dropdown Filter.
Sort by Quantity (Button or Dropdown).
