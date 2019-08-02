import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media, FormGroup, Label, Input, Alert } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

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
          <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

class Filters extends Component {
	constructor(props) {
		super(props)
		
		this.state = {

		}
	}

	showFilters() {
		const { merchants, merchantsLoading } = this.props;
		
		if (!merchantsLoading && merchants && merchants.length > 0) {
			let sortedMerchants = merchants.filter(merchant => merchant.publishedState === true)
			sortedMerchants = sortedMerchants.sort(function(a,b){ return a.merchant.localeCompare(b.merchant) });

			return (
				<React.Fragment>
					<div className="filters__brand">
						<label htmlFor="filters-brand">Brand</label>
						<select 
							name="filters-brand" 
							id="filters-brand" 
							multiple 
							onChange={(e) => this.props.updateByFilters(e)}
							defaultValue={["All Brands"]}
						>
							<option value="All Brands">All Brands</option>
							{
								sortedMerchants.map((merchant, index) => {
									return (
										<React.Fragment key={index}>
											<optgroup label={merchant.merchant}>
												{
													merchant.brands.map((brand, index) => { return (<option key={index} value={brand}>{brand}</option>) })
												}
											</optgroup>
										</React.Fragment>
									)
								})
							}
						</select>
					</div>
					<div className="filters__price">
						<label htmlFor="filters-price">Price</label>
						<select name="filters-price" id="filters-price">
							<option value="0_24">$24.99 & Under</option>
							<option value="25_49">$25.00 - $49.99</option>
							<option value="50_74">$50.00 - $79.99</option>
							<option value="75_99">$75.00 - $99.99</option>
							<option value="100_149">$100.00 - $149.99</option>
							<option value="150_max">$150.00 & Over</option>
						</select>
					</div>
					<div className="filters__results-count">
						
					</div>
				</React.Fragment>
			)
		} else {
			return (
				<div>
					<h3>Filters loading...</h3>
				</div>
			);
		}
	}

  render() {
    return (
		<div className="filters">
			{this.showFilters()}
		</div>
	)
  }
}
export default withMerchants(Filters);