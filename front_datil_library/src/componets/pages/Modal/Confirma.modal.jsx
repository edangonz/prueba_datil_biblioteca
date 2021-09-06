import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class ConfirmarModal extends React.Component {

  render() {  
    return (
        <Modal show={this.props.show} onHide={this.props.onHide} backdrop="static" className="custom-modal big-modal">
          <Modal.Header closeButton>
            <Modal.Title>Confirmar acción.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col md={12}>{ this.props.mesage }</Col>
                <Col md={6} className="container-center">
                    <Button onClick={() => this.props.onHide()}>Cancelar</Button>
                </Col>
                <Col md={6} className="container-center">
                    <Button onClick={() => this.props.aceptedAccion()}>Aceptar</Button>
                </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
export default ConfirmarModal;