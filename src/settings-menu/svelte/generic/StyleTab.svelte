<script>
  import SubTab from './tab/NestedTab.svelte'
  import StyleConfig from '../tabs/StyleConfig.svelte';
  import StyleControl from '../style-control.svelte';

  /**
   * @type {HighlightStyle}
   */
  export let style;

  /**
   * ID of the currently selected style
   */
  export let selection;

</script>

<SubTab tabId="{style.id}" name="{style.name}" bind:selection="{selection}">
  <StyleConfig bind:style={style}/>
  <StyleControl bind:selected={selection}/>
</SubTab>
