<template>
  <body>
    <div id="bg">
      <div id="mainBox">
        <center>
          <div id="titleLogo">
            <img :src="image" id="img" />
          </div>
        </center>
        <p id="errorMSG">{{ signUpMSG }}</p>

        <div id="registerBoxes">
          <input type="text" v-model="userfirstName" placeholder="First Name" />
          <input type="text" v-model="userlastName" placeholder="Last Name" />
          <input type="text" v-model="useremail" placeholder="Email" />
          <input type="text" v-model="userpassword" placeholder="Password" />
          <button type="button" id="register" @click="register()">
            Register
          </button>
          <button type="button" id="cancel" @click="cancelRegister()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </body>
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
      image: require("@/assets/goodLogo.png"),
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
        this.signUpMSG = "registration failed";
        return;
      } else {
        this.signUpMSG = "registration successfull";
        this.$router.push("/");
      }
    },
    cancelRegister() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
body,
html {
  margin: 0;
  font-family: "Nunito", sans-serif;
}

#bg {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 0;

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background: #1f1e1e;
}

#mainBox {
  padding: 20px;
  box-sizing: border-box;

  position: relative;

  width: 50%;
  height: 90%;

  background: #ffffff;
  border: 1px solid #949090;
  border-radius: 32px;

  margin: 0;
  display: flex;
  flex-direction: column;
}

input {
  box-sizing: border-box;
  margin: 10px;
  width: 90%;
  height: 40px;

  border: 2px solid #9c9c9c;
  border-radius: 10px;
}

#register {
  width: 90%;
  height: 50px;
  backdrop-filter: blur(5px);
  background-color: rgb(85, 105, 255);
  border-radius: 29px;

  border: none;
  cursor: pointer;
  margin: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
}

#cancel {
  width: 90%;
  height: 50px;
  background: #ffffff;
  color: rgb(85, 105, 255);
  border: none;
  cursor: pointer;
  margin: 10px;
  font-weight: 600;
  font-size: 15px;
}

#title {
  margin: 0px;
  font-weight: 700;
  font-size: 35px;
}

#titleLogo {
  width: 110px;
  height: 110px;
}

#errorMSG {
  color: red;
}
</style>
