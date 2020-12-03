 
<template>
  <section
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    class="adoption-request-preview"
  >
    <div class="prev-content flex" v-if="isCancelled">
      <span class="requsted-id">{{ request._id }}</span>
      <span class="requsted-by">
        <router-link :to="`/user/${request.user._id}`" v-if="isOwner">{{
          request.user.name
        }}</router-link>
        <router-link :to="`/user/${request.owner._id}`" v-if="isAdopter">{{
          request.owner.name
        }}</router-link>
      </span>
      <span class="requsted-pet">
        <router-link :to="`/pet/${request.pet._id}`">{{
          request.pet.name
        }}</router-link>
      </span>
      <span class="requsted-at">{{ sentTime }}</span>
      <span class="requsted-status">{{ statusCap }}</span>

      <div class="approve" v-if="isOwner">
        <!-- <img
          @click="emiUpdateAdoptionRequest(true)"
          src="../../assets/imgs/green-check.png"
          alt=""
        /> -->
         <button class="adoption-request-action" @click="emiUpdateAdoptionRequest(true)">Approve</button>
      </div>
      <div class="decline">
        <!-- <img
          @click="emiUpdateAdoptionRequest(false)"
          src="../../assets/imgs/red-x.png"
          alt=""
        /> -->
        <button class="adoption-request-action" @click="emiUpdateAdoptionRequest(false)">Decline</button>
      </div>
      <div class="delete">
        <!-- <button @click="emitRemoveAdoptionRequest">Delete</button> -->
        <el-button
          class="delete-adoption-request"
          @click="emitRemoveAdoptionRequest"
          >Delete</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
export default {
  name: "adoptionrequestPreview",
  props: {
    request: Object,
    user: Object,
  },
  data() {
    return {
      areButtonsShown: false,
      pet: undefined,
    };
  },
  methods: {
    // async getAdopter() {
    //   let adopter = await this.$store.getters.getUserById(adopterId);
    //   return adopter;
    // },
    showButtons() {
      this.areButtonsShown = true;
    },
    hideButtons() {
      this.areButtonsShown = false;
    },
    emiUpdateAdoptionRequest(action) {
      if (action === true) {
        this.request.status = "approved";
      } else if (action === false && this.user.userType === "adopter") {
        this.request.status = "cancelled";
      } else {
        this.request.status = "declined";
      }
      this.$emit("updateAdoption", this.request);
    },
    emitRemoveAdoptionRequest() {
      if (this.request.status === "pending") {
        this.$alert(`Please Accept Or Decline Request Before Deleting`, {
          confirmButtonText: "OK",
        });
        return
      } 
      if (this.user.userType === "owner") {
        this.$emit("removeAdoption", this.request);
      }
      console.log("deleted in preview", this.request);
    },
  },
  computed: {
    sentTime() {
      let d = new Date(this.request.createdAt);
      return d.toDateString();
    },
    statusCap() {
      return (
        this.request.status.charAt(0).toUpperCase() +
        this.request.status.slice(1)
      );
    },
    getPetById() {
      let pet = this.$store.getters.getPetById(this.request.pet._id);
      return pet;
    },
    isOwner() {
      if (this.user.userType === "owner") return true;
      else return false;
    },
    isCancelled() {
      if (
        this.request.status === "cancelled" &&
        this.user.userType === "adopter"
      )
        return false;
      else return true;
    },
    isAdopter() {
      if (this.user.userType === "adopter") return true;
      else return false;
    },
  },
  async created() {
    const pet = await petService.getPetById(this.request.pet._id);
    this.pet = pet;
    console.log(this.request.owner);
  },
};
</script>