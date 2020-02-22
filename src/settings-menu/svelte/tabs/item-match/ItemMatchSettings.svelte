<script>
  import Tab from '../../generic/tab/Tab.svelte';
  import IGTabPane from './IGTabPane.svelte';

  export let id;

  export let selected;
</script>

<Tab title="Item Match" bind:selected={selected} id="{id}">
  <IGTabPane />
</Tab>