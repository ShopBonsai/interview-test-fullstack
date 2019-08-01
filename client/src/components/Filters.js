import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media, FormGroup, Label, Input, Alert } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_BRANDS = gql`
  {
    merchants {
	  brands
    }
  }
`;

const withMerchants = Component => props => {
  return (
    <Query query={GET_BRANDS}>
      {({ loading, data }) => {
        console.log('filters', data)
        return (
          <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

class Filters extends Component {

  showFilters() {
    const { merchants, merchantsLoading } = this.props;

    return (
		<div>ok fam</div>
	)
  }

  render() {
    return (
      <div>
        {this.showFilters()}
      </div>
    );
  }
}
export default withMerchants(Filters)