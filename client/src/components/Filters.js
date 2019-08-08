import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import "./../styles/components/filters/filters.css";

const GET_MERCHANTS = gql`
  {
    merchants {
      guid
      merchant
      brands
      publishedState
    }
  }
`;

const withMerchants = Component => props => {
  return (
    <Query query={GET_MERCHANTS}>
      {({ loading, data }) => {
        return (
          <Component
            merchantsLoading={loading}
            merchants={data && data.merchants}
            {...props}
          />
        );
      }}
    </Query>
  );
};

class Filters extends Component {
	
  showFilters = () => {
    const { merchants, merchantsLoading } = this.props;

    if (!merchantsLoading && merchants && merchants.length > 0) {
      let sortedMerchants = merchants.filter(
        merchant => merchant.publishedState === true
      );
      sortedMerchants = sortedMerchants.sort(function(a, b) {
        return a.merchant.localeCompare(b.merchant);
      });

      return (
        <React.Fragment>
          <div className="filter filters__brand">
            <label htmlFor="filters-brand">Brand</label>

            {/* Use select[multiple] field for mobile. Went with the 
						assumption that this is mobile only from verbiage. Would 
						use a different type of field for desktop since it 
						requires a ctrl/cmd click to select multiple options. */}
            <select
              name="filters-brand"
              id="filters-brand"
              multiple
              onChange={event => this.props.updateByFilters(event)}
              defaultValue={["All Brands"]}
            >
              <option value="All Brands">All Brands</option>
              {sortedMerchants.map((merchant, index) => {
                return (
                  <React.Fragment key={index}>
                    <optgroup label={merchant.merchant}>
                      {merchant.brands.map((brand, index) => {
                        return (
                          <option key={index} value={brand}>
                            {brand}
                          </option>
                        );
                      })}
                    </optgroup>
                  </React.Fragment>
                );
              })}
            </select>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <h3>Filters loading...</h3>
        </div>
      );
    }
  };

  render() {
    return <div className="filters">{this.showFilters()}</div>;
  }
}
export default withMerchants(Filters);
