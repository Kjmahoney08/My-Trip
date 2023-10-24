import React from 'react';
import { act, getByRole, getByText, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import selectEvent from 'react-select-event'
import { expect, test, describe, beforeEach, jest } from '@jest/globals';
import { VALID_CONFIG_RESPONSE, INVALID_REQUEST } from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import ClientSettings from '../../../src/components/Header/ClientSettings';

describe('Preferences Modal', () => {
    const oldDistanceUnits = {unitType: 'Miles', earthRadius: 3959.0};
    const newDistanceUnits = {unitType: 'Custom Units', earthRadius: 10.0};

    const oldClientSettings = {
        distanceUnits: oldDistanceUnits,
    };
    const newClientSettings = {
        distanceUnits: newDistanceUnits,
    };
    
    const toggleOpen = jest.fn();
    const processClientConfigSuccess = jest.fn();

    let unitDropdown;
    let cancelButton;
    let saveButton;

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();

        jest.spyOn(LOG, 'error').mockImplementation(() => {});

        render(
            <ClientSettings
                isOpen={true}
                toggleOpen={toggleOpen}
                clientSettings={oldClientSettings}
                processClientConfigSuccess={processClientConfigSuccess}
                refreshDistances={jest.fn()}
            />
        );

        unitDropdown = screen.getByLabelText('units-dropdown');
        cancelButton = screen.getByRole('button', { name: /cancel/i });
        saveButton = screen.getByRole('button', { name: /save/i });
    });

    test('nritter8: renders when toggled', () => {
        screen.getByText(/Preferences/i);
    });

    test('nritter8: updates map dropdown value onChange', async () => {
        await selectEvent.select(unitDropdown, 'Kilometers');
        expect(screen.getByText(/kilometers/i)).toBeTruthy();
    });

    test('nritter8: shows custom radius prompt when custom units selected', async () => {
        await selectEvent.select(unitDropdown, 'Custom');
        expect(screen.getByText(/radius/i)).toBeTruthy();
    });

    test('nritter8: selected options get passed to processClientSettingsSuccess', async () => {
        await selectEvent.select(unitDropdown, 'Custom');

        user.type(screen.getByTestId('custom-input'), '10');

        user.click(saveButton);
        await waitFor(() => {
            expect(processClientConfigSuccess).toHaveBeenCalledWith(newClientSettings);
        });
    });

    test('nritter8: cancel button closes modal', async () => {
        user.click(cancelButton);

        await waitFor(() => {
            expect(toggleOpen).toHaveBeenCalled();
        })
    });
});