import "./App.css";

import { Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import ProductPage from "./pages/ProductPage";

import {
  // eventsColumns,
  // flattenedOrdersColumns,
  // ordersColumns,
  // productsColumns,
  usersColumns,
} from "./data/tableData";
import {
  // getEvents,
  // getFlattenedOrders,
  // getOrders,
  // getProducts,
  getUsers,
  // updateEvent,
  // updateOrder,
  // updateProduct,
  updateUser,
} from "./services/firebase";
// import {
//   getDummyEvents,
//   getDummyOrders,
//   getDummyProducts,
//   getDummyUsers,
// } from "./services/dummyFirebase";
import Dashboard from "./pages/Dashboard";
import StoresPage from "./pages/StoresPage/StoresPage";
import UsersPage from "./pages/UsersPage";

function Admin() {
  return (
    // <BrowserRouter>
    <div className="App">
      <Sidenav />
      <div className="content">
        <Routes>
          <Route path="/" element={<StoresPage />} />
          <Route path="/stores/" element={<StoresPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route
            path="/orders"
            element={
              <AdminPage
                key={2}
                pageName={"Orders"}
                // getObjects={getDummyOrders}
                getObjects={getFlattenedOrders}
                objectsColumns={flattenedOrdersColumns}
                updateObject={updateOrder}
                // updateObject={() => {}}
              />
            }
          /> */}
          <Route path="/users" element={<UsersPage />} />
          {/* <Route
            path="/users"
            element={
              <AdminPage
                key={3}
                pageName={"לקוחות"}
                // getObjects={getDummyUsers}
                getObjects={getUsers}
                objectsColumns={usersColumns}
                updateObject={updateUser}
                // updateObject={() => {}}
              />
            }
          /> */}
        </Routes>
      </div>
    </div>
    // </BrowserRouter>
  );

  // movieList && (
  //   <Table data={movieList} columns={columns} update={updateMovie} />
  // )
}

export default Admin;
