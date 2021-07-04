<script>
  import { page } from '$app/stores'
  import Store from '$lib/Store'
  const fetch = async () => {
    try {
      await Store.api(`/blogs/${$page.params.slug}`)
    } catch(error) {
      console.log(error)
    }
  }
  fetch()
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<section>
	<h1>{$page.params.slug}</h1>
  <slot />
</section>
