import React, { Component } from 'react';
import { pushState } from 'redux-router';
import Helmet from 'react-helmet';

import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';


export default class Landing extends Component {
  render() {
    const style = require('./Landing.scss'),
    brandLogo = require('../../components/ExploreBox/messengerLogo.png')
    return (
      <div id={style.landing_page}>
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
	        			<LogInForm inline={true}/>
	        		</div>
        		</div>
        	</div>
        	<div id={style.landing_body}>
        		<div id={style.landing_body_wrapper} className="clearfix">
        			<div id={style.main_img_wrapper}>
        			</div>
    				<div id={style.app_intro_txt}>
    					<h1>A messaging app to discover the world around you.</h1>
    					<h2>Open, discover and organize real time conversations into things that interest with you with friends, family and people in your community.
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
