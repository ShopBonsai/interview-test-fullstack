import React from 'react';
import { useQuery } from '@apollo/client';
import { Col, Container, Row } from 'reactstrap';

import { GET_ORDERS } from '../qgl/order';
import Loader from '../components/loader/loader.component';
import Order from '../components/order/order.component';
import EmptyView from '../components/empty-view.component';

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
    return <EmptyView message={'No orders available'} />;
  }
};

export default Orders;
