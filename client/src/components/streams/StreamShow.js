import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    let { title, description } = this.props.stream;
    return (
      <div>
        <h3>{title}</h3>
        <div>{description}</div>
      </div>
    );
  }
}
const mapState = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapState,
  { fetchStream }
)(StreamShow);
