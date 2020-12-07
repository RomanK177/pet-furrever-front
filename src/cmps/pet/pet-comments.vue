<template>
  <div class="comments-container container">
    <h1 class="pet-details-comments-title">Comments</h1>
    <!-- <hr /> -->
    <form @submit.prevent="addComment">
      <input
        v-model="commentToAdd.txt"
        class="comment-input"
        type="text"
        placeholder="Add a Comment"
      />
      <button class="enter-comment-btn">Enter</button>
    </form>
    <ul class="rendered-comments">
      <li
        v-for="(comment, index) in comments"
        :key="index"
        class="pet-details-comments"
      >
          <img class="user-profile" v-if="comment.by.fullName === 'Guest'" :src="require('../../assets/imgs/person/guest.png')" />
          <img class="user-profile" v-else :src="require(`../../assets/imgs/person/${comment.by.imgUrl}`)" />
        <span class="bold">
         {{ comment.by.fullName }}:</span>
        {{ comment.txt }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
    },
    loggedInUser: {
      type: Object,
    },
  },
  data() {
    return {
      commentToAdd: {
        txt: "",
      } 
    };
  },
  methods: {
    addComment() {
      this.$emit("addComment", JSON.parse(JSON.stringify(this.commentToAdd)));
      this.commentToAdd.txt = "";
    },
  },
};
</script>