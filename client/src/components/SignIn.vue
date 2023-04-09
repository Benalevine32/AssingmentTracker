<template>
  <body>
    <div id="bg">
      <div id="mainBox">
        <center>
        <div id="titleLogo">
          <img :src="image" id="img" />
        </div>
        </center>
        <p id="errorMSG">{{ loginMSG }}</p>

        <center>
          <input
            type="box"
            placeholder="Email"
            id="usernameBox"
            v-model="userEmail"
          />
          <input
            type="box"
            placeholder="Password"
            id="passwordBox"
            v-model="userPassword"
          />

          <button type="button" id="loginButton" @click="logIn()">
            Log In
          </button>
          <button type="button" id="signInButton" @click="signUp()">
            Sign Up
          </button>
        </center>
      </div>
    </div>
  </body>
</template>
  
<script scoped>
export default {
  name: "signIn",
  data() {
    return {
      loginResponse: "",
      userEmail: "",
      userPassword: "",
      isUserValid: "",
      validationResponse: "",
      loginMSG: "",
      image: require("@/assets/blackLogo.png"),
    };
  },
  created() {
    localStorage.clear();
  },
  methods: {
    async logIn() {
      //Send username and password to endpoint
      const email = this.userEmail;
      const password = this.userPassword;
      const queryURI = `http://localhost:3001/api/login/${email}/${password}`;
      try {
        const response = await fetch(queryURI);
        const data = await response.json();
        if (!data.length) {
          // add error message with invalid warning
          this.loginMSG = "Invalid Username or Password";
          return;
        }
        this.loginMSG = "Login Successfull";
        // ------------------
        // after this point, we know the user entered in correct info and is authed
        localStorage.setItem("user_id", data[0].user_id);
        this.$router.push("/main");
      } catch {
        // this is where a fail  to autheticate occurs cus of user being stypyui
        throw new Error("This Call Failed!");
      }
    },

    signUp() {
      this.$router.push("/SignUp");
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
  height: 75%;

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
  height: 66px;

  border: 2px solid #9c9c9c;
  border-radius: 10px;
}

#loginButton {
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

#signInButton {
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

#errorMSG{
  color: red;
}
</style>