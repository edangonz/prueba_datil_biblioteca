import React from 'react';
import { Toast } from 'react-bootstrap';

class ToastComponent extends React.Component {
    render(){
        return (
            <div className="absolute-container-toast"> 
                <Toast show={this.props.showtoast} onClose={() => this.props.onHide()}>
                    <Toast.Header>
                        <strong className="me-auto" style={{ marginRight : "3rem" }}>{this.props.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{this.props.mesage}</Toast.Body>
                </Toast>
            </div>
        );
    };
}

export default ToastComponent;