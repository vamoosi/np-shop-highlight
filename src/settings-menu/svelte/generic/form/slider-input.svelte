<style>
  span {
    display: block;
    font-size: 1.4em;
  }

  input[type=range] {
    width: 350px;
    padding: 0;
    position: relative;
    bottom: -5px;
  }

  input[type=number] {
    font-size: 1em;
    text-align: right;
    width: 2.5em;
    padding: 0;
    border-width:  0 0 1px 0;
  }
</style>

<script>
  import InputLabel from "./input-label.svelte";

  export let label = "";
  export let title = "";
  export let min = 0;
  export let max = 100;
  export let value = 50;
</script>

<InputLabel label="{label}" title="{title}">
  <span>
    <input type="range" min="{min}" max="{max}" bind:value={value}/>
    <input type="number" min="{min}" max="{max}" bind:value={value}/>%
  </span>
</InputLabel>