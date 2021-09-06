import React from 'react';
import { getBorrowedBooks } from '../../../services/borrowed';
import TableBorrowedComponent from '../util/Table/TableBorrowed';

class BorrowedBookComponent extends React.Component {
    state = {
        books : [],
        loading : false,
    }

    async getAllBooks() {
        this.setState({ loading : true})
        let res = await getBorrowedBooks();
        this.setState({books : res, loading : false})
    }

    componentDidMount() {
        if(!this.state.books.length)
            this.getAllBooks()
    }

    render(){
        return (
            <div className="content-container-data">
                <TableBorrowedComponent
                    books={this.state.books}
                    loading={this.state.loading}
                />
            </div>
        )
    };
}

export default BorrowedBookComponent;