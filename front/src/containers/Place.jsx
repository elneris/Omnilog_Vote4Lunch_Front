import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ListGroupItem, Button } from 'reactstrap'

import { deleteAPlace } from '../actions/deleteAPlace'

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class Place extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { place, type, vote_id, place_id, deleteAPlace } = this.props

        return (
            <ListGroupItem>
                <p className="my-1">
                    {type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />} {place}
                    <span className="align-top">
                        <Button
                            color="danger"
                            size="sm"
                            className="float-right"
                            onClick={() => deleteAPlace(vote_id, place_id) }
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </span>

                </p>
            </ListGroupItem>
        );
    }
}

const mdtp = (dispatch) => {
    return bindActionCreators({ deleteAPlace }, dispatch);
}

export default connect(null, mdtp)(Place);
