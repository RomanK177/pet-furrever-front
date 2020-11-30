<template>
  <section class="form-element">
    <el-form ref="adopterForm" :model="user" label-width="120px" :rules="rules">
      <el-form-item label="Full name" prop="fullName" required>
        <el-input v-model="user.fullName"></el-input>
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
        <el-input type="email" v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Telephone" prop="tel" required>
        <el-input v-model.number="user.tel"></el-input>
      </el-form-item>
      <!-- Img Profile here  -->
      <el-form-item label="Date of birth" prop="dateOfBirth" required>
        <el-date-picker
          v-model="user.dateOfBirth"
          type="date"
          placeholder="Select date and time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item required>
        <el-checkbox v-model="user.adopterData.ownPet"
          >Do you own a pet?</el-checkbox
        >
      </el-form-item>
      <el-form-item required>
        <el-checkbox v-model="user.adopterData.ownedPet"
          >Did you owned a pet?</el-checkbox
        >
      </el-form-item>
      <el-form-item label="Family Status" required>
        <el-select v-model="user.adopterData.familyStatus" placeholder="">
          <el-option
            v-for="item in family"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="House Status" required>
        <el-select v-model="user.adopterData.houseStatus" placeholder="">
          <el-option
            v-for="item in house"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signup('adopterForm')"
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
      family: [
        {
          value: "single",
          label: "Single",
        },
        {
          value: "no children",
          label: "In a relationship/married with no children",
        },
        {
          value: "children",
          label: "In a relationship/married with children",
        },
      ],
      house: [
        {
          value: "appartment",
          label: "Appartment",
        },
        {
          value: "garden",
          label: "House with garden",
        },
        {
          value: "farm",
          label: "Farm",
        },
      ],
      rules: {
        fullname: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
          { min: 3, max: 5 },
        ],
        email: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        password: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        tel: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        dateOfBirth: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
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
