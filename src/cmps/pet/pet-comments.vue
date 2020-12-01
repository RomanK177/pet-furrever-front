<template>
  <div class="comments-container">
    <h1 class="pet-details-comments-title">Comments</h1>
    <hr />
    <form @submit.prevent="addComment">
      <input
        v-model="commentToAdd.txt"
        class="comment-input"
        type="text"
        placeholder="Add a Comment"
      />
      <button>Enter</button>
    </form>
    <ul>
      <li
        v-for="(comment, index) in comments"
        :key="index"
        class="pet-details-comments"
      >
        {{ comment.by.fullName }}: {{ comment.txt }}
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
        by: {
          fullName: "",
        },
        txt: "",
      },
    };
  },
  methods: {
    addComment() {
      console.log('from add comment',this.loggedInUser)
      this.commentToAdd.by.fullName = !this.loggedInUser
        ? "Guest"
        : this.loggedInUser.fullName;
      this.$emit("addComment", JSON.parse(JSON.stringify(this.commentToAdd)));
      this.commentToAdd.txt = "";
    },
  },
 
};
</script>