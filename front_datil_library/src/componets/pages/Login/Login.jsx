import React from 'react'

import { withRouter } from "react-router";

import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { createUser, loginWithCredentials, loginWithToken } from '../../../services/login.service';

class Login extends React.Component {
    state = {
        validated : false,
        loading : false,
        error_login : false,

        is_create_user : false,
    };

    async handleSubmit (event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        this.setState({validated : true, error_login : false});
        
        if (form.checkValidity()) {
            this.setState({loading : true})
      
            let username = form.form_username.value;
            let password = form.form_password.value;

            if (!this.state.is_create_user)
                await this.initSesion(username, password);
            else
                await this.registerUser(username, password);
        } 
    }

    async initSesion(username, password) {
        let res = await loginWithCredentials(username, password);

        if(res){
            this.setState({loading : false, validated : false, error_login : false, is_create_user : false})
            await this.props.isLogin();
            this.props.history.push("/app")
        } else 
            this.setState({loading : false, error_login : true})
    }

    async registerUser(username, password) {
        let res = await createUser(username, password);

        if(res)
            await this.initSesion(username, password);
        else
            this.setState({loading : false, error_login : true})
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
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                   <div className="container-center">
                        <Button type="submit">
                            {!this.state.is_create_user ? "Iniciar sesión" : "Crear cuenta"}
                        </Button>
                   </div>
                   <div className="container-center">
                        {this.state.loading && <Spinner animation="border" />}
                        {this.state.error_login && <span>
                            {this.state.is_create_user ? "Error al crear usuario" : "Credenciales incorrectas."}
                        </span>}
                    </div>
                    <div className="container-center" onClick={() => this.setState({ is_create_user : !this.state.is_create_user })}>
                        <span className="text-option">{this.state.is_create_user ? "Iniciar sesion" : "Crear una cuenta"}</span>
                    </div>
                </Form>
                </div>
            </div>
        );
    };
}

export default withRouter(Login);