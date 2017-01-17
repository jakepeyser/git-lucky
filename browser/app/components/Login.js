import React from 'react';
import axios from 'axios';
import uuidV4 from 'uuid/v4';
import Logo from '../../src/images/logo.svg';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      uuid: uuidV4()
    }
  }

  componentDidMount() {
    axios.get('/api/auth/clientid')
      .then(res => {
        const { clientId } = res.data;
        this.setState({ clientId })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="login">
        <div className="wallpaper" />
        <div className="home-content">
          <a href={`https://github.com/login/oauth/authorize?state=${this.state.uuid}&response_type=code&client_id=${this.state.clientId}`}
            className={ this.state.clientId ? 'show' : '' }>
              <Logo />
              Login with GitHub
          </a>
        </div>
      </div>
    )
  }
}
