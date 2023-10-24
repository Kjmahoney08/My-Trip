import React from 'react';
import { render, screen } from '@testing-library/react';
import Planner from '../../../src/components/Trip/Planner';
import { beforeEach, describe, test, jest, expect } from '@jest/globals';

describe('Planner', () => {
	const plannerProps = {
		createSnackBar: jest.fn(),
		places: [],
		selectedIndex: -1,
		placeActions: {
			append: jest.fn(),
		},
		distanceActions: {
			refresh: jest.fn(),
		},
		distances: [],
		distanceUnits: {unitType: 'Miles', earthRadius: 3959.0}
	};

	beforeEach(() => {
		render(<Planner {...plannerProps} />);
	});

	test('base: renders a Leaflet map', async () => {
		screen.getByText('Leaflet');
	});

	test('base: renders trip table', async () => {
		screen.getByTestId('trip-header-title');
	});
});
