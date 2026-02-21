import React from "react";
import OrderRow from "../../../Components/Table/OrdersRow";
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
  // const { orders } = useData();
  const orders = [];
  return (
    <Table attributes={orderTableHeadings}>
      {orders?.map((order, i) => (
        <OrderRow order={order} key={i} />
      ))}
    </Table>
  );
};

export default OrderList;
