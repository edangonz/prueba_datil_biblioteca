import React from 'react';
import { Spinner, Table } from 'react-bootstrap';

class TableReservaComponent extends React.Component {

    render(){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Codigo reserva</th>
                    <th>Codigo libro</th>
                    <th>Titulo del libro</th>
                    <th>Fecha de reservacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.books.map((e) => 
                        <tr key={e.id_borrowed_book} style={{ cursor : "pointer" }} onClick={() => this.props.actionTable(e)}>
                            <td>{e.id_borrowed_book}</td>
                            <td>{e.code_book}</td>
                            <td>{e.title}</td>
                            <td>{e.broadcast_date}</td>
                        </tr>
                        )
                    }
                    {!this.props.books.length && <tr>
                            <td colSpan="4">{this.props.loading ? <Spinner animation="border" /> : "No hay libros"}</td>
                        </tr>}
                </tbody>
            </Table>
        );
    };
}

export default TableReservaComponent;