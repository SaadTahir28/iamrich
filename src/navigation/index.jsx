import { Route, Routes } from 'react-router-dom';
import Links from './Links';
import NonRichPage from '../pages/NonRichPage';
import RichestPersonPage from '../pages/RichestPersonPage';
import { AppConfig, UserSession } from '@stacks/connect-react';
import { useEffect } from 'react';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function Navigation() {

	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
			  console.log("handlePendingSignIn: " + userData);
			});
		  } else if (userSession.isUserSignedIn()) {
			console.log("already signed in");
		  }
	});


	return (
		<Routes>
			<Route exact path={Links.LANDING} element={<NonRichPage />} />
			<Route exact path={Links.RICH_PAGE} element={<RichestPersonPage />} />
		</Routes>
	);
}
