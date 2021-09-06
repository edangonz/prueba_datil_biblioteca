import React from 'react';
import { Spinner, Table } from 'react-bootstrap';

class TableBorrowedComponent extends React.Component {

    calculateReturnDate(current_date) {
        let date = new Date(current_date);
        let new_date = new Date(date.getTime() + 2592000000);
        return `${new_date.getFullYear()}-${new_date.getMonth() + 1}-${new_date.getDate() + 1}`;
    }

    calculateMulta(current_date){
        let date = new Date(current_date);
        let new_date = new Date(date.getTime() + 2592000000);
        return (new_date.getTime() < (new Date()).getTime())? "Si" : "No";
    }

    render(){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo reserva</th>
                        <th>Codigo libro</th>
                        <th>Titulo del libro</th>
                        <th>Fecha de prestamo</th>
                        <th>Fecha de devolución</th>
                        <th>Multa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.books.map((e) => 
                        <tr key={e.id_borrowed_book}>
                            <td>{e.id_borrowed_book}</td>
                            <td>{e.code_book}</td>
                            <td>{e.title}</td>
                            <td>{e.broadcast_date}</td>
                            <td>{this.calculateReturnDate(e.broadcast_date)}</td>
                            <td>{this.calculateMulta(e.broadcast_date)}</td>
                        </tr>
                        )
                    }
                    {!this.props.books.length && <tr>
                            <td colSpan="6">{this.props.loading ? <Spinner animation="border" /> : "No hay libros"}</td>
                        </tr>}
                </tbody>
            </Table>
        );
    };
}

export default TableBorrowedComponent;