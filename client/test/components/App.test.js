import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, test } from '@jest/globals';
import { LOG } from '../../src/utils/constants';
import App from '../../src/components/App';
import * as cSettings from '../../src/hooks/useClientSettings';

describe('App', () => {
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
		jest.spyOn(cSettings, 'useClientSettings').mockImplementation(() => (mockClientSettings));
    });

    test('base: shows error snackbar if no server config', async () => {
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockReject(() => Promise.reject("API is down (expected)."));

        render(<App />);

        await screen.findByText(/failed/i);
    });
});

