import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ authenticated, component: Component, ...props }) {
	return (
		<Route
			{...props}
			render={props => (
				authenticated ?
					<Component {...props} /> :
					<Redirect to='/login' />
			)}
		/>
	);
}
