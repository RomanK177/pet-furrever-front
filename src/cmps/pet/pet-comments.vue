<template>
  <div class="comments-container">
    <h1 class="pet-details-comments-title">Comments</h1>
    <hr />
    <ul>
      <li
        v-for="(comment, index) in pet.comments"
        :key="index"
        class="pet-details-comments"
      >
        {{comment.by.fullName}}: {{ comment.txt }}
      </li>
    </ul>
    <!-- <div class="pet-details-comments">
			<ul>
				<li v-for="msg in comments" :key="msg.at">
					{{ msg.txt }}
				</li>
			</ul>
      </div> -->
    <form @submit.prevent="addComment">
    <input
      v-model="comment.txt"
      class="comment-input"
      type="text"
      placeholder="Add a Comment"
    />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    pet: {
      type: Object,
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      input: "",
      // comments: [],
      comment: {
        txt: null,
        by:{
        userId: this.$store.getters.getLoggedInUser
          ? this.$store.getters.getLoggedInUser._id
          : null,
          fullName: this.$store.getters.getLoggedInUser
          ? this.$store.getters.getLoggedInUser.fullName
          : "Guest",
          imgUrl:  this.$store.getters.getLoggedInUser
          ? this.$store.getters.getLoggedInUser.imgUrl
          : null,
        }
      }
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch({
        type: "addComment",
        petId: this.$route.params.id,
        comment: JSON.parse(JSON.stringify(this.comment)),
      });
    },
  },
  created() {},
};
</script>