<script>
  import Tab from '../generic/tab/Tab.svelte';
  import SubTabPane from '../generic/StyleTabPane.svelte';

  export let id;

  export let selected;
</script>

<Tab title="Styles" bind:selected={selected} id="{id}">
  <SubTabPane/>
</Tab>
