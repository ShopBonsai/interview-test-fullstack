import React, { Component } from 'react';
import { Query } from 'react-apollo';
import GET_USER_BY_ID from '../graphql/queries/getUserById';
import { connect } from "react-redux";

class User extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Query query={ GET_USER_BY_ID }
                       variables={{ userId: this.props.userId }}
                       refetch={true}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error :(</div>
                        return (
                            <div>
                                <small>{data.user.firstName} {data.user.lastName}<br/></small>
                                <small>♥️ {data.user.likes.length} favorite{data.user.likes.length > 1 ? 's' : null} </small>
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    userId: state.user.userId
});

export default connect(mapStateToProps)(User);
