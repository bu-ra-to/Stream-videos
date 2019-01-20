import React from 'react';
import { clientId } from './apis/ClientID';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client: auth2', () => {
      window.gapi.client.init({
        clientId: clientId.id,
        scope: 'email'
      });
    });
  }
  render() {
    return <div>GoogleAuth</div>;
  }
}
export default GoogleAuth;
