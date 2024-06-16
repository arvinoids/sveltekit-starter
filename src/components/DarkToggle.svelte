<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	let dark = false;

	onMount(() => {
		dark = $currentUser?.prefers_dark ?? false;
	});

	async function saveUserMode(mode: boolean) {
		await pb.collection('users').update($currentUser?.id, { prefers_dark: dark });
	}
	$: {
        document.documentElement.setAttribute('data-theme', dark ? 'forest': 'pastel');
        saveUserMode(dark);
        }
</script>

<div>
	<label class="swap swap-rotate">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" bind:checked={dark} />
		<div class="swap-off"><Icon icon="ic:round-light-mode" /></div>
		<div class="swap-on"><Icon icon="ic:round-dark-mode" /></div>
	</label>
</div>
