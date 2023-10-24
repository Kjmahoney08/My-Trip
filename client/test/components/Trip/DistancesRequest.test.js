import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { MOCK_SINGLE_PLACE, SINGLE_DISTANCE_RESPONSE } from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import serverSettings from '../../../src/utils/serverSettings';
import { sendAPIRequest } from '../../../src/utils/restfulAPI';
import { getTotalDistance, getDistancesResponse } from '../../../src/components/Trip/Itinerary/DistancesRequest';

jest.mock('../../../src/utils/restfulAPI');

describe('DistancesRequest', () => {
    const validUrl = 'http://localhost:31400';
    const distances = [1,1,1];

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        jest.mock('../../../src/utils/serverSettings', () => ({activeServerUrl: 'http://localhost:31400'}));
        sendAPIRequest.mockResolvedValue(SINGLE_DISTANCE_RESPONSE);
    });

    test('nritter8: getTotalDistances returns the sum of its parameter distances', () => {
        const totalDistance = getTotalDistance(distances);
        expect(totalDistance).toEqual(3);
    });

    test('nritter8: getDistancesResponse works with a single place', async () => {
        serverSettings.activeServerUrl = validUrl;
        expect(serverSettings.activeServerUrl).toEqual(validUrl);

        const distances = await getDistancesResponse(MOCK_SINGLE_PLACE, 3959.0);
        expect(distances.length).toEqual(1);
    });
});