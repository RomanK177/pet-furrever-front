<template>
  <el-select v-model="value" placeholder="Select Pet Size" @change="emitChange">
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
          value: "Small",
          label: "Small",
        },
        {
          value: "Medium",
          label: "Medium",
        },
        {
          value: "Large",
          label: "Large",
        },
        {
          value: "Giant",
          label: "Giant",
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