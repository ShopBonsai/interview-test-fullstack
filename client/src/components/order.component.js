import React from 'react';
import { Row, Col } from 'reactstrap';

import './order.css';

const Order = ({ order }) => {
  const { created, total, products } = order;

  return (
    <div className="order-item">
      <Row>
        <Col>{created}</Col>
        <Col>${total}</Col>
        <Col>
          {products.map((product) => (
            <div style={{ width: '100%' }} key={product.id}>
              {product.name}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Order;
