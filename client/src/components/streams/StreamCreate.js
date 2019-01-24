import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions';
import { connect } from 'react-redux';

class StreamCreate extends React.Component {
  handleError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="ui header">{error}</div>
        </div>
      );
    }
  }
  handleChange = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {/* {touched && (error && <span>{error}</span>)} */}
        <div>{this.handleError(meta)}</div>
        <br />
      </div>
    );
  };
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };
  render() {
    // console.log(this.props);
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.handleChange}
          label="Enter Your Name"
        />
        <Field
          name="description"
          component={this.handleChange}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Enter your name';
  }
  if (!formValues.description) {
    errors.description = 'Enter your Description';
  }
  return errors;
};
const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);
export default connect(
  null,
  { createStream }
)(formWrapped);
