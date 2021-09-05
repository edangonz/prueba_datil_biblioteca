import React from 'react'

import { withRouter } from "react-router";

import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { loginWithCredentials, loginWithToken } from '../../../services/login.service';

class Login extends React.Component {
    state = {
        validated : false,
        loading : false,
        error_login : false
    };

    async handleSubmit (event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        this.setState({validated : true});
        
        if (form.checkValidity()) {
            this.setState({loading : true})
      
            let username = form.form_username.value;
            let password = form.form_password.value;

            let res = await loginWithCredentials(username, password);

            if(res){
                this.setState({loading : false, validated : false, error_login : false})
                await this.props.isLogin();
                this.props.history.push("/app")
            } else 
                this.setState({loading : false, error_login : true})
        } 
    }

    async isLogin(){
        let userData = await loginWithToken();
        
        if(userData){
            this.props.setUserLogin(userData);
            this.props.history.push("/app");
        }
    }

    componentDidMount(){
        this.isLogin();
    }

    render(){
        return (
            <div className="main-container container-center">
                <div className="container-login">
                <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="form_username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup >
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ingrese su usuario"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} md="12" controlId="form_password">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                   
                    <Button type="submit">Iniciar sesion</Button>
                    {this.state.loading && <Spinner animation="border" />}
                    {this.state.error_login && <Form.Control.Feedback type="invalid">Credenciales incorrectas.</Form.Control.Feedback>}
                </Form>
                </div>
            </div>
        );
    };
}

export default withRouter(Login);