<template>
  <el-select v-model="value" placeholder="Sort By" @change="emitChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "type",
          label: "Type",
        },
        {
          value: "size",
          label: "Size",
        },
        {
          value: "name",
          label: "Name",
        },
      ],
      value: "",
    };
  },
  methods: {
    emitChange() {
      this.$emit("input", this.value);
    },
  },
};
</script>