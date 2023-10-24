import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { FIND_DAVE_RESPONSE } from '../sharedMocks';
import { LOG } from '../../src/utils/constants';
import serverSettings from '../../src/utils/serverSettings';
import { getFoundPlaces, getFindResponse } from '../../src/components/FindRequest';

describe('FindRequest', () => {
    const validUrl = 'http://localhost:31400';

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        jest.mock('../../src/utils/serverSettings', () => ({activeServerUrl: 'http://localhost:31400'}));
        fetch.mockResponse(FIND_DAVE_RESPONSE);
    });

    test('nritter8: find request returns a blank response with undefined server', async () => {
        serverSettings.activeServerUrl = undefined;
        expect(serverSettings.activeServerUrl).toBeUndefined();

        const response = await getFindResponse('', 10);
        expect(response).toEqual('');
    });

    test('nritter8: find request works with empty match string', async () => {
        serverSettings.activeServerUrl = validUrl;
        expect(serverSettings.activeServerUrl).toEqual(validUrl);

        const foundPlaces = await getFoundPlaces('test', 10);
        expect(foundPlaces.length).toEqual(1);
    });
});