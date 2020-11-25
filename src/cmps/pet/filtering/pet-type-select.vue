<template>
  <el-select
    v-model="value"
    filterable
    placeholder="Pet Type"
    @change="emitChange"
  >
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
  props: {
    pets: Array,
  },
  data() {
    return {
      options: [
        {
          value: "Cats",
          label: "Cats",
        },
        {
          value: "Dogs",
          label: "Dogs",
        },
        {
          value: "Pigs",
          label: "Pigs",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
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
  created() {},
};
</script>