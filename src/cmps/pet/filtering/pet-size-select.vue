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
          value: "small",
          label: "Small",
        },
        {
          value: "medium",
          label: "Medium",
        },
        {
          value: "large",
          label: "Large",
        },
        {
          value: "giant",
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