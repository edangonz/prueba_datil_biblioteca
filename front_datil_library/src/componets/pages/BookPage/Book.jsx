import React from 'react';
import { getBooksFilter } from '../../../services/book.service';
import ReservaModal from '../Modal/Reserva.modal';
import TableComponent from '../util/Table/Table';
import ToastComponent from '../util/Toast/Toast';

class BookComponent extends React.Component {
    state = {
        books : [],
        loading : false,
        modalShow : false,
        showtoast : false,
        current_book : {}
    }

    async getAllBooks() {
        this.setState({ loading : true})
        let res = await getBooksFilter();
        this.setState({books : res, loading : false})
    }

    async openModalReserva(book) {
        this.setState({ current_book : book, modalShow : true });
    }

    async aceptedReserva(){
        this.setState({ showtoast : true, modalShow : false });

        setTimeout(() => {
            this.setState({ showtoast : false});
        }, 5000);
    }

    componentDidMount() {
        if(!this.state.books.length)
            this.getAllBooks()
    }

    render(){
        return (
            <div className="content-container-data">
                <TableComponent
                    books={this.state.books}
                    loading={this.state.loading}
                    actionTable={(e) => this.openModalReserva(e)}
                />    
                <ReservaModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow : false})}
                    book={this.state.current_book}
                    aceptedReserva={() => this.aceptedReserva()}
                    />

                <ToastComponent
                    showtoast={this.state.showtoast}
                    onHide={() => this.setState({ showtoast : false })}
                    title="Libro reservado"
                    mesage={"Libro reservado, acepte el préstamo."}
                    />     
            </div>
        );
    };
}

export default BookComponent;