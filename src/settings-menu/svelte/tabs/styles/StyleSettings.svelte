<script>
  import Tab from '../../generic/tab/Tab.svelte';
  import StyleTabPane from './StyleTabPane.svelte';

  // ID assigned by parent tab pane
  export let id;

  // Parent tab pane tab selection
  export let selected;
</script>

<Tab title="Styles" bind:selected={selected} id="{id}">
  <StyleTabPane/>
</Tab>
