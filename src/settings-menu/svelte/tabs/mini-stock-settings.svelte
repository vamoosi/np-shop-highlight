<script>
  import Tab from "../generic/tab/tab.svelte";
  import BooleanInput from "../generic/form/boolean-input.svelte";
  import Fieldset from "../generic/form/fieldset.svelte";
  import ColorInput from "../generic/form/color-input.svelte";
  import PaddingBox from "../generic/padding-box.svelte";
  import StyleSelect from "../generic/style-select.svelte";

  /** @type {MiniStockConfig} */
  export let config;
  export let styles;

</script>

<Tab title="Mini Stock">
  <PaddingBox>
    <BooleanInput label="Mini Stock Item Highlighting"
      bind:checked={config.enabled}/>

    <StyleSelect label="Fresh Item Style" bind:value={config.freshStyle} styles={styles} />
    <StyleSelect label="Stale Item Style" bind:value={config.staleStyle} styles={styles} />
  </PaddingBox>
</Tab>
