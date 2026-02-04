import React from "react";
import OrderRow from "../../../Components/Table/OrdersRow";
import { useData } from "../../../Context/Data/DataContext";
import Table from "../../../Components/Table";

const OrderList = () => {
  const orderTableHeadings = [
    "",
    "Order ID",
    "Payment ID",
    "Username",
    "Phone Number",
    "Items",
    "Price",
    "Created at",
    "Modified at",
    "Operations",
  ];
  const { orders } = useData();
  return (
    <Table attributes={orderTableHeadings}>
      {orders?.map((order, i) => (
        <OrderRow order={order} key={i} />
      ))}
    </Table>
  );
};

export default OrderList;
