import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, test, beforeEach, describe, jest } from '@jest/globals';
import { MOCK_PLACES } from "../../sharedMocks";

import Map from '../../../src/components/Trip/Map/Map';

describe('Map', () => {
    const mapProps = {
        places: MOCK_PLACES,
        placeActions: {
            append: jest.fn(),
        },
        distanceActions: {
            refresh: jest.fn(),
        }
    }

    beforeAll(() => {
        Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
    });

    beforeEach(() => {
        render(<Map {...mapProps} />);
    });

    test('base: appends calls append when the map is clicked', () => {
        user.click(screen.getByRole('presentation'));
        expect(mapProps.placeActions.append).toHaveBeenCalled();
    });
});