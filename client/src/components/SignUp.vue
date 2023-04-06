<template>
  <div id="container">
    <p id="title">Register</p>
    <p id="errorMSG">{{ signUpMSG }}</p>

    <div id="registerBoxes">
      <input type="text" v-model="userfirstName" placeholder="First Name" />
      <input type="text" v-model="userlastName" placeholder="Last Name" />
      <input type="text" v-model="useremail" placeholder="Email" />
      <input type="text" v-model="userpassword" placeholder="Password" />
      <button type="button" id="register" @click="register()">Register</button>
      <button type="button" id="cancel" @click="cancelRegister()">Cancel</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      signUpMSG: "",
    };
  },
  methods: {
    async register() {
      const firstName = this.userfirstName;
      const lastName = this.userlastName;
      const email = this.useremail;
      const password = this.userpassword;
      const queryURI = `http://localhost:3001/api/register/${firstName}/${lastName}/${email}/${password}`;

      const response = await fetch(queryURI);
      const data = await response.json();
      console.log(data);
      if (data.length) {
        this.signUpMSG = "registration failed"
        return;
      }
      else{
        this.signUpMSG = "registration successfull"
        this.$router.push("/");
      }

    },
    cancelRegister(){
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
#errorMSG{
  text-align: center;
  font-family: "Calibri";
  font-style: bold;
  font-weight: 200;
  font-size: 20px;
  color: #f11818;
  background: none;
}
#cancel{
  position: relative;
  margin-top: -10px;
  margin-left: 10px;
  float: left;
  width: 177px;
  height: 29px;
  text-align: left;

  font-family: "Calibri";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  border: none;
  color: #534949;
  background: none;
  cursor: pointer;

}

#register{
  float: right;
  width: 136px;
  height: 85px;

  background: #5dfa6c;
  border-radius: 10px;
  font-family: "Calibri";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  border: none;
  color: #ffffff;
  cursor: pointer;

}

#title {
  text-align: center;
  font-family: "Calibri";
  font-style: bold;
  font-weight: 600;
  font-size: 40px;
  color: #534949;
  background: none;
  margin: 40px;
}
#registerBoxes{
  margin: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#container{
  box-sizing: border-box;

  position: absolute;
  width: 900px;
  height: 900px;

  background: #ffffff;
  border: 1px solid #949090;
  border-radius: 32px;

  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input {
  box-sizing: border-box;

  width: 543px;
  height: 66px;

  border: 4px solid #4589ef;
  border-radius: 20px;
  margin-bottom: 40px;
}

</style>
