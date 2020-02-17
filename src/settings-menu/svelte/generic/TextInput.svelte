<script>
  import InputLabel from "./InputLabel.svelte"

  export let label;
  export let styleClass;
  export let hint = '';
  export let value = "";

</script>

<style>
  @import "../../css/settings.css";

  input {
    display:       block;
    border-width:  0 0 1px 0;
    position:      relative;
    width:         50%;
    font-size:     1.2em;
    color:         var(--text-color);
    border-radius: 5px;
    line-height:   1.4em;
  }

  input:focus {
    border-width: 0 0 1px 0;
    outline:      none;
    border-color: #6db5ff;
  }
</style>

<InputLabel label="{label}" style="{styleClass}">
  <input type="text" placeholder="{hint}" value="{value}" class="{styleClass}" />
</InputLabel>