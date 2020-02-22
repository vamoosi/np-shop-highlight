<script>
  import Tab from '../generic/tab/Tab.svelte';
  import StyleTabPane from '../generic/StyleTabPane.svelte';

  export let id;

  export let selected;
</script>

<Tab title="Styles" bind:selected={selected} id="{id}">
  <StyleTabPane/>
</Tab>
