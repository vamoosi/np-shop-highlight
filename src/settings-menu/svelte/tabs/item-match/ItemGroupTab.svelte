<script>
  import NestedTab from '../../generic/tab/NestedTab.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import ItemGroupConfig from './ItemGroupConfig.svelte';
  import ItemGroupControl from './ItemGroupControl.svelte';

  const read = SvelteStore.readableStore();

  export let selection;

  export let groupId;

</script>

<NestedTab bind:selection={selection}
           name="{$read.itemMatch.groups[groupId].name}"
           tabId={groupId}>
  <ItemGroupConfig groupId="{groupId}" />
  <ItemGroupControl bind:selection={selection} />
</NestedTab>
