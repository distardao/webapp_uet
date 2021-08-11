/* eslint-disable no-undef */
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { IS_AUTH } from '../../constants/envVar';

// refresh token
import { refreshTokenSetup } from './refreshToken';

const clientId =
	'1006597644137-plgvccnt0d3keaojro5q3j69vkjudfvs.apps.googleusercontent.com';

function LoginHooks() {
	const onSuccess = (res) => {
		// console.log('🚀 ~ file: LoginGoogle.js ~ line 12 ~ onSuccess ~ res', res);
		// console.log('Login Success: currentUser:', res.profileObj);
		alert(
			`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
		);
		refreshTokenSetup(res);
		sessionStorage.setItem(IS_AUTH, res);
		if (res.profileObj) {
			window.location.replace('/');
		}
	};

	const onFailure = (res) => {
		console.log('Login failed: res:', res);
		alert(
			'Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz'
		);
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline',
		// responseType: 'code',
		// prompt: 'consent',
	});

	return (
		<>
			<button onClick={signIn} style={{ backgroundColor: '#EA4335', borderRadius: 10 }} className="btn btn-danger btn-block">
				<i className="fab fa-google fa-fw" /> Đăng nhập với Google
			</button>

		</>

	);
}

export default LoginHooks;