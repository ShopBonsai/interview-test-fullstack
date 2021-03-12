import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { Button, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import ProductsList from '../components/templates/Products';
import './ManageStore.css';

const GET_MERCHANT_BY_GUID = gql`
  query GetMerchantByGuid($guid: String!) {
    merchant(guid: $guid) {
      guid
      merchant
      logo
      contactEmail
      phone
      address
      companyDescription
    }
  }
`;

const EDIT_MERCHANT_WITH_GUID = gql`
  mutation EditMerchantWithGuid(
    $guid: String!
    $merchant: String!
    $contactEmail: String!
    $phone: String!
    $address: String!
    $companyDescription: String!
  ) {
    editMerchantWithGuid(
      guid: $guid,
      merchant: $merchant,
      contactEmail: $contactEmail,
      phone: $phone,
      address: $address,
      companyDescription: $companyDescription
    ) {
      guid
      merchant
      contactEmail
      phone
      address
      companyDescription
    }
  }
`;

const ManageStorePageComponent = ({ merchantLoading, merchant }) => (
  <div>
    <h1>Manage Store</h1>
    {
      merchantLoading
        ? <div>Loading...</div>
        : (
        <div>
          <div className='merchant-info-table'>
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading>
                  {merchant.merchant}
                  <img className='merchant-logo' src={merchant.logo}></img>
                </ListGroupItemHeading>
                <ListGroupItemText>{merchant.companyDescription}</ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  Contact Details
                </ListGroupItemHeading>
                <ListGroupItemText>
                  {merchant.address}
                  <br />
                  <a href={`mailto:${merchant.contactEmail}`}>{merchant.contactEmail}</a>
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </div>
          <ProductsList merchantGuid={merchant.guid} />
        </div>
        )
    }
  </div>
);

const withCurrentMerchant = (Component) => props => {
  return (
    <Query query={GET_MERCHANT_BY_GUID} variables={{
      guid: '8b36dad9-f5a5-4b35-bfc9-27990a0be2b2',
    }}>
      {({ loading, data }) => {
        const merchant = data && data.merchant;
        return (
          <div>
            <Component merchantLoading={loading} merchant={merchant} {...props} />
          </div>
        );
      }}
    </Query>
  );
};

const withEditMerchant = (Component) => (props) => {
  return (
    <Mutation mutation={EDIT_MERCHANT_WITH_GUID} refetchQueries={['GetMerchantByGuid']}>
      {(editMerchantWithGuid) => {
        return (
          <Component editMerchantWithGuid={editMerchantWithGuid} {...props} />
        )
      }}
    </Mutation>
  )
}

const MerchantInfoTable = withEditMerchant(MerchantInfoTableComponent);
export const ManageStorePage = withCurrentMerchant(ManageStorePageComponent);
