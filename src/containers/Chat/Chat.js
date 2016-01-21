import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import io from 'socket.io-client';

/* Components */
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

  componentDidMount() {
    // global.socket = this.initSocket()
  }

  initSocket = () => {
    const socket = io('', {path: '/ws'});
    return socket;
  }

  componentWillUnmount() {
    if (socket) {
      return;
    }
  }

  render() {
    const { user, appHeight, appWidth } = this.props,
    style = require('./Chat.scss');
    return (
      <div id={style.chat}>
        <Header/>
        <div 
          id={style.chat_body} 
          className="flex_vertical flex_spacer">
          <section className="flex_horizontal flex_spacer">
            <Navigation
              appHeight={appHeight}
              appWidth={appWidth}
            />
            <Feed
              appHeight={appHeight}
              appWidth={appWidth}
            />
          </section>
        </div>
        <Footer/>
      </div>
    );
  }
}


