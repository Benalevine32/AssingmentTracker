<template>
  <div>
    <div class="container">
      <p id="title">NextUp Login</p>
      <p id="errorMSG">{{ loginMSG }}</p>

    </div>

    <div class="SignIn">
      <p id="usernameLabel">Username</p>
      <div class="usernameBox">
        <input type="box" id="usernameBox" v-model="userEmail"/>
      </div>
      <div class="passwordBox">
        <p id="usernameLabel">Password</p>

        <input type="box" id="passwordBox" v-model="userPassword"/>
      </div>
      <div class="loginButton">
        <button type="button" id="loginButton" @click="logIn()">Log In</button>
      </div>
      <div class="signInButton">
        <button type="button" id="signInButton" @click="signUp()">Sign Up</button>
      </div>
    </div>

  </div>
</template>
  
<script>
export default {
  name: "signIn",
  data() {
    return{
      loginResponse: '',
      userEmail: '',
      userPassword: '',
      isUserValid: '',
      validationResponse: '',
      loginMSG: '',
    }
  },
  created() {
    localStorage.clear()
  },
  methods:{
    async logIn(){
      //Send username and password to endpoint
      const email = this.userEmail;
      const password = this.userPassword;
      const queryURI = `http://localhost:3001/api/login/${email}/${password}`
      try {
        const response = await fetch(queryURI)
        const data = await response.json()
        if (!data.length) {
          // add error message with invalid warning
          this.loginMSG = "Invalid Username or Password"
          return
        }
        this.loginMSG = "Login Successfull";
        // ------------------
        // after this point, we know the user entered in correct info and is authed
        localStorage.setItem('user_id', data[0].user_id)
        this.$router.push('/main');
      } catch {
        // this is where a fail  to autheticate occurs cus of user being stypyui
        throw new Error('This Call Failed!')
      }
    },

    signUp(){
      this.$router.push('/SignUp');
    }
  }
  
};
</script>

  <style scoped>
#title {
  text-align: center;
  font-family: "Calibri";
  font-style: bold;
  font-weight: 600;
  font-size: 40px;
  color: #534949;
  background: none;
}

#errorMSG{
  text-align: center;
  font-family: "Calibri";
  font-style: bold;
  font-weight: 200;
  font-size: 20px;
  color: #f11818;
  background: none;
}

input {
  box-sizing: border-box;

  width: 543px;
  height: 66px;

  border: 4px solid #4589ef;
  border-radius: 20px;
  margin-bottom: 40px;
}
div.SignIn {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#loginButton {
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

#signInButton {
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

#usernameLabel {
  position: relative;
  margin-bottom: -10px;
  margin-left: 10px;
  width: 177px;
  height: 29px;

  font-family: "Calibri";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  color: #949090;
}

div.container {
  box-sizing: border-box;

  position: absolute;
  width: 700px;
  height: 700px;

  background: #ffffff;
  border: 1px solid #949090;
  border-radius: 32px;

  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>