import React from "react";
import AddEventsPage from "../../AdminApp/AddEventsPage";
import AdminCreatEventHeader from "../../Common/AdminCreatEventHeader";

const AdminDashboard = () => {
  return (
    <div>
      <AdminCreatEventHeader />
      <div>
        <i className="fa fa-event"></i>
        {/* <h1 className="createEventTitle">Create Event </h1> */}
      </div>


      {/* <button>
        <a href="/create/events">Craete Events</a>
      </button> */}
      {/* <h1>Admin Dashboard</h1> */}
      <AddEventsPage />
    </div>
  );
};

export default AdminDashboard;
