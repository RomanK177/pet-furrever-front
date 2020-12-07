 <template>
  <ul class="adoption-request-preview">
    <li class="requsted-by" v-if="isOwner">
      <router-link :to="`/user/${request.adopter._id}`">{{
        abriviateAdopterName
      }}</router-link>
    </li>
    <li class="requsted-by" v-if="isAdopter">
      <router-link :to="`/user/${request.owner._id}`">{{
        abriviateOwnerName
      }}</router-link>
    </li>
    <li class="requsted-pet">
      <router-link :to="`/pet/${request.pet._id}`">{{
        request.pet.name
      }}</router-link>
    </li>
    <li class="requsted-at">{{ sentTime }}</li>
    <li class="bold requsted-status" :class="statusColor">{{ statusCap }}</li>

    <!-- <div class="resp=grp flex flex-end"> -->
    <li class="requsted-actions flex align-center content-center">
      <!-- <messages v-if="isShown" :request="request" :user="user" @addMessage="emitAddMessage">Message</messages> -->
      <button class="approve-btn" @click="emitUpdateAdoptionRequest(true)">
        Approve
      </button>
      <button
        v-if="canDecline"
        class="decline-btn"
        @click="emitUpdateAdoptionRequest(false)"
      >
        Decline
      </button>
      <!-- <button class="relative button-none">
        <router-link
          class="message-btn"
          :request="request"
          :user="user"
          :to="`/adoption/${request._id}`"
          >Message</router-link
        >
        <messages-status :messages="request.messages" />
      </button> -->
      <button
        class="decline-btn"
        v-if="canCancel"
        @click="emitUpdateAdoptionRequest(false)"
      >
        Cancel
      </button>
    </li>
    <li class="requsted-lastBtns flex align-center content-center">
      <button class="delete-btn button-none" @click="emitRemoveAdoptionRequest">
        <img src="../../assets/imgs/garbage.png" width="20" height="20" />
      </button>
      <button
        class="relative button-none message-btn"
        :request="request"
        :user="user"
        @click="messages"
      >
        <img src="../../assets/imgs/message.png" width="20" height="20" />
        <messages-status :messages="request.messages" />
      </button>
    </li>

    <!-- <el-button
          class="delete-adoption-request"
          @click="emitRemoveAdoptionRequest"
          >Delete</el-button
        > -->
  </ul>
</template>
<script>
import { petService } from "../../services/pet-service.js";
import messagesStatus from "../../cmps/user/messages-status.vue";
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
      isShown: false,
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
    },
    emitAddMessage(adoptionId, message) {
      debugger;
      this.$emit("addMessage", adoptionId, message);
    },
    toggleShowMessages() {
      this.isShown = !this.isShown;
    },
    messages() {
      this.$router.push(`/adoption/${this.request._id}`);
    },
  },
  computed: {
    sentTime() {
      let d = new Date(this.request.createdAt);
      // return d.toDateString();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = d;
      const month = dateObj.getMonth();
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const output = day + "." + month + "." + year;
      return output;
    },
    statusCap() {
      return (
        this.request.status.charAt(0).toUpperCase() +
        this.request.status.slice(1)
      );
    },
    statusColor() {
      if (this.request.status === "pending") {
        return "orange";
      } else if (this.request.status === "approved") {
        return "green";
      } else {
        return "red";
      }
    },
    abriviateAdopterName() {
      if (this.request.adopter.name.length > 10) {
        let strs = this.request.adopter.name.split(" ");
        let abrv =
          strs[0].charAt(0) +
          "." +
          strs[1].charAt(0) +
          "." +
          strs[2].charAt(0) +
          ".";
        return abrv;
      } else return this.request.adopter.name;
    },
    abriviateOwnerName() {
      if (this.request.owner.name.length > 8) {
        let strs = this.request.adopter.name.split(" ");
        let abrv =
          strs[0].charAt(0) +
          "." +
          strs[1].charAt(0) +
          "." +
          strs[2].charAt(0) +
          ".";
        return abrv;
      } else return this.request.owner.name;
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
      return canCancel;
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
      return isPending;
    },
  },
  async created() {
    const pet = await petService.getPetById(this.request.pet._id);
    this.pet = pet;
  },
  components: {
    messagesStatus,
  },
};
</script>