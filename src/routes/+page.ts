import type { PageLoad } from './$types';
import { pb } from '$lib/pocketbase';
export const ssr = false;

export const load = (async () => {
    return {
        products:await pb.collection('friday_products').getFullList()
    };
}) satisfies PageLoad;