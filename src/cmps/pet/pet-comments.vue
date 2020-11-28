<template>
  <div class="comments-container">
    <h1 class="pet-details-comments-title">Comments</h1>
    <hr />
    <!-- v-for="(comment, index) in pet.comments" -->

    <!-- <ul>
      <li
        v-for="(comment, index) in pet.comments"
        :key="index"
        class="pet-details-comments"
      >
        {{ comment.by.fullName }}: {{ comment.txt }}
      </li>
    </ul> -->
    <ul>
      <li
        v-for="(comment, index) in comments"
        :key="index"
        class="pet-details-comments"
      >
        {{ comment.by.fullName }}: {{ comment.txt }}
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
      type: Object,
    },
  },
  data() {
    return {
      comments: [],
      comment: {
        txt: "",
        by: {
          userId: this.$store.getters.getLoggedInUser
            ? this.$store.getters.getLoggedInUser._id
            : null,
          fullName: this.$store.getters.getLoggedInUser
            ? this.$store.getters.getLoggedInUser.fullName
            : "Guest",
          imgUrl: this.$store.getters.getLoggedInUser
            ? this.$store.getters.getLoggedInUser.imgUrl
            : null,
        },
      },
    };
  },
  methods: {
    addComment() {
      // this.$store.dispatch({
      //   type: "addComment",
      //   petId: this.$route.params.id,
      //   comment: JSON.parse(JSON.stringify(this.comment)),
      // });
      this.comments.push(this.comment)
      this.$store.dispatch({
        type: "addComment",
        petId: this.$route.params.id,
        comment: JSON.parse(JSON.stringify(this.comment)),
      });
      this.comment.txt = "";
      // const addedComment = this.commment.txt
      // this.comments.push(addedComment)
    },

    //   updateMessage: async function () {
    //   this.message = 'updated'
    //   console.log(this.$el.textContent) // => 'not updated'
    //   await this.$nextTick()
    //   console.log(this.$el.textContent) // => 'updated'
    // },
  },
  
  // computed: {
  //   commentsForDisplay(){
  //    const commentsForDisplay = this.$store.getter.commentsForDisplay
  //   //  const addedComment = this.comment.txt
  //   // const addedComment = this.addComment()
  //   // comments.push(addedComment)
  //    this.comments = commentsForDisplay
  //   }
  // },
  created(){
    this.comments = this.pet.comments
  }

  //  async created() {
  //     const comments = await this.$store.dispatch({ type: "loadComments" });
  //     this.comments = comments
  //     // this.$store.dispatch({ type: "loadUsers" });
  //   },
};
</script>