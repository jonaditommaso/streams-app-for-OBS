import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';


class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    

    renderActions(){

        const id = this.props.match.params.id

        return (
            <div>
                <button 
                    className="ui button negative"
                    onClick={()=> this.props.deleteStream(id)} 
                >
                    Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        );
    }


    renderContent() {
        if (!this.props.stream) {
            return 'Are u sure u want to delete this stream?'
        }
        return `Are you sure you want to delete the sream with title: ${this.props.stream.title}`
    }


    render(){
        return ( 
            <Modal
                title="Delete Stream (!)"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={()=> history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);