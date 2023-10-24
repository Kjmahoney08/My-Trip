import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { VALID_CONFIG_RESPONSE } from '../sharedMocks';
import Page from '../../src/components/Page';
import * as cSettings from '../../src/hooks/useClientSettings';

describe('Page', () => {
	const mockClientSettings =  {
		clientSettings: {
			tripName: 'My Trip',
			mapFileType: 'svg',
			tripFileType: 'json',
			distanceUnits: { unitType: 'Miles', earthRadius: 3959.0 }
		},
		processClientConfigSuccess: jest.fn(),
		setTripName: jest.fn()
	};

	beforeEach(() => {
		fetch.resetMocks();
		fetch.mockResponse(VALID_CONFIG_RESPONSE);
		jest.spyOn(cSettings, 'useClientSettings').mockImplementation(() => (mockClientSettings));
		render(<Page />);
	});

	test('base: closes map and opens about when About button is clicked', async () => {
		const collapse = screen.getByTestId('planner-collapse');
		expect(collapse.classList.contains('show')).toBe(true);

		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));

		const toggleAboutButton = screen.getByTestId('about-button');
		user.click(toggleAboutButton);

		await waitFor(() => {
			expect(collapse.classList.contains('show')).toBe(false);
		});
	});

	test('base: Changes to close button on About page', async () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));
		const aboutButton = screen.getByTestId('about-button');
		await waitFor(() => user.click(aboutButton));
		const closeAboutButton = screen.getByTestId('close-about-button');
		expect(closeAboutButton).toBeTruthy();
		await waitFor(() => user.click(closeAboutButton));
		const collapse = screen.getByTestId('planner-collapse');
		await waitFor(() => expect(collapse.classList.contains('show')).toBe(true));
		expect(closeAboutButton.classList.contains('show')).toBe(false);
	});
});
