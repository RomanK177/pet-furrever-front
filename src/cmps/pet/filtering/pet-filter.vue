<template>
  <section class="pet-filter">
    <!-- <h1>I am Filter</h1> -->
    <div class="flex filters">
      <search-input v-model="filter.txt" @input="debFilter" />
      <pet-type-select @input="emitFilter" v-model="filter.type" />
      <pet-size-select @input="emitFilter" v-model="filter.size" />
      <pet-sort-select @input="emitFilter" v-model="filter.sortBy" />
    </div>
  </section>
</template>

<script>
import petTypeSelect from "./pet-type-select";
import petSizeSelect from "./pet-size-select";
import petSortSelect from "./pet-sort-select ";
import searchInput from "./search-input";

export default {
  data() {
    return {
      filter: {
        txt: "",
        type: "All",
        size: "All",
        sortBy: null,
      },
      debTime: null,
    };
  },
  methods: {
    emitFilter() {
      const filter = JSON.parse(JSON.stringify(this.filter));
      this.$emit("filter", filter);
    },
    debFilter() {
      if (this.debTime) clearTimeout(this.debTime);
      this.debTime = setTimeout(() => this.emitFilter(), 500);
    },
    // emitSort() {
    // 	this.$emit('sort', this.sortBy);
    // },
  },
  components: {
    searchInput,
    petTypeSelect,
    petSizeSelect,
    petSortSelect,
  },
};
</script>