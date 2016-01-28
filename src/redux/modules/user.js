import {
	LOGIN_SUCCESS,
	SIGNUP_SUCCESS
} from './auth';

export const SHOW_ONBOARDING = 'BranchApp/user/SHOW_ONBOARDING';
export const NEXT_ONBOARDING_POPOVER = 'BranchApp/user/NEXT_ONBOARDING_POPOVER';
export const CLOSE_ONBOARDING = 'BranchApp/user/CLOSE_ONBOARDING';

const initialState = {
	onboarded: false,
	onboardingPopoverIndex: 0,
	popovers: [
		{
			title: 'These are you branches',
			content: 'Branches are pretty much conversations. They can be one-on-one, group based or even public forums where you can collaborate with communities, large and small',
			tip: 'To control privacy, pick a unique name that no one can guess.',
			placement: 'right',
			arrowTop: 26,
			arrowLeft: '',
			top: 60,
			left: 240
		},
		{
			title: 'These are your feeds',
			content: 'Feeds fit into branches and are a way to organize your converstions into topics, interests, projects, people or whatever else you\'d like.',
			tip: 'Feeds are better with your friends.',
			placement: 'right',
			arrowTop: 26,
			arrowLeft: '',
			top: 100,
			left: 240
		},
		{
			title: 'Open your first Branch',
			content: 'To open a new branch, type in a name of your choosing.',
			tip: 'Remember, branches are like web URLs. There are only so many names available.',
			placement: 'bottom',
			arrowTop: '',
			arrowLeft: 45,
			top: 50,
			left: 15
		}
	]
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case SHOW_ONBOARDING:
			return {
				...state,
				onboarded: false
			}
		case NEXT_ONBOARDING_POPOVER:
			return {
				...state,
				onboardingPopoverIndex: state.onboardingPopoverIndex + 1
			}
		case CLOSE_ONBOARDING:
			return {
				...state,
				onboarded: true,
				onboardingPopoverIndex: 0
			}
		default:
			return state;			
	}
}

export function showOnboarding() {
	return {
		type: SHOW_ONBOARDING
	}
}

export function nextOnboardingPopover() {
	return {
		type: NEXT_ONBOARDING_POPOVER
	}
}

export function closeOnboarding() {
	return {
		type: CLOSE_ONBOARDING
	}
}