import React, { useEffect, useState } from 'react';
import { Collapse } from 'reactstrap';
import Header from './Header/Header';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';
import { usePlaces } from '../hooks/usePlaces';
import { useClientSettings }  from '../hooks/useClientSettings'
import serverSettings from '../utils/serverSettings';
import { useDistances } from '../hooks/useDistances';

export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(	props.showMessage );
	const { clientSettings, processClientConfigSuccess, setTripName} = useClientSettings();
	const { places, selectedIndex, placeActions } = usePlaces();
	const { distances, distanceActions } = useDistances(places, clientSettings.distanceUnits.earthRadius);

	return (
		<>
			<Header
				showAbout={showAbout} toggleAbout={toggleAbout}
				placeActions={placeActions} distanceActions={distanceActions}
				disableRemoveAll={!places?.length}
				serverSettings={serverSettings} processServerConfigSuccess={processServerConfigSuccess}
				clientSettings={clientSettings} processClientConfigSuccess={processClientConfigSuccess}
				setTripName={setTripName}
			/>
			<MainContentArea
				showAbout={showAbout} toggleAbout={toggleAbout}
				places={places} distances={distances}
				selectedIndex={selectedIndex}
				placeActions={placeActions} distanceActions={distanceActions}
				clientSettings={clientSettings}
			/>
		</>
	);
}

function MainContentArea(props) {
	return (
		<div className='body'>
			<Collapse isOpen={props.showAbout}>
				<About closePage={props.toggleAbout} />
			</Collapse>
			<Collapse isOpen={!props.showAbout} data-testid='planner-collapse'>
				<Planner
					places={props.places} distances={props.distances}
					selectedIndex={props.selectedIndex}
					placeActions={props.placeActions} distanceActions={props.distanceActions}
					tripName={props.clientSettings.tripName}
					distanceUnits={props.clientSettings.distanceUnits}
				/>
			</Collapse>
		</div>
	);
}

function useServerSettings(showMessage) {
	const [serverUrl, setServerUrl] = useState(getOriginalServerUrl());
	const [serverConfig, setServerConfig] = useState(null);

	useEffect(() => {
		sendConfigRequest();
	}, []);

	function processServerConfigSuccess(config, url) {
		LOG.info('Switching to Server:', url);
		setServerConfig(config);
		setServerUrl(url);
		serverSettings.activeServerUrl = url;
	}

	async function sendConfigRequest() {
		const configResponse = await sendAPIRequest({ requestType: 'config' },serverUrl);
		if (configResponse) {
			processServerConfigSuccess(configResponse, serverUrl);
		} else {
			setServerConfig(null);
			showMessage(`Config request to ${serverUrl} failed. Check the log for more details.`, 'error');
		}
	}

	return [{ serverUrl: serverUrl, serverConfig: serverConfig }, processServerConfigSuccess,];
}
