import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from '@apollo/client';
import { CardTitle, CardBody } from 'reactstrap';

import './order.css';
import Loader from '../loader/loader.component';

export const GET_ORDERS = gql`
  query orders {
    orders {
      guid
      total
    }
  }
`;

const Orders = () => {
  const { loading: ordersLoading, data } = useQuery(GET_ORDERS);

  const { orders = [] } = data || {};

  if (ordersLoading) return <Loader />;

  if (!ordersLoading && orders.length > 0) {
    return data.orders.map((order) => {
      <div className="orders">
        <div>{order.guid}</div>
        <CardBody>
          <CardTitle>Id: {order.guid}</CardTitle>
        </CardBody>
      </div>;
    });
  } else {
    return (
      <div>
        <h3>No orders available</h3>
      </div>
    );
  }
};

export default Orders;
