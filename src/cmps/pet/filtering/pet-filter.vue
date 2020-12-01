<template>
  <section class="pet-filter">
    <!-- <h1>I am Filter</h1> -->
    <div class="filters">
      <div class="search-input">
        <search-input v-model="filter.txt" @input="debFilter" />
      </div>

      <div class="filters-togglebutton" @click="toggleFilters">Filter</div>
      <div class="filters flex column" v-if="isShowFilters">
        <pet-type-select @input="emitFilter" v-model="filter.type" />
        <pet-size-select @input="emitFilter" v-model="filter.size" />
        <pet-sort-select @input="emitFilter" v-model="filter.sortBy" />
        <div
          class="flex justify-center align-center"
          @click.stop="toggleFevorite"
        >
          <img
            class="like-svg fevorite"
            :class="{ isFevorite: isFav }"
            src="../../../assets/svgs/heart2.svg"
            alt=""
          />
          <span>Favorite</span>
        </div>
      </div>
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
      isShowFilters: false,
      isFav: false,
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
    toggleFilters() {
      this.isShowFilters = !this.isShowFilters;
    },
    toggleFevorite() {
      this.isFav = !this.isFav;
      this.$emit("isFav", this.isFav);
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