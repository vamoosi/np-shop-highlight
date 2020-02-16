<script>
  import InputLabel from "./InputLabel.svelte"

  export let label;
  export let name;
  export let styleClass;
  export let hint = '';

  export const getId = () => `input-${name}`;
</script>

<style>
  input {
    display:       block;
    margin-bottom: 20px;
    border-width:  0 0 1px 0;
    position:      relative;
    width:         50%;
    font-size:     1.2em;
    color:         #555555;
    border-radius: 5px;
    line-height:   1.4em;
  }

  input.error {
    background-color: #ffbab7;
  }

  input.ok {
    background-color: #c0ffc2;
  }

  input:focus {
    border-width: 0 0 1px 0;
    outline:      none;
    border-color: #6db5ff;
  }
</style>

<InputLabel label="{label}" target="{getId()}" style="{styleClass}" />
<input type="text" id="{getId()}" name="{name}" placeholder="{hint}" class="{styleClass}" />