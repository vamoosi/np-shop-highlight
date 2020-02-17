<style>
  @import '../../css/settings.css';

  legend {
    font-size: 1.4em;
    color: var(--text-color);
    cursor: pointer;
    padding: 0 10px;
  }

  legend:after {
    content: " ▲";
  }

  fieldset {
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-bottom: 25px;
    transition: max-height 500ms ease-out;
    overflow: hidden;
    max-height: 100vh;
  }

  fieldset.collapsed {
    max-height: 1em;
  }

  fieldset.collapsed legend:after {
    content: " ▼";
  }
</style>

<script>
  export let legend = "";

  let collapsed = false;

  const toggle = () => {
    collapsed = !collapsed;
  }
</script>

<fieldset class:collapsed={collapsed}>
  {#if legend}
  <legend on:click={toggle}>{legend}</legend>
  {/if}
  <slot>

  </slot>
</fieldset>