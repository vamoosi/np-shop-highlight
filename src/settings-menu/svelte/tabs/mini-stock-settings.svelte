<script>
  import Tab from "../generic/Tab.svelte";
  import BooleanInput from "../generic/BooleanInput.svelte";
  import Fieldset from "../generic/Fieldset.svelte";
  import ColorInput from "../generic/ColorInput.svelte";
  import PaddingBox from "../generic/PaddingBox.svelte";
  import StyleSelect from "../generic/StyleSelect.svelte";

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
