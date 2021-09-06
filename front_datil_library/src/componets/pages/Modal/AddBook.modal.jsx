import React from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { addBook, addStockBook, getBook } from "../../../services/book.service";
import ConfirmarModal from "./Confirma.modal";

class AddBookModal extends React.Component {
    state = {
        validated : false,
        loading : false,
        showAlert : false,

        showModal : false,
        temp_data : {}
    };

    async handleSubmit (event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        this.setState({validated : true});
        
        if (form.checkValidity()) {
            this.setState({loading : true})
            let data_book = {
                code_book  : form.form_code_book.value,
                title : form.form_title.value,
                autor : form.form_autor.value,
                stock : parseInt(form.form_stock.value),
            }

            let current_book = (await getBook(data_book.code_book))[0];
            
            if (!current_book){
                let res = await addBook(data_book);

                if(res){
                    this.props.finishedAddNewBook();
                    this.setState({loading : false, validated : false})
                } else 
                    this.setState({loading : false, showAlert : true})
            } else {
                current_book.stock = current_book.stock + parseInt(form.form_stock.value);
                this.setState({ showModal : true, temp_data : current_book });
            }
        }
    };

    async addStock() {
        let res = await addStockBook(this.state.temp_data);

        if(res){
            this.props.finishedAddNewBook();
            this.setState({loading : false, showModal : false, validated : false, temp_data : {}})
        } else 
            this.setState({loading : false, showModal : false, showAlert : true, temp_data : {}})
    }

  render() {  
    return (
        <>
        <Modal show={this.props.show} onHide={this.props.onHide} backdrop="static" className="custom-modal big-modal">
          <Modal.Header closeButton>
            <Modal.Title>Agregar nuevo libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="form_code_book">
                    <Form.Label>Codigo</Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-book"></i></InputGroup.Text>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingre el codigo del libro"
                        />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">Ingre un codigo valido.</Form.Control.Feedback>
                    </Form.Group>
        
                    <Form.Group as={Col} md="12" controlId="form_title">
                    <Form.Label>Titulo</Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-book-reader"></i></InputGroup.Text>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Titulo del libro"
                        />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">Ingrese un titulo</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="form_autor">
                    <Form.Label>Autor</Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-user"></i></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Autor del libro"
                            required />
                        <Form.Control.Feedback type="invalid">Ingrese un autor.</Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
            
                    <Form.Group as={Col} md="6" controlId="form_stock">
                    <Form.Label>Cantidad disponible</Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-align-justify"></i></InputGroup.Text>
                        <Form.Control
                        type="number"
                        placeholder="Cantidad"
                        required
                        />
                        <Form.Control.Feedback type="invalid">Ingrese cantidad disponble de ejemplares.</Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                </Row>
                
                <div className="container-center">
                    {(this.state.loading)? <Spinner animation="border" />:    
                    <Button type="submit">Añadir</Button>}
                </div>
                </Form>

          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>

        <ConfirmarModal
            show={this.state.showModal}
            onHide={() => this.setState({ showModal : false })}
            aceptedAccion={() => this.addStock()}
            mesage="Existe un libro con el mismo código ¿Desea aumentar el stock?"/>
        </>
      );
    }
  }
  
export default AddBookModal;