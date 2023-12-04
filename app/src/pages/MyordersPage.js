import React from "react";
import { UserStore } from "../features/user/UserStore";
import { Navbar } from "../features/navbar/Navbar";

const MyordersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-xl"> My Orders</h1>
        <UserStore />
      </Navbar>
    </div>
  );
};


export default MyordersPage;
