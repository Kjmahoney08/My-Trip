import '@testing-library/jest-dom';
import {act, renderHook} from '@testing-library/react-hooks';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { MOCK_LOCAL_STORAGE } from '../sharedMocks';
import { LOG } from '../../src/utils/constants';
import { useClientSettings}  from '../../src/hooks/useClientSettings';

describe('useClientSettings', () => {
    const storedSettings = {
        mapFileType: 'kml',
        tripFileType: 'csv',
        distanceUnits: {unitType: "Kilometers", earthRadius: 6371.0},
        tripName: 'My Trip'
    };
    const defaultSettings = {
        mapFileType: 'svg',
        tripFileType: 'json',
        distanceUnits: {unitType: "Miles", earthRadius: 3959.0},
        tripName: 'My Trip'
    };

    let hook;
    let rerenderHook;

    const checkDefaultSettings = (() => {
        expect(hook.current.clientSettings.mapFileType).toEqual(defaultSettings.mapFileType);
        expect(hook.current.clientSettings.tripFileType).toEqual(defaultSettings.tripFileType);
        expect(hook.current.clientSettings.distanceUnits).toEqual(defaultSettings.distanceUnits);
    });

    const checkStoredSettings = (() => {
        expect(hook.current.clientSettings.mapFileType).toEqual(storedSettings.mapFileType);
        expect(hook.current.clientSettings.tripFileType).toEqual(storedSettings.tripFileType);
        expect(hook.current.clientSettings.distanceUnits).toEqual(storedSettings.distanceUnits);
    });

    let mockStorage = {};

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            mockStorage[key] = value;
        })
        global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
    });

    beforeEach(() => {
        mockStorage = {};

        jest.clearAllMocks();
        fetch.resetMocks();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});

        const { result, rerender } = renderHook(() => useClientSettings());
        hook = result;
        rerenderHook = rerender;
    });

    afterAll(() => {
        global.Storage.prototype.setItem.mockReset()
        global.Storage.prototype.getItem.mockReset()
    });

    test('nritter8: uses default settings if nothing stored', async () => {
        checkDefaultSettings();
    });

    test('nritter8: uses stored settings if in localStorage', async () => {
        localStorage.setItem('mapFileType', storedSettings.mapFileType);
        localStorage.setItem('tripFileType', storedSettings.tripFileType);
        localStorage.setItem('distanceUnits', JSON.stringify(storedSettings.distanceUnits));

        const { result } = renderHook(() => useClientSettings());

        hook = result;

        checkStoredSettings();
    });

    test('nritter8: changes current settings on processClientConfigSuccess', async () => {
        await act(async () => {
            hook.current.processClientConfigSuccess(storedSettings);
        });

        checkStoredSettings();
    });

    /*
    test('nritter8: stores settings on processClientConfigSuccess', async () => {
        await act(async () => {
            hook.current.processClientConfigSuccess(storedSettings);
        });

        expect(localStorage.getItem('mapFileType')).toEqual(storedSettings.mapFileType);
        expect(localStorage.getItem('tripFileType')).toEqual(storedSettings.tripFileType);
        expect(localStorage.getItem('distanceUnits')).toEqual(storedSettings.distanceUnits);
    });
    */
});
