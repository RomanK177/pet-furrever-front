<template>
  <section class="adoption-messages" v-if="request">
    <div class="adoption-messages-all flex space-between container">
      <div v-if="pet" class="adopt-msg-pet-info flex column align-center">
        <h3>
          Chatting About <span class="bold orange">{{ request.pet.name }}</span>
        </h3>
        <img class="adoption-message-pet-img" :src="this.urls[0]" alt="" />
        <p class="adoption-msg-pet-bio">{{ pet.about }}</p>
        <div class="pet-bio-container flex wrap space-between">
          <div class="pet-details-age flex column align-center">
            <img class="age-svg" src="../../assets/svgs/age.svg" alt="" />
            <p class="pet-details-p">
              <span class="bold">Age:</span> {{ pet.age }}
            </p>
          </div>
          <div class="pet-details-gender flex column align-center">
            <img class="gender-svg" src="../../assets/svgs/gender.svg" alt="" />
            <p class="pet-details-p">
              <span class="bold">Gender:</span> {{ pet.gender }}
            </p>
          </div>
          <div class="pet-details-breed flex column align-center">
            <img src="../../assets/svgs/breed.svg" alt="" class="breed-svg" />
            <p class="pet-details-p">
              <span class="bold">Breed:</span> {{ pet.breed }}
            </p>
          </div>
        </div>
      </div>
      <div class="all-messages">
        <div class="fixed-height-container flex column">
          <div class="opposite-user-title flex justify-center">
            <img
              v-if="oppositeUser.img"
              class="opposite-user-img-title"
              :src="require(`@/assets/imgs/person/${oppositeUser.img}`)"
              alt=""
            />
            <h1>{{ oppositeUser.name }}</h1>
          </div>
          <div class="scroll" ref="messagesContainer">
            <div
              class="messages-adoption-messages"
              v-for="(message, index) in request.messages"
              :key="index"
            >
              <messages-preview :message="message" :user="user" />
            </div>
          </div>
        </div>
        <form @submit.prevent="addMessage" class="message-send">
          <input type="text" v-model="messageToAdd.txt" placeholder="Message" />
          <button>Send</button>
        </form>
      </div>
      <div class="opposite-user-details flex column">
        <h3>{{ oppositeUser.name }}</h3>
        <img
          v-if="oppositeUser.img"
          class="opposite-user-img"
          :src="require(`@/assets/imgs/person/${oppositeUser.img}`)"
          alt=""
        />
        <div class="opposite-owner-contact flex column">
        <p class="pet-details-owner-email flex flex-start">
          <img src="../../assets/svgs/email.svg" alt="" class="email-svg" />
          {{ oppositeUser.email }}
        </p>
        <p class="pet-details-owner-tel flex flex-start">
          <img src="../../assets/svgs/phone.svg" alt="" class="phone-svg" />
          {{ oppositeUser.tel }}
        </p>
        <p
          v-if="oppositeUser.location.name"
          class="location-details flex flex-start"
        >
          <img
            src="../../assets/svgs/location.svg"
            alt=""
            class="location-svg"
          />
          {{ oppositeUser.location.name }}
        </p>
        <div v-if="oppositeUser.ownedAPet">
          <p>Has Owned a pet</p>
        </div>
        </div>
        <ul class="nav-social flex justify-center">
          <li>
            <a href="www.facebook.com/login">
              <img
                class="social-facebook"
                :src="require(`@/assets/imgs/socials/fb.svg`)"
                alt=""
              />
            </a>
          </li>
          <li>
            <a href="www.instagram.com/login"
              ><img
                class="social-instagram"
                :src="require(`@/assets/imgs/socials/ig.svg`)"
                alt=""
              />
            </a>
          </li>
          <li>
            <a href="www.twitter.com/login">
              <img
                class="social-twitter"
                :src="require(`@/assets/imgs/socials/twitter.svg`)"
                alt=""
              />
            </a>
          </li>
        </ul>
        <small class="small" v-if="oppositeUser.type === 'owner'"
          >Please contact us if you have any other
          questions about the adoption! We are open Monday through Friday 8am- 6pm!</small>
           <small class="small" v-if="oppositeUser.type === 'adopter'"
          >Please contact me if you have any other
          questions. I would prefer to be contacted by email for any further questions.</small>
      </div>
    </div>
  </section>
</template>
<script>
import messagesPreview from "../../cmps/user/messages-preview.vue";
import socketService from "../../services/socket-service.js";

export default {
  components: { messagesPreview },
  data() {
    return {
      request: null,
      user: null,
      pet: null,
      oppositeUser: {
        name: "",
        img: "",
        tel: "",
        email: "",
        location: { name: "" },
        type: '',
        ownedAPet: null,
      },
      // allMessages: [],
      messageToAdd: {
        txt: "",
        date: "",
        from: "",
      },
      urls: null,
    };
  },
  methods: {
    async getUser(userId) {
      const user = await this.$store.dispatch({
        type: "getUserById",
        userId,
      });
      this.user = user;
      
    },
    async addMessage() {
      await this.$store.dispatch({
        type: "addMessage",
        adoptionId: this.request._id,
        message: this.messageToAdd.txt,
      });
      this.messageToAdd.txt = "";
    },
    async updateRequest() {
      const requestId = this.$route.params.id;
      const request = await this.$store.dispatch({
        type: "getAdoptionById",
        adoptionId: requestId,
      });
      this.request = request;
    },

    async getOppositeUser() {
      const ownerId = this.request.owner._id;
      const owner = await this.$store.dispatch({
        type: "getUserById",
        userId: ownerId,
      });
      console.log("owner", owner);
      const adopterId = this.request.adopter._id;
      const adopter = await this.$store.dispatch({
        type: "getUserById",
        userId: adopterId,
      });
      console.log("adopter", adopter);

      if (this.user.fullName !== this.request.adopter.name) {
        this.oppositeUser.name = adopter.fullName;
        this.oppositeUser.img = adopter.imgUrlProfile;
        this.oppositeUser.tel = adopter.tel;
        this.oppositeUser.email = adopter.email;
        this.oppositeUser.location = adopter.adopterData.location;
        this.oppositeUser.ownedAPet = adopter.adopterData.ownedAPet;
        this.oppositeUser.type = adopter.userType
        return this.oppositeUser;
      } else {
        this.oppositeUser.name = owner.fullName;
        this.oppositeUser.img = owner.imgUrlProfile;
        this.oppositeUser.tel = owner.tel;
        this.oppositeUser.email = owner.email;
        this.oppositeUser.location = owner.ownerData.location;
        this.oppositeUser.type = owner.userType
        return this.oppositeUser;
      }
    },
    isAdopter() {
      const owner = this.user.userType !== "owner" ? true : false;
      return owner;
    },

    isOwner() {
      const adopter = this.user.userType !== "adopter" ? true : false;
      return adopter;
    },
    scrollToEnd: function () {
      var content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight;
    },
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },

  // mounted() {
  //   this.$nextTick(() => this.scrollToEnd());
  // },
  async created() {
    await this.updateRequest();
    this.getUser()
    const user = this.$store.getters.getLoggedInUser;
    this.user = user;
    // const user = this.$store.getters.getLoggedInUser;
    // this.user = user;
    console.log("user in am", this.user);
    socketService.setup();
    socketService.emit("register chat room", this.request._id);
    socketService.on("new message", () => {
      // console.log('got new message');
      this.updateRequest();
    });
    // console.log(this.request)
    const petId = this.request.pet._id;
    const pet = await this.$store.dispatch({
      type: "getPetById",
      petId,
    });
    this.pet = pet;
    console.log("pet", this.pet);
    let newUrls = this.pet.imgUrls.map((url) => {
      let urlStart = url.slice(0, 4);
      if (urlStart === "http") return url;
      else return require(`../../assets/imgs/pets/${url}`);
    });
    this.urls = newUrls;
    console.log("req", this.request);
    console.log("user", this.user);

    this.getOppositeUser();
    // console.log("this opposite user", this.oppositeUser.name);
      // this.$store.dispatch({
      //   type: "markMessageAsUnread",
      //   adoptionRequestId: this.request._id,
      // });
  },
  computed: {
    // getUser() {
    //   const user = this.$store.getters.getLoggedInUser;
    //   console.log('get user function loggedin user', user)
    //   return user;

    // },
  },
  destroyed() {
    socketService.emit("leave chat room", this.request._id);
    socketService.terminate();
  },
};
</script>