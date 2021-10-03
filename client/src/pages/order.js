import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from '@apollo/client';

import './order.css';
import Loader from '../components/loader/loader.component';
import Order from '../components/order.component';
import { Col, Container, Row } from 'reactstrap';

export const GET_ORDERS = gql`
  query orders {
    orders {
      guid
      products {
        id
        name
      }
      total
      created
    }
  }
`;

const Orders = () => {
  const { loading: ordersLoading, data } = useQuery(GET_ORDERS, { fetchPolicy: 'network-only' });

  if (ordersLoading) return <Loader />;

  if (!ordersLoading && data.orders && data.orders.length > 0) {
    return (
      <Container>
        <div>
          <Row style={{ padding: '15px' }}>
            <Col>ORDER DATE</Col>
            <Col>TOTAL</Col>
            <Col>PRODUCTS</Col>
          </Row>
        </div>
        {data.orders.map((order) => {
          return <Order key={order.guid} order={order} />;
        })}
      </Container>
    );
  } else {
    return (
      <div>
        <h3>No orders available</h3>
      </div>
    );
  }
};

export default Orders;
