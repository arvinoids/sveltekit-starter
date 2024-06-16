<script lang="ts">
	export let data;
	let products = data.products;
	import { currentUser, oAuthLogin, logout } from '$lib/pocketbase.js';
	import DarkToggle from '../components/DarkToggle.svelte';
	async function loginGoogle() {
		try {
			await oAuthLogin('google');
		} catch (e: any) {
			console.log(e.message);
		}
	}
</script>

<h1 class="text-2xl font-bold">These are the database data</h1>
<div>
	{#if products.length}
		<ul>
			{#each products as product}
				<li>{product.name}</li>
			{/each}
		</ul>
	{/if}
</div>
{#if !$currentUser}
	<button class="btn btn-primary" on:click={loginGoogle}>Login with Google</button>
{:else}<div class="m-2 p-4 text-lg bg-primary">Hello {$currentUser.name}</div>
	<button class="btn btn-warning" on:click={logout}>Logout</button><DarkToggle/>
{/if}
