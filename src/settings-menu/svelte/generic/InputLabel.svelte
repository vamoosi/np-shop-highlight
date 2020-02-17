<script>
  export let label;
  export let styleClass;
  export let title;
</script>

<style>
  @import url('../../css/settings.css');

  label span:first-child {
    padding:   10px 0;
    display:   inline-block;
    font-size: 1.3em;
    color:     var(--text-color);
  }
</style>

<label class="{styleClass}" title="{title}">
  <span>{label}</span>
  <slot></slot>
</label>
