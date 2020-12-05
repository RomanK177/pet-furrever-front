 
<template>
  <section
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    class="adoption-request-preview"
  >
    <!-- <div
      class="prev-content flex"
      :class="{ bold: isPending }"
      v-if="isCancelled"
    > -->
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
      <div class="request-btns">
        <!-- <button class="message-btn" @click="toggleShowMessages">Message</button> -->
          <router-link class="message-btn" :request="request" :user="user" :to="`/adoption/${request._id}`">Message</router-link>
        <!-- <messages v-if="isShown" :request="request" :user="user" @addMessage="emitAddMessage">Message</messages> -->
      </div>
      <div v-if="canApprove" class="request-btns">
        <button class="approve-btn" @click="emitUpdateAdoptionRequest(true)">
          Approve
        </button>
      </div>
      <div class="request-btns" v-if="canDecline">
        <button class="decline-btn" @click="emitUpdateAdoptionRequest(false)">
          Decline
        </button>
      </div>
      <div v-if="canDelete" class="request-btns">
        <button class="decline-btn" @click="emitRemoveAdoptionRequest">
          Delete
        </button>
      </div>

        <div v-if="canCancel" class="request-btns">
        <button class="decline-btn" @click="emitUpdateAdoptionRequest(false)">
          Cancel
        </button>
        <!-- <el-button
          class="delete-adoption-request"
          @click="emitRemoveAdoptionRequest"
          >Delete</el-button
        > -->
            </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
import messages from "../../cmps/user/messages.vue";
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
      isShown: false
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
    emitUpdateAdoptionRequest(action) {
      if (action === true) {
        this.request.status = "approved";
      } else if (action === false && this.user.userType === "adopter") {
        this.request.status = "cancelled";
      } else {
        this.request.status = "declined";
        this.pet.adoptedAt = null;
      }
      this.$emit("updateAdoption", this.request);
      // this.$emit('updatePet', this.pet)
    },
    emitRemoveAdoptionRequest() {
      if (this.user.userType === "owner") {
        this.$emit("removeAdoption", this.request);
      }
      console.log("deleted in preview", this.request);
    },
    emitAddMessage(adoptionId, message ) {
      console.log('new request', message)
      this.$emit("addMessage", adoptionId, message);
    },
    toggleShowMessages(){
      this.isShown = !this.isShown
    }
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
      const isOwner = this.user.userType === "owner" ? true : false;
      return isOwner;
      // if (this.user.userType === "owner") return true;
      // else return false;
    },
    canApprove() {
      const approvable =
        this.user.userType === "owner" &&
        (this.request.status === "pending" ||
          this.request.status === "declined")
          ? true
          : false;
      return approvable;
    },
    canDecline() {
      const declinable =
        this.user.userType === "owner" &&
        (this.request.status === "pending" ||
          this.request.status === "approved")
          ? true
          : false;
      return declinable;
    },
    canDelete() {
      const canDelete =
        this.user.userType === "owner" &&
        (this.request.status === "declined" ||
          this.request.status === "approved")
          ? true
          : false;
      return canDelete;
    },
    canCancel() {
      const canCancel =
        this.user.userType === "adopter" &&
        (this.request.status === "pending" ||
          this.request.status === "approved")
          ? true
          : false;
      return canCancel
    },
    isCancelled() {
      const isCancelled =
        this.request.status === "cancelled" && this.user.userType === "adopter"
          ? false
          : true;
      return isCancelled;
      // if (
      //   this.request.status === "cancelled" &&
      //   this.user.userType === "adopter"
      // )
      //   return false;
      // else return true;
    },
    isAdopter() {
      const isAdopter = this.user.userType === "adopter" ? true : false;
      return isAdopter;
      // if (this.user.userType === "adopter") return true;
      // else return false;
    },
    isPending() {
      const isPending = this.request.status === "pending" ? true : false;
      console.log(isPending);
      return isPending;
    },
  },
  async created() {
    const pet = await petService.getPetById(this.request.pet._id);
    this.pet = pet;
    console.log('req', this.request)
    // console.log("pet", this.pet);
    // console.log("user", this.user);
  },
  components: {
    messages,
  },
};
</script>