<script>
  import NestedTabPane from '../../generic/tab/NestedTabPane.svelte';
  import ItemGroupTab from './IGTab.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte'

  /** @type {Readable<AppConfig>|AppConfig} */
  const write = SvelteStore.writableStore();

  let groupSelection = $write.itemMatch.order[0];
</script>
<NestedTabPane>
  {#each $write.itemMatch.order as groupId}
    <ItemGroupTab bind:selection={groupSelection}
                  bind:group={$write.itemMatch.groups[groupId.toString()]}
                  groupId={groupId} />
  {/each}
</NestedTabPane>
