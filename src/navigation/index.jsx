import { Route, Routes } from 'react-router-dom';
import Links from './Links';
import NonRichPage from '../pages/NonRichPage';
import RichestPersonPage from '../pages/RichestPersonPage';
import { AppConfig, UserSession } from '@stacks/connect-react';
import { useEffect, useState } from 'react';
import HiroService from '../services/HiroService';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function Navigation() {
	const [userSignedIn, setUserSignedIn] = useState(false);

	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
			  console.log("handlePendingSignIn: " + userData);
			});
		  } else if (userSession.isUserSignedIn()) {
			console.log("already signed in");
			const userData = userSession.loadUserData();
			setUserSignedIn(true);
		  } else {
			console.log("signed out");
			setUserSignedIn(false);
		  }
	}, [userSignedIn]);


	return (
		<Routes>
			<Route exact path={Links.LANDING} element={<NonRichPage />} />
			<Route exact path={Links.RICH_PAGE} element={<RichestPersonPage />} />
		</Routes>
	);
}
