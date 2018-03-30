import { Region } from './types';

export const apiEndpoint = 'http://localhost:3002/';

export const getRegions = async (): Promise<Region[]> => {
    return await (await fetch(`${apiEndpoint}/regions`)).json();
};
