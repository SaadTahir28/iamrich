import { Route, Routes } from 'react-router-dom';
import Links from './Links';
import NonRichPage from '../pages/NonRichPage';
import RichestPersonPage from '../pages/RichestPersonPage';
import useUser from '../data/hooks/useUser';

export default function Navigation() {
	const { isLoggedIn } = useUser();

	return (
		<Routes>
			<Route exact path={Links.LANDING} element={!isLoggedIn ? <NonRichPage /> : <RichestPersonPage />} />
		</Routes>
	);
}
