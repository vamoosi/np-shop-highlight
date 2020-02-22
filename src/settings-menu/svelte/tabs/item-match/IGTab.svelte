<script>
  import NestedTab from '../../generic/tab/NestedTab.svelte';
  import ItemGroupConfig from './ItemGroupConfig.svelte';
  import ItemGroupControl from './IGControl.svelte';

  /** @type {number} */
  export let selection;

  /** @type {number} */
  export let groupId;

  /** @type {ItemHighlightGroup} */
  export let group;

</script>

<NestedTab bind:selection={selection}
           name="{group.name}"
           tabId={groupId}>
  <ItemGroupConfig bind:group={group} groupId="{groupId}" />
  <ItemGroupControl bind:selection={selection} />
</NestedTab>
