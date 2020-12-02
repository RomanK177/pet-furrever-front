<template>
  <section class="pet-filter container">
    <!-- <h1>I am Filter</h1> -->
    <div class="filters container flex column justify-center">
      <div class="search-input flex">
        <search-input v-model="filter.txt" @input="debFilter" />
      <button class="filters-togglebutton" @click="toggleFilters">
        {{ buttonTxt ? 'Show More Filters' : 'Show Less Filters' }}
      </button>
      </div>
        <div class="filters flex" v-if="isShowFilters">
          <pet-type-select @input="emitFilter" v-model="filter.type" />
          <pet-size-select @input="emitFilter" v-model="filter.size" />
          <pet-sort-select @input="emitFilter" v-model="filter.sortBy" />
          <div
            class=" favorite-btn flex justify-center align-center"
            @click.stop="toggleFevorite"
          >
            <img
              class="like-svg fevorite"
              :class="{ isFevorite: isFav }"
              src="../../../assets/svgs/heart2.svg"
              alt=""
            />
            <span>Favorites</span>
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
      buttonTxt: true,
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
      this.buttonTxt = !this.buttonTxt


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