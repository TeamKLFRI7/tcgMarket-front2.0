import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	UPDATE_SUCCESS,
	UPDATE_FAIL
} from './types';

import AuthService from '../../services/auth-service';
// import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';

export const register = (username, email, password) => (dispatch) => {
	return AuthService.register(username, email, password).then(
		(response) => {
			dispatch({
				type: REGISTER_SUCCESS
			});

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: REGISTER_FAIL
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message
			});

			return Promise.reject();
		}
	);
};

export const update = (name, email, id, token) => (dispatch) => {
	return AuthService.update(name, email, id, token).then(
		(response) => {
			dispatch({
				type: UPDATE_SUCCESS
			});

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: UPDATE_FAIL
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message
			});

			return Promise.reject();
		}
	);
};

export const login = (username, password) => async (dispatch) => {
	// do login function from
	return await AuthService.login(username, password).then(
		(data) => {
			dispatch({
				type: LOGIN_SUCCESS, // if data is returned by the server fire action LOGIN_SUCCESS

				payload: { user: data } // pass the data to the user object
			});

			return Promise.resolve();
		},
		(error) => {
			if (error.response.data.message !== undefined) {
				dispatch({
					type: LOGIN_FAIL
				});

				dispatch({
					type: SET_MESSAGE,
					payload: error.response.data.message
				});

				return Promise.reject();
			}
		}
	);
};

export const logout = () => (dispatch) => {
	AuthService.Logout();

	dispatch({
		type: LOGOUT
	});
};
