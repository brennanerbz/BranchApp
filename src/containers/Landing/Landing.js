import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import Helmet from 'react-helmet';
import Spinner from 'react-spinner';

import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

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
    width: 0
  }
  componentDidMount() {
    this.updateLandingSize()
    window.addEventListener('resize', ::this.updateLandingSize)
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
  render() {
    const { height, width } = this.state;
    const { pushState } = this.props;
    const style = require('./Landing.scss');
    const brandLogo = require('./messengerLogo.png');
    return (
      <div ref="landing_page" id={style.landing_page}>
        <Helmet title="Home"/>
        <div id={style.landing_page_wrapper}>
        	<div id={style.landing_header}>
        		<div id={style.landing_header_wrapper} className="relative clearfix">
	        		<div id={style.head_logo_link} className="float_left">
	        			<a id={style.headlink}>
	        				<div className="inline_block">
	        					<img id={style.brand_logo} src={brandLogo}/>
	        				</div>
	        				<h1 id={style.brand_name} className="inline_block">
	        					<div id={style.brand_link}>Branch</div>
	        				</h1>
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
        		<div id={style.landing_body_wrapper} className="clearfix">
        			<div id={style.main_img_wrapper}>
        			</div>
    				<div id={style.app_intro_txt}>
    					<h1>Simple. Personal. Organized messaging.</h1>
    					<h2>Open, discover and organize real time conversations about things that interest with you with friends, family and people in your community.
    					</h2>
    				</div>
    				<div id={style.app_register_form}>
    					<SignUpForm 
                            landing={true}
    					/>
    				</div>
        		</div>
        	</div>
        	<div id={style.landing_footer}>
        		<div id={style.landing_footer_wrapper} className="relative">
        		<p>&copy; Branch 2015. View our <a>Data Policy</a> and <a>Terms</a></p>
        		</div>
        	</div>
    	</div>
      </div>
    );
  }
}
