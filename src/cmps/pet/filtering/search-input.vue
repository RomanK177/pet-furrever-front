<template>
  <el-input
    placeholder="Please input"
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