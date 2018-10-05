import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker } from 'react-dates'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { createAVote } from '../actions/createAVote'

class CreateAVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            focused: null,
            pseudo: '',
            email: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({
            date: date,
        })
    }

    submitForm(e) {
        e.preventDefault();
        this.props.dispatch(createAVote(this.state.pseudo, this.state.email, this.state.date))
    }

    render() {

        let rendering = "C'est bon, je suis prêt"

        const { result, error, loading } = this.props
        if (result !== '' && result.createdAt) {
            console.log(result);
            return <Redirect to='/add-place'/>
        } else if (loading) {
            console.log('loading...');
            rendering = <FontAwesomeIcon icon={faSpinner} spin />
        } else if (error) {
            console.log(error);

        }

        return (
            <Container fluid className="stepContainer">
                <Row noGutters className="justify-content-center align-items-center h-100">
                    <Col
                        xs="12"
                        sm="8"
                        md="6"
                        xl="4"
                        className="bg-blue p-5 rounded"
                    >
                        <Form onSubmit={(e) => this.submitForm(e)}>
                            <FormGroup>
                                <Label for="pseudo">Ta date ?</Label>
                                <div className='text-center'>
                                    <SingleDatePicker
                                        numberOfMonths={1}
                                        date={this.state.date}
                                        onDateChange={date => this.handleDateChange(date)}
                                        focused={this.state.focused}
                                        onFocusChange={({ focused }) =>
                                            this.setState({ focused })
                                        }
                                        openDirection="up"
                                        hideKeyboardShortcutsPanel={true}
                                        showDefaultInputIcon
                                        inputIconPosition="after"
                                        displayFormat="DD/MM/YYYY"
                                    />
                                </div>

                            </FormGroup>
                            <FormGroup>
                                <Label for="pseudo">Indique ton pseudo</Label>
                                <Input
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Indique ton email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <div className="text-center mt-5">
                                <Button color="success">{rendering}</Button>
                            </div>

                        </Form>
                    </Col>

                </Row>
            </Container>);
    }
}

const mstp = ({ vote }) => ({
    result: vote.result,
    error: vote.error,
    loading: vote.loading
});

export default connect(mstp)(CreateAVote);
