import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteReservaBook, getReserveBooks, updateReserveBooks } from '../../../services/reserva.service';
import ConfirmarModal from '../Modal/Confirma.modal';
import TableReservaComponent from '../util/Table/TableReserved';
import ToastComponent from '../util/Toast/Toast';

class ReservedBookComponent extends React.Component {
    state = {
        books : [],
        loading : false,
        showModal : false,
        showModalDelete : false,
        showtoast : false,
        showtoastDelete : false,

        temp_book : {}
    }

    async getAllBooks() {
        this.setState({ loading : true})
        let res = await getReserveBooks();
        this.setState({books : res, loading : false})
    }

    openDeleteReserva(book){
        this.setState({ temp_book : book, showModalDelete : true });
    }

    async deleteReserva() {
        let res = await deleteReservaBook(this.state.temp_book);        
        if (res) {
            let temp_list = this.state.books.filter((e) => e.id_borrowed_book !== this.state.temp_book.id_borrowed_book);
            this.setState({ books : temp_list, temp_book : {}, showModalDelete : false, showtoastDelete : true});

            setTimeout(() => {
                this.setState({ showtoastDelete : false});
            }, 5000);
        }
    }

    async borrovedBooks(){
        let res = await updateReserveBooks();
        if(res){
            this.setState({ books : [], showtoast : true, showModal : false})

            setTimeout(() => {
                this.setState({ showtoast : false});
            }, 5000);
        }

    }

    componentDidMount() {
        if(!this.state.books.length)
            this.getAllBooks()
    }

    render(){
        return (
            <div className="content-container-data">
                <TableReservaComponent
                    books={this.state.books}
                    loading={this.state.loading}
                    actionTable={(e) => this.openDeleteReserva(e)}
                />
            
                <div className="container-center">
                    <Button onClick={() => this.setState({ showModal : true })} disabled={!this.state.books.length}>Prestar libros</Button>
                </div>

                <ConfirmarModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal : false })}
                    aceptedAccion={() => this.borrovedBooks()}
                    mesage={`¿Desea prestar ${this.state.books.length} libros?`}/>
                
                <ConfirmarModal
                    show={this.state.showModalDelete}
                    onHide={() => this.setState({ showModalDelete : false })}
                    aceptedAccion={() => this.deleteReserva()}
                    mesage={`¿Desea eliminar ${this.state.temp_book.title} de su reserva?`}/>

                <ToastComponent
                    showtoast={this.state.showtoast}
                    onHide={() => this.setState({ showtoast : false })}
                    title="Libros prestado"
                    mesage={"Libros prestados con exito"}
                    />

                <ToastComponent
                    showtoast={this.state.showtoastDelete}
                    onHide={() => this.setState({ showtoastDelete : false })}
                    title="Libros eliminado"
                    mesage={"Libros eliminado con exito"}
                    />     
            </div>
        );
    };
}

export default ReservedBookComponent;