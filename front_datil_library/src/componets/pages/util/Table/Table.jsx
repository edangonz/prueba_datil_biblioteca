import React from 'react';
import { Spinner, Table } from 'react-bootstrap';

class TableComponent extends React.Component {

    render(){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Codigo</th>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Ejemplares</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.books.map((e) => 
                        <tr key={e.code_book} style={{ cursor : "pointer" }} onClick={() => this.props.actionTable(e)}>
                            <td>{e.code_book}</td>
                            <td>{e.title}</td>
                            <td>{e.autor}</td>
                            <td>{e.stock}</td>
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

export default TableComponent;