import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import Helmet from 'react-helmet';
import Spinner from 'react-spinner';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import $ from 'jquery';

import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LandingSignUpForm from '../../components/LandingSignUpForm/LandingSignUpForm';

@connect(
    state => ({}),
    dispatch => ({
        ...bindActionCreators({
            pushState
        }, dispatch)
    })
)
export default class Landing extends Component {
  state = {
    height: 0,
    width: 0,
    uses: ['Share answers with classmates', 'Schedule weekend plans', 'Organize your daily conversations'],
    branchName: ''
  }
  componentDidMount() {
    this.updateLandingSize()
    window.addEventListener('resize', ::this.updateLandingSize)
    $('body').removeClass('chat')
  }
  componentWillUnmount() {
    window.removeEventListener('resize', ::this.updateLandingSize)
  }
  updateLandingSize() {
    this.setState({
        height: this.refs.landing_page.clientHeight,
        width: this.refs.landing_page.clientWidth
    });
  }
  tooltip(text) {
    return (
        <Tooltip id={'wiki_input' + text}><b>{text}</b></Tooltip>
    )
  }
  render() {
    const { height, width, uses } = this.state;
    const { pushState } = this.props;
    const style = require('./Landing.scss');
    const logo = require('../../../static/flunkFontLogo.png');
    return (
      <div ref="landing_page" id={style.landing_page}>
        <Helmet title="Home"/>
        <div id={style.landing_page_wrapper}>
        	<div id={style.landing_header}>
        		<div id={style.landing_header_wrapper} className="relative clearfix">
	        		<div id={style.head_logo_link} className="float_left">
	        			<a id={style.headlink}>
	        				
	        			</a>
	        		</div>
	        		<div id={style.log_in_wrapper} className="float_right">
                        {
                            width > 695
	        			    ? 
                            <LogInForm inline={true}/>
                            : 
                            <button style={{marginTop: '20px'}} onClick={() => pushState(null, '/login')} className="button primary">Log In</button>
                        }
	        		</div>
        		</div>
        	</div>
        	<div id={style.landing_body}>
        		<div style={{height: '100%', width: '100%'}} className="display_flex flex_vertical flex_center">
        			<img style={{height: '40px', margin: '0 0 20px 0'}} src={logo}/>
                <h3 style={{color: '#fff', fontSize: '19px', textAlign: 'center', margin: '0 0 20px 0'}}>A messaging app for students to freely collaborate</h3>
                    <LandingSignUpForm/>
                    <h3 style={{fontSize: '19px', color: '#fff', padding: '0 0 10px 0', margin: '20px 0 10px 0', borderBottom: '2px solid #37DFA6', borderRadius: '0.1rem'}}>
                        Ways to use
                    </h3>
                    <ul style={{listStyleType: 'none', marginBottom: '40px'}} className="flex_vertical">
                        {
                            uses.map((use, i) => {
                                return (
                                    <li key={i} style={{textAlign: 'center', color: '#fff', fontSize: '15px', display: 'block', margin: '7.5px auto'}}>
                                        {use}
                                    </li>
                                )
                            })
                        }
                    </ul>
        		</div>
        	</div>
        	<div id={style.landing_footer}>
        		<div id={style.landing_footer_wrapper} className="relative">
        		<p>&copy; Flunk 2016. View our <a>Data Policy</a> and <a>Terms</a></p>
        		</div>
        	</div>
    	</div>
      </div>
    );
  }
}
