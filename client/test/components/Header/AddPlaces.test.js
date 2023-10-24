import React from 'react';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import AddPlace from '../../../src/components/Header/AddPlace';
import {
    REVERSE_GEOCODE_RESPONSE,
    MOCK_PLACE_RESPONSE,
	FIND_DAVE_RESPONSE,
	FIND_DAVE_PLACES,
  SINGLE_DISTANCE_RESPONSE,
} from '../../sharedMocks';
import { act } from 'react-dom/test-utils';
import { getFoundPlaces } from '../../../src/components/FindRequest';

jest.mock('../../../src/components/FindRequest');
 
describe('AddPlace', () => {
    const placeObj = {
        latLng: '40.57, -105.085',
        name: 'Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States',
    };

	const placeObj2 = {
		latLng: '50.35, -106.093',
	};

	const daveObj = {
		latLng: '40.03, -105.12',
		name: 'Dave\'s Airport, Louisville, Colorado, United States',
		match: 'Dave\'s Airport',
	};

	let serverSettings = {
		serverConfig : {
			features : ["find", "type", "where"],
			type: ["airport"],
			where: ["Canada"],
		},
	}

	const props = {
		toggleAddPlace: jest.fn(),
		append: jest.fn(),
		refreshDistances: jest.fn(),
		isOpen: true,
		serverSettings,
	};

	let coordInput;
	let randomButton;
	let clearButton;
 
    beforeEach(() => {
		jest.clearAllMocks();
		fetch.resetMocks();
        render(
            <AddPlace
                append={props.append}
                isOpen={props.isOpen}
                toggleAddPlace={props.toggleAddPlace}
				refreshDistances={props.refreshDistances}
				serverSettings={props.serverSettings}
            />
        );
		coordInput = screen.getByTestId('coord-input');
		randomButton = screen.getByTestId('random-button');
		clearButton = screen.getByTestId('clear-query-button');
    });
 
    test('wittichd: validates input', async () => {
		user.type(coordInput, placeObj2.latLng);

		await waitFor(() => {
			expect(coordInput.value).toEqual(placeObj2.latLng);
		});
	});

	test('nritter8: expands filter options when arrow clicked', () => {
	 	const toggle = screen.getByTestId('filter-toggle');
	 	expect(screen.getByText(/Filter Options/i)).toBeTruthy();

	 	user.click(toggle);
		expect(screen.getByText(/location type/i)).toBeTruthy();
	});

	test('wittichd: Testing Clear Query Button', async () =>{
		user.type(coordInput, placeObj2.latLng);

		await waitFor(() => {
			expect(coordInput.value).toEqual(placeObj2.latLng);
		});

		user.click(clearButton);

		await waitFor(() => {
			expect(coordInput.value).toEqual("");
		});

	});

	// test('wittichd: Testing invalid input', async () =>{
	// 	user.type(coordInput, '1');

	// 	await waitFor(() =>{
	// 		expect(coordInput.value).toEqual('1');
	// 	});

	// 	expect(clearButton.classList.contains('disabled')).toBe(true);
	// });

	test('nritter8: places properly render when found', async () => {
		getFoundPlaces.mockResolvedValue(FIND_DAVE_PLACES);
		user.type(coordInput, 'dave');
		await waitFor(() => {
			expect(coordInput.value).toEqual('dave');
		});

		await waitFor(() => {
			expect(screen.getByText(/Dave's Airport/i)).toBeTruthy();
		});
	});

	test('nritter8: add place button updates places list', async () => {
		getFoundPlaces.mockResolvedValue(FIND_DAVE_PLACES);
		user.type(coordInput, 'dave');
		await waitFor(() => {
			expect(coordInput.value).toEqual('dave');
		});

		const addButton = screen.getByTestId('add-place-button-0');
		user.click(addButton);
		expect(props.append).toBeCalled();
	});

	test('wittichd: random button sends request for random place', () => {
		user.click(randomButton);
		expect(getFoundPlaces).toBeCalledWith('', [], [], 1);
	});

	test('nritter8: typing coordinates renders a found place', async () => {
		fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);
		user.type(coordInput, placeObj.latLng);
		await waitFor(() => {
			expect(coordInput.value).toEqual(placeObj.latLng);
		});

		expect(screen.getByText(/Colorado/i)).toBeTruthy()
	});

	// test(': Rendering heading with objects name', async () => {
	// 	fetch.mockResponse(FIND_DAVE_RESPONSE);

	// 	user.paste(coordInput, daveObj.match);
	// 	await waitFor (() => {
	// 		expect(coordInput.value).toEqual(daveObj.match);
	// 	});

	// 	screen.getByRole('heading', {name:daveObj.name});
    // });

//  test('base: handles invalid input', async () => {
//      const coordInput = screen.getByTestId('coord-input');
//      user.paste(coordInput, '1');
 
//      await waitFor(() => {
//          expect(coordInput.value).toEqual('1');
//      });
 
//      const addButton = screen.getByTestId('add-place-button');
//      expect(addButton.classList.contains('disabled')).toBe(true);
//  });
 
//  test('base: Adds place', async () => {
       
//      fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);
//      const coordInput = screen.getByTestId('coord-input');
//      user.type(coordInput, placeObj.latLng);
 
//      await waitFor(() => {
//          expect(coordInput.value).toEqual(placeObj.latLng);
//      });
 
//      const addButton = screen.getByTestId('add-place-button');
//      expect(addButton.classList.contains('disabled')).toBe(false);
//      await waitFor(() => {
//          user.click(addButton);
//      });
//      expect(props.append).toHaveBeenCalledWith(MOCK_PLACE_RESPONSE);
//      expect(coordInput.value).toEqual('40.57, -105.085');
//  });
});
