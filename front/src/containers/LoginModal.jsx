import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import { updateUserData } from '../actions'

class LoginModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modal: false,
            pseudo: '',
            email: '',
          };
      
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        if(this.props.open) {
            this.toggle()
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });  
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
        localStorage.setItem('pseudo', this.state.pseudo)
        localStorage.setItem('email', this.state.email)
        this.setState({
            modal:false,
        })
    this.props.dispatch(updateUserData(this.state.pseudo,this.state.email));

    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Présente toi avant de voter</ModalHeader>
                <ModalBody>
                <Form onSubmit={(e) => this.submitForm(e)}>
                            <FormGroup>
                                <Label for="pseudo">Indique ton pseudo</Label>
                                <Input
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    value={this.state.pseudo}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Indique ton email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <div className="text-center mt-5">
                                <Button color="success">Bonjour</Button>
                            </div>

                        </Form>
                    </ModalBody>
            </Modal>
        );
    }
}

export default connect()(LoginModal);