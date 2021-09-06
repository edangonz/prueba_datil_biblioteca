import React from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { getBook } from '../../../services/book.service';
import AddBookModal from '../Modal/AddBook.modal';
import TableComponent from '../util/Table/Table';
import ToastComponent from '../util/Toast/Toast';

class AdminComponent extends React.Component {
    state = {
        search : "",
        modalShow: false,
        showtoast : false,
        books : [],
        loading : false
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if(this.state.search.length >= 1) {
            this.setState({ loading : true, books : []})
            let res = await getBook(this.state.search);
            this.setState({books : res, loading : false})
        }
    }

    finishedAddNewBook() {
        this.setState({modalShow : false, showtoast : true});

        setTimeout(() => {
            this.setState({showtoast : false});
        }, 4000);
    }

    render(){
        return (
            <div className="content-container-data">
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Row className="align-items-center">
                        <Col md={5} xs={5}>
                        <InputGroup className="mb-2">
                            <InputGroup.Text><i className="fas fa-search"></i></InputGroup.Text>
                            <FormControl id="inlineFormInputGroup" placeholder="Buscar" onChange={(event) => this.setState({ search : event.target.value })}/>
                        </InputGroup>
                        </Col>
                        <Col md={4} xs={5}>
                        <Button type="submit" className="mb-2">
                            Buscar
                        </Button>
                        </Col>
                        <Col md={3} xs={2}>
                        <Button type="button" className="mb-2" onClick={() => this.setState({modalShow : true})}>
                            Añadir libro
                        </Button>
                        </Col>
                    </Row>
                </Form>   

                <TableComponent
                    books={this.state.books}
                    loading={this.state.loading}
                    actionTable={() => {}}
                    />

                <AddBookModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow : false})}
                    finishedAddNewBook={() => this.finishedAddNewBook()}/>

                <ToastComponent
                    showtoast={this.state.showtoast}
                    onHide={() => this.setState({ showtoast : false })}
                    title="Libro añadido"
                    mesage={"Nuevo libro añadido con exito"}
                    />                
            </div>
        );
    };
}

export default AdminComponent;