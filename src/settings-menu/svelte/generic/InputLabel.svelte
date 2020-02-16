<script>
  export let label;
  export let target;
  export let styleClass;
</script>

<style>
  label {
    padding:   10px 0;
    display:   inline-block;
    font-size: 1.3em;
    color:     #555555;
  }

  label.error {
    color: #933030;
  }

  label.ok {
    color: #428056;
  }
</style>

<label for="{target}" class="{styleClass}">{label}</label>
