import React from 'react';
import { clientId } from './apis/ClientID';
import { connect } from 'react-redux';
import { signInaction, signOutaction } from './actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client: auth2', () => {
      window.gapi.client
        .init({
          clientId: clientId.id,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.signInListener(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.signInListener);
        });
    });
  }
  signInListener = isSignedIn => {
    if (isSignedIn) {
      return this.props.signInaction(this.auth.currentUser.get().getId());
    } else {
      return this.props.signOutaction();
    }
  };

  onSignInClick = () => {
    return this.auth.signIn();
  };
  onSignOutClick = () => {
    return this.auth.signOut();
  };

  renderAuth() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuth()}</div>;
  }
}
const mapState = state => {
  return { isSignedIn: state.authReducer.isSignedIn };
};
export default connect(
  mapState,
  { signInaction, signOutaction }
)(GoogleAuth);
