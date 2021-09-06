import React from "react";
import { Button, Col, Row, Spinner} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { reservarBook } from "../../../services/reserva.service";

class ReservaModal extends React.Component {
    state = {
        loading : false,
        message : undefined
    }

    async reservarBook () {
        let res = await reservarBook({code_book : this.props.book.code_book});
        this.setState({ loading : false, message : undefined})
        if(res)
            this.props.aceptedReserva();
        else {
            this.setState({ message : "Ocurrió un error o ya existe una reserva de este libro." });
            setTimeout(() => {
                this.setState({ message : undefined });
            }, 3000);
        }
    }

  render() {  
    return (
        <Modal show={this.props.show} onHide={this.props.onHide} backdrop="static" className="custom-modal big-modal">
          <Modal.Header closeButton>
            <Modal.Title>Reservar libro : {this.props.book.code_book}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Row>
                    <Col md={5}><h4>Titulo:</h4></Col>
                    <Col md={7}><h4>{this.props.book.title}</h4></Col>
                    <Col md={5}><h4>Autor:</h4></Col>
                    <Col md={7}><h4>{this.props.book.autor}</h4></Col>
                    <Col md={5}><h4>Unidades disponibles:</h4></Col>
                    <Col md={7}><h4>{this.props.book.stock}</h4></Col>
            </Row>
            <div className="container-center">
                {(this.state.loading)? <Spinner animation="border" />:    
                <Button onClick={() => this.reservarBook()} disabled={!this.props.book.stock}>Reservar libro</Button>}
            </div>
            <div className="container-center">
                <h5>{ this.state.message }</h5>
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
export default ReservaModal;