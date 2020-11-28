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
            {{ comment.userName }}: {{ comment.comment }}
          </li>
        </ul>
        <input class="comment-input" type="text" placeholder="Add a Comment" />
      </div>
</template>

<script>
export default {
  props: {
    pet: {
      type: Object
    }
  }
}
</script>