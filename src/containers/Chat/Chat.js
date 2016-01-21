import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import io from 'socket.io-client';

/* Components */
import ExploreBox from '../../components/ExploreBox/ExploreBox';
import Header from '../../components/ChatHeader/ChatHeader';
import Footer from '../../components/ChatFooter/ChatFooter';
import Navigation from '../Navigation/Navigation';
import Feed from '../Feed/Feed';

@connect(
  state => ({user: state.auth.user}),
  {pushState}
)
export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    
  };

  initSocket = () => {
    const socket = io('', {path: '/ws'});
    return socket;
  }

  componentDidMount() {
    global.socket = this.initSocket()
  }

  componentWillUnmount() {
    if (socket) {
    }
  }

  render() {
    const style = require('./Chat.scss');
    const {user} = this.props;

    return (
      <div id="chat" className="">
        <h1 className="">Chat</h1>
        <Header/>
        <ExploreBox/>
        <Navigation/>
        <Feed/>
        <Footer/>
      </div>
    );
  }
}
