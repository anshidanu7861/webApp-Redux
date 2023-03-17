import React, { Fragment } from "react";
import AdminNav from "../../components/navbar/adminnav";
import UserTable from "../../components/Table/table";

const Adminpanel = () => {
  return (
    <Fragment>
      <AdminNav/>
      <UserTable />
    </Fragment>
  );
};

export default Adminpanel
