<script>
import Vue from 'vue';
import { OnoffToggle } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    OnoffToggle,
  }
});
</script>

<template>
  <div id="app">
    <onoff-toggle
      style="margin-right: 40px"
      onColor="#033753"
      :value="true"
    />
  </div>
</template>
