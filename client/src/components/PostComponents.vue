<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!-- Create Post Here -->
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    
      <div class="posts-container">
          <div class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id">
            {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
            <p class="text">{{ post.text }}</p>

          </div>
      </div>
  </div>
</template>

<script>
import PostService from '../../PostService';
export default {
  name: 'PostComponent',
  data() {
    return{
      posts: [],
      error: '',
      text: ''
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch(err){
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.posts-container {
  max-width: 700px;
  margin: 0 auto;
}
.post {
  background-color: #066259;
  color: white;
  padding: 1em 0;
}
.text {
  color: white;
}
</style>
