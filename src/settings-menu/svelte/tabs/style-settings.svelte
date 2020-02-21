<script>
  import Tab from '../generic/tab/tab.svelte';
  import SubTabPane from '../generic/sub-tab-pane.svelte';

  export let id;

  export let selected;
</script>

<Tab title="Styles" bind:selected={selected} id="{id}">
  <SubTabPane/>
</Tab>
