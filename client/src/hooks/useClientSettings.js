import React, { useState } from 'react';

export function useClientSettings() {
	const [mapFileType, setMapFileType] = useState(getStoredMapFileType());
	const [tripFileType, setTripFileType] = useState(getStoredTripFileType());
	const [distanceUnits, setDistanceUnits] = useState(getStoredDistanceUnits());
	const [tripName, setTripName] = useState('My trip');

	const clientSettings = { mapFileType: mapFileType, tripFileType: tripFileType, distanceUnits: distanceUnits, tripName: tripName }

	function processClientConfigSuccess(newClientSettings) {
		setMapFileType(newClientSettings.mapFileType);
		setTripFileType(newClientSettings.tripFileType);
		setDistanceUnits(newClientSettings.distanceUnits);

		storeMapFileType(mapFileType);
		storeTripFileType(tripFileType);
		storeDistanceUnits(distanceUnits);
	}
    return {clientSettings, processClientConfigSuccess, setTripName};
}

function getStoredMapFileType() {
	if (typeof(Storage) !== "undefined") {
		const fileType = localStorage.getItem('mapFileType');
		return fileType !== null && fileType !== undefined ? fileType : "svg";
	}
	return "svg";
}

function getStoredTripFileType() {
	if (typeof(Storage) !== "undefined") {
		const fileType = localStorage.getItem('tripFileType');
		return fileType !== null && fileType !== undefined ? fileType : "json";
	}
	return "json";
}

function getStoredDistanceUnits() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem('distanceUnits') !== undefined && localStorage.getItem('distanceUnits') !== null) {
		const jsonDistanceUnits = JSON.parse(localStorage.getItem('distanceUnits'));
		return jsonDistanceUnits;
	}
	return {unitType: "Miles", earthRadius: 3959.0};
}

function storeMapFileType(fileType) {
	localStorage.setItem('mapFileType', fileType);
}

function storeTripFileType(fileType) {
	localStorage.setItem('tripFileType', fileType);
}

function storeDistanceUnits(unit) {
	localStorage.setItem('distanceUnits', JSON.stringify(unit));
}