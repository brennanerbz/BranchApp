import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class DayDivider extends Component {
	static propTypes = {
	}

	render() {
		const { date } = this.props;
		const style = require('./Message.scss');
		return(
			<div className={style.day_divider}>
				<hr className="separator"/>
				<div className={style.day_divider_label}>
					{date.local().calendar(null, {
						sameDay: '[Today]',
					    nextDay: '[Tomorrow]',
					    nextWeek: 'dddd',
					    lastDay: '[Yesterday]',
					    lastWeek: '[Last] dddd',
					    sameElse: 'DD/MM/YYYY'
					})}
				</div>
			</div>
		);
	}
}