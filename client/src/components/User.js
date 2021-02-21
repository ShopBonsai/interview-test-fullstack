import React, { Component } from 'react';
import { Query } from 'react-apollo';
import GET_USER_BY_ID from '../graphql/queries/getUserById';
import { Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/actions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0
        };
    }
    setUser(data) {
        this.props.setCurrentUser({ user: data.user })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.currentUser && nextProps.currentUser.likes) {
            this.setState({ likes: nextProps.currentUser.likes.length })
        }
    }
    render() {
        return(
            <div>
                <Query query={ GET_USER_BY_ID }
                       variables={{ userId: this.props.currentUser.userId }}
                       onCompleted={ data => this.setUser(data) }
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error ☠️</div>
                        return (
                            <div>
                                <small>{data.user.firstName} {data.user.lastName}<br/></small>
                                <Badge>
                                    <small>♥️ {this.state.likes} favorite{this.state.likes > 1 ? 's' : null} </small>
                                </Badge>
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.user.data
});
const mapDispatchToProps = {
    setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
