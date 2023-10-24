import React from 'react';
import { Container, Button } from 'reactstrap';
import { CLIENT_TEAM_NAME } from '../../utils/constants';
import Menu from './Menu';
import { useToggle } from '../../hooks/useToggle';
import AddPlace from './AddPlace';
import LoadFile from './LoadFile';
import ServerSettings from './ServerSettings';
import ClientSettings from './ClientSettings';
import { IoMdClose } from 'react-icons/io';

export default function Header(props) {
	const [showAddPlace, toggleAddPlace] = useToggle(false);
	const [showServerSettings, toggleServerSettings] = useToggle(false);
	const [showClientSettings, toggleClientSettings] = useToggle(false);
	const [showLoadFile, toggleLoadFile] = useToggle(false);
	return (
		<React.Fragment>
			<HeaderContents
				showAbout={props.showAbout} toggleAbout={props.toggleAbout}
				placeActions={props.placeActions} distanceActions={props.distanceActions}
				disableRemoveAll={props.disableRemoveAll}
				toggleAddPlace={toggleAddPlace}
				toggleServerSettings={toggleServerSettings}
				toggleClientSettings={toggleClientSettings}
				toggleLoadFile={toggleLoadFile}
				/>
			<AppModals
				showAddPlace={showAddPlace} toggleAddPlace={toggleAddPlace}
				showLoadFile={showLoadFile} toggleLoadFile={toggleLoadFile}
				showServerSettings={showServerSettings} toggleServerSettings={toggleServerSettings}
				showClientSettings={showClientSettings} toggleClientSettings={toggleClientSettings}
				placeActions={props.placeActions} distanceActions={props.distanceActions}
				serverSettings={props.serverSettings} processServerConfigSuccess={props.processServerConfigSuccess}
				clientSettings={props.clientSettings} processClientConfigSuccess={props.processClientConfigSuccess}
				setTripName={props.setTripName}/>
		</React.Fragment>
	);
}

function HeaderContents(props) {
	return (
		<div className='full-width header vertical-center'>
			<Container>
				<div className='header-container'>
					<h1
						className='tco-text-upper header-title'
						data-testid='header-title'
					>
						{CLIENT_TEAM_NAME}
					</h1>
					<HeaderButton {...props} />
				</div>
			</Container>
		</div>
	);
}

function HeaderButton(props) {
	return props.showAbout ? (
		<Button
			data-testid='close-about-button'
			color='primary'
			onClick={() => props.toggleAbout()}
		>
			<IoMdClose size={32} />
		</Button>
	) : (
		<Menu
			toggleAbout={props.toggleAbout}
			placeActions={props.placeActions} distanceActions={props.distanceActions}
			toggleAddPlace={props.toggleAddPlace}
			toggleLoadFile={props.toggleLoadFile}
			disableRemoveAll={props.disableRemoveAll}
			toggleServerSettings={props.toggleServerSettings}
			toggleClientSettings={props.toggleClientSettings}
		/>
	);
}

function AppModals(props) {
	return (
		<>
			<AddPlace
				isOpen={props.showAddPlace}
				toggleAddPlace={props.toggleAddPlace}
				append={props.placeActions.append}
				refreshDistances={props.distanceActions.refresh}
				serverSettings={props.serverSettings}
			/>
			<ServerSettings
				isOpen={props.showServerSettings}
				toggleOpen={props.toggleServerSettings}
				processServerConfigSuccess={props.processServerConfigSuccess}
				serverSettings={props.serverSettings}
			/>
			<ClientSettings
				isOpen={props.showClientSettings}
				toggleOpen={props.toggleClientSettings}
				clientSettings={props.clientSettings}
				processClientConfigSuccess={props.processClientConfigSuccess}
				refreshDistances={props.distanceActions.refresh}
			/>
			<LoadFile
				isOpen={props.showLoadFile}
				toggleLoadFile={props.toggleLoadFile}
				placeActions={props.placeActions} distanceActions={props.distanceActions}
				setTripName={props.setTripName}
			/>
		</>
	);
}
