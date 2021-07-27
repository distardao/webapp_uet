import { SIDE_BAR_SHOW, SIDE_BAR_HIDE } from '../actionTypes';


export const sideBarShow = content => ({
	type: SIDE_BAR_SHOW,
	content
});

export const sideBarHide = content => ({
	type: SIDE_BAR_HIDE,
	content
});
