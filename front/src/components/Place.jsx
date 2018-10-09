import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ListGroupItem, Button } from 'reactstrap'

import { deleteAPlace } from '../actions/deleteAPlace'

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class Place extends Component {
    constructor(props) {
        super(props);
        this.deleteAPlaceToVote = this.deleteAPlaceToVote.bind(this);
    }

    deleteAPlaceToVote(vote_id, place_id) {
        this.props.dispatch(deleteAPlace(vote_id, place_id))
    }

    render() {

        const { place, type, vote_id, place_id } = this.props

        return (
            <ListGroupItem>
                <p className="my-1">
                    {type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />} {place}
                    <span className="align-top">
                        <Button
                            color="danger"
                            size="sm"
                            className="float-right"
                            onClick={() => this.deleteAPlaceToVote(vote_id, place_id) }
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </span>

                </p>
            </ListGroupItem>
        );
    }
}

const mstp = () => ({
});

export default connect(mstp)(Place);
