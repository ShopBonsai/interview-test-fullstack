import React from 'react';
import { Media, CardTitle, CardBody } from 'reactstrap';

import './empty-view.css';

const EmptyView = ({ message }) => {
  return (
    <div className="empty-view">
      <Media className="detail">
        <CardBody className="card">
          <CardTitle style={{ fontWeight: 600 }}>OPS</CardTitle>
          <CardTitle>{message}</CardTitle>
        </CardBody>
      </Media>
    </div>
  );
};

export default EmptyView;
