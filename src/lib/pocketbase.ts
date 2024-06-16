import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE_URL as pbURL } from '$env/static/public'

export const pb = new PocketBase(pbURL); 

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});

export async function oAuthLogin(provider:'google'|'facebook'){
    await pb.collection('users').authWithOAuth2({ provider });
}

export function logout(){
    pb.authStore.clear();
}