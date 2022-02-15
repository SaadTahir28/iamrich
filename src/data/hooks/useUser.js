import { useCookies } from 'react-cookie';
import Cookies from '../Cookies';
import { AppConfig, showConnect, UserSession } from '@stacks/connect-react';
import * as constants from '../../util/constants';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function useUser() {
	const [cookies, setCookie, removeCookie] = useCookies([Cookies.KEY_USER]);
	const user = cookies[Cookies.KEY_USER];

	const login = (newUser) => {
		setCookie(Cookies.KEY_USER, newUser, { path: '/' });
		window.location.reload();
	};

	const logout = () => {
		removeCookie(Cookies.KEY_USER);
		window.location.reload();
	};

	return {
		user,
		isLoggedIn: !!user,
		login,
		logout,
		showHiroLogin: () => {
			showConnect({
				appDetails: {
					name: constants.appName,
					icon: window.location.origin + '/my-app-logo.svg'
				},
				redirectTo: '/',
				onFinish: () => {
					login(userSession.loadUserData());
				},
				userSession: userSession
			});
		}
	};
}
