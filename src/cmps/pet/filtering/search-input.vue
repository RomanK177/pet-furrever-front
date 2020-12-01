<template>
  <el-input
    class="search-input"
    placeholder="Search Pets"
    v-model="input"
    clearable
    @input="emitChange"
  >
  </el-input>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    emitChange() {
      this.$emit("input", this.input);
    },
  },
};
</script>