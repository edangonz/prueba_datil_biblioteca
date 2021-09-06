import React from 'react';
import { deleteBorrowedBook, getAllBorrowedBooks } from '../../../services/borrowed';
import ConfirmarModal from '../Modal/Confirma.modal';
import TableBorrowedAdminComponent from '../util/Table/TableBorrowedAdmin';
import ToastComponent from '../util/Toast/Toast';

class BorrowedAdminBookComponent extends React.Component {
    state = {
        books : [],
        loading : false,
        temp_book : {},

        showModal : false,
        showtoast : false,
    }

    async getAllBooks() {
        this.setState({ loading : true})
        let res = await getAllBorrowedBooks();
        this.setState({books : res, loading : false})
    }

    openDeleteReserva(book){
        this.setState({ temp_book : book, showModal : true });
    }

    async borrovedBooks(){
        let res = await deleteBorrowedBook({id_borrowed_book : this.state.temp_book.id_borrowed_book});        
        if (res) {
            let temp_list = this.state.books.filter((e) => e.id_borrowed_book !== this.state.temp_book.id_borrowed_book);
            this.setState({ books : temp_list, temp_book : {}, showModal : false, showtoast : true});

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
                <TableBorrowedAdminComponent
                    books={this.state.books}
                    loading={this.state.loading}
                    actionTable={(e) => this.openDeleteReserva(e)}
                />

                <ConfirmarModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal : false })}
                    aceptedAccion={() => this.borrovedBooks()}
                    mesage={`¿Desea devolver ${this.state.temp_book.title} libros?`}/>

                <ToastComponent
                    showtoast={this.state.showtoast}
                    onHide={() => this.setState({ showtoast : false })}
                    title="Libros devuelto"
                    mesage={"Libros devuelto con exito"}
                    />
            </div>
        )
    };
}

export default BorrowedAdminBookComponent;