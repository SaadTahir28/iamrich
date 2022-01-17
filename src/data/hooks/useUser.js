import { useCookies } from 'react-cookie';
import Cookies from '../Cookies';

export default function useUser() {
	const [cookies, setCookie, removeCookie] = useCookies([Cookies.KEY_USER]);
	const user = cookies[Cookies.KEY_USER];

	return {
		user,
		isLoggedIn: !!user,
		login: (newUser) => {
			setCookie(Cookies.KEY_USER, newUser, { path: '/' });
			window.location.reload();
		},
		logout: () => {
			removeCookie(Cookies.KEY_USER);
			window.location.reload();
		}
	};
}
