<template>
  <section class="form-element">
    <el-form ref="ownerForm" :model="user" label-width="120px" :rules="rules">
      <el-form-item label="Full name" prop="fullName" required>
        <el-input v-model="user.fullName" required></el-input>
      </el-form-item>
      <el-form-item label="User name" prop="userName" required>
        <el-input v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" required>
        <el-input
          type="password"
          v-model="user.password"
          show-password
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email" required>
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Telephone" prop="tel" required>
        <el-input v-model.number="user.tel"></el-input>
      </el-form-item>
      <!-- Img Profile here  -->
      <el-form-item label="Activity time">
        <el-date-picker
          v-model="user.ownerData.activityYears"
          type="date"
          placeholder="Select date"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="Title">
<el-input
  type="textarea" :rows="2" placeholder="Please input" v-model="user.ownerData.title">
</el-input>
  </el-form-item>
    <el-form-item label="Description">
<el-input type="textarea" :rows="2" placeholder="Please input" v-model="user.ownerData.desc">
</el-input>
  </el-form-item> -->
      <el-form-item label="Location">
        <el-input v-model="user.ownerData.location.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signup('ownerForm')"
          >Sign up</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      rules: {
        fullname: [
          {
            required: true,
            message: "Please select valid full name",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
          },
        ],
        userName: [
          {
            required: true,
            message: "Please select valid user name",
          },
          { min: 3, max: 5 },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please enter valid email",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter valid password",
          },
        ],
        tel: [
          {
            type: "number",
            required: true,
            message: "Please enter valid telephone number",
          },
        ],
        // resource: [
        //   { required: true, message: 'Please select activity resource', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: 'Please input activity form', trigger: 'blur' }
        // ]
      },
    };
  },
  methods: {
    signup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          console.log(this.user);
          this.$store.dispatch({
            type: "signUp",
            userCred: this.user,
          });
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
