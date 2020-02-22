<script>
  import Tab from '../generic/tab/Tab.svelte';
  import PaddingBox from '../generic/PaddingBox.svelte';
  import TextArea from '../generic/form/TextArea.svelte';
  import StyleSelect from '../generic/StyleSelect.svelte';
  import BooleanInput from '../generic/form/BooleanInput.svelte';
  import * as Lib from '../../ts/lib/item-match';
  import { SvelteStore } from '../../../lib/store/svelte';
  import NesetedTabPane from '../generic/tab/NesetedTabPane.svelte';
  import NestedTab from '../generic/tab/NestedTab.svelte';
  import TextInput from '../generic/form/TextInput.svelte';
  import ItemGroupTab from './item-match/ItemGroupTab.svelte';

  export let id;

  export let selected;

  /** @type {Writable<AppConfig>|AppConfig} */
  const write = SvelteStore.writableStore();

  /** @type {Readable<AppConfig>|AppConfig} */
  const read = SvelteStore.readableStore();

  let groupSelection = $write.itemMatch.order[0];
</script>

<Tab title="Item Match" bind:selected={selected} id="{id}">
  <NesetedTabPane>
    {#each $write.itemMatch.order as groupId}
      <ItemGroupTab bind:selection={groupSelection} groupId={groupId} />
    {/each}
  </NesetedTabPane>
</Tab>