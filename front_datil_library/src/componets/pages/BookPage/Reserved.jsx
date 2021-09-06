import React from 'react';
import { Button } from 'react-bootstrap';
import { getReserveBooks, updateReserveBooks } from '../../../services/reserva.service';
import ConfirmarModal from '../Modal/Confirma.modal';
import TableReservaComponent from '../util/Table/TableReserved';
import ToastComponent from '../util/Toast/Toast';

class ReservedBookComponent extends React.Component {
    state = {
        books : [],
        loading : false,
        showModal : false,
        showtoast : false,
    }

    async getAllBooks() {
        this.setState({ loading : true})
        let res = await getReserveBooks();
        console.log(res);
        this.setState({books : res, loading : false})
    }

    async openDeleteReserva(book) {
        let temp_list = this.state.books.filter((e) => e.id_borrowed_book !== book.id_borrowed_book);
        this.setState({ books : temp_list })
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
                    mesage={`Desea prestar ${this.state.books.length} libros`}/>

                <ToastComponent
                    showtoast={this.state.showtoast}
                    onHide={() => this.setState({ showtoast : false })}
                    title="Libros prestado"
                    mesage={"Libros prestados con exito"}
                    />     
            </div>
        );
    };
}

export default ReservedBookComponent;