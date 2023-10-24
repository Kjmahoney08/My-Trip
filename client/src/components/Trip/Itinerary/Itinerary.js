import React, { useState } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Table, Collapse, ModalFooter, Row, Col, Button } from 'reactstrap';
import { latLngToText, placeToLatLng } from '../../../utils/transformers';
import { BsChevronDown, BsTropicalStorm } from 'react-icons/bs';
import PlaceActions from './PlaceActions';

export default function Itinerary(props) {
	const [showOptimizeOptions, toggleOptimizeOptions] = useToggle(false);
	return (
		<Table responsive>
			<TripHeader
				tripName={props.tripName}
				distances={props.distances}
				distanceUnitType={props.distanceUnits.unitType}
			/>
			<PlaceList
				places={props.places} distances={props.distances}
				placeActions={props.placeActions} distanceActions={props.distanceActions}
				selectedIndex={props.selectedIndex}
			/>
			{/* <OptimizeArrow
				toggleOptimizeOptions={toggleOptimizeOptions}/>
			<OptimizeFooter
				places={props.places}
				showOptimizeOptions={showOptimizeOptions}/> */}
		</Table>
	);
}

function TripHeader(props) {
	return (
		<thead>
			<tr> 
				<th colSpan = {2} style={{textAlign: "right"}}>Total Distance: </th>
				<th id={'total-row-'} style={{textAlign: "center"}}>{getTotalDistance(props.distances)}</th>
			</tr>
			<tr>
				<th
					className='trip-header-title'
					data-testid='trip-header-title'
				>
					{props.tripName}
				</th>
				<th align="right">
					{props.distanceUnitType}
				</th>
				<th align="right">
					Cumulative
				</th>
				<th></th>
			</tr>
		</thead>
	);
}

function PlaceList(props) {
	return (
		<tbody>
			{props.places.map((place, index) => (
				<PlaceRow
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					placeActions={props.placeActions} distanceActions={props.distanceActions}
					selectedIndex={props.selectedIndex}
					index={index}
					distances={props.distances}
				/>
			))}
			<ReturnRow
				places={props.places}
				distances={props.distances}
			/>
		</tbody>
	);
}

function PlaceRow(props) {
	const [showFullName, toggleShowFullName] = useToggle(false);
	const name = props.place.defaultDisplayName;
	const location = latLngToText(placeToLatLng(props.place));
	return (
		<tr className={props.selectedIndex === props.index ? 'selected-row' : ''}>
			<td
				data-testid={`place-row-${props.index}`}
				onClick={() =>
					placeRowClicked(
						toggleShowFullName,
						props.placeActions.selectIndex,
						props.index
					)
				}
			>
				<strong>{name}</strong>
				<AdditionalPlaceInfo showFullName={showFullName} location={location} placeActions={props.placeActions} distanceActions={props.distanceActions} index={props.index} place={props.place}/>
			</td>
			<td id={`distance-row-${props.index}`} align="center">{getCurrentDistance(props.index, props.distances)}</td>
			<td id={`cumulative-row-${props.index}`} align="center">{getCumulativeDistance(props.index, props.distances)}</td>
			<RowArrow toggleShowFullName={toggleShowFullName} index={props.index}/>
		</tr>
	);
}

function AdditionalPlaceInfo(props) {
	return (
		<Collapse isOpen={props.showFullName}>
			{props.place.formatPlace().replace(`${props.place.defaultDisplayName}, `, '')}
			<br />
			{props.location}
			<br />
			<PlaceActions placeActions={props.placeActions} distanceActions={props.distanceActions} index={props.index} />
		</Collapse>
	);
}

function placeRowClicked(toggleShowFullName, selectIndex, placeIndex) {
	toggleShowFullName();
	selectIndex(placeIndex);
}

function RowArrow(props) {
	return (
		<td>
			<BsChevronDown data-testid={`place-row-toggle-${props.index}`} onClick={props.toggleShowFullName}/>
		</td>
	);
}

function ReturnRow(props) {
	if (props.places?.length > 1) {
		const name = props.places[0].defaultDisplayName;
		return (
			<tr className={'return-row'}>
				<td id={'return-name'}><strong>{`Return to ${name}`}</strong></td>
				<td id={'return-distance'} align='center'>{getCurrentDistance(-1, props.distances)}</td>
				<td id={'return-cumulative'} align='center'>{getTotalDistance(props.distances)}</td>
			</tr>
	);}
	else {
		return (<tr></tr>);
	}
}


function OptimizeArrow(props) {
	return (
		<Row>
			<Col>
                {`Optimize Trip`} 
			    <BsChevronDown data-testid={`optimize-toggle`} onClick={props.toggleOptimizeOptions}/>
			</Col>
		</Row>
	);
}

function OptimizeFooter(props){
	return(
		<Collapse isOpen={props.showOptimizeOptions}>
			<Button
                color='primary'
                onClick={() => {
                }}
                data-testid='Optimize-Trip-Button'
            >
                Optimize Trip
            </Button>
		</Collapse>
	);
}

function getCurrentDistance(index, distances) {
	try {
		if (index == 0) {
			return 0;
		}
		else if (index == -1) {
			return distances[distances.length-1]
		}
		return distances[index - 1];
	}
	catch (err) {
		return 0;
	}
}


function getCumulativeDistance(index, distances) {
	let cumulativeDistance = 0;
	try {
		for (let i = 0; i < index; i++) {
			cumulativeDistance += distances[i];
		}
		return cumulativeDistance;
	}
	catch (err) {
		return 0;
	}
}

function getTotalDistance(distances) {
	return getCumulativeDistance(distances.length, distances);
}
