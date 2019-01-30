import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  contentToDelete() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    let { title, description } = this.props.stream;

    return (
      <React.Fragment>
        <div>{title}</div>
        <div>{description}</div>
      </React.Fragment>
    );
  }

  action() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.contentToDelete()}
        action={this.action()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}
const mapState = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapState,
  { fetchStream, deleteStream }
)(StreamDelete);
