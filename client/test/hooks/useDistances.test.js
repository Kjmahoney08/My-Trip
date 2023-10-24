import '@testing-library/jest-dom';
import {act, renderHook} from '@testing-library/react-hooks';
import { beforeEach, describe, expect, test } from '@jest/globals';
import { MOCK_PLACES, MULTI_DISTANCES_RESPONSE } from '../sharedMocks';
import { LOG } from '../../src/utils/constants';
import { useDistances } from '../../src/hooks/useDistances';

describe('useDistances', () => {
    const places = MOCK_PLACES;

    let hook;

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();
        const { result } = renderHook(() => useDistances(places, 3959.0));
        hook = result;
    });

    test('nritter8: refreshDistances returns the correct number of distances', async () => {
        fetch.mockResponse(MULTI_DISTANCES_RESPONSE);

        await act(async () => {
            hook.current.distanceActions.refresh();
        });

        expect(hook.current.distances.length).toEqual(places.length);
    });

    test('nritter8: clear empties distance list', () => {
        act(() => {
            hook.current.distanceActions.clear();
        });

        expect(hook.current.distances.length).toEqual(0);
    });
});