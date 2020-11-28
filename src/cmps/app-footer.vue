<template>
  <section class="footer">
    <footer class="main-footer flex">
      <div class="footer-container">
        <div class="footer-logo">
          Pet <span class="logofooter-span">Furr</span>ever
        </div>
        <small>© 2020 Petfurrever.com - All Rights Reserved.</small>
        <ul class="nav-social">
          <li>
            <a href="#" >
              <img  class="social-facebook" src="../assets/imgs/socials/fb.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#" 
              ><img class="social-instagram" src="../assets/imgs/socials/ig.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              <img class="social-twitter" src="../assets/imgs/socials/twitter.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>