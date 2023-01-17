<template>
  <div>
    <div class="container">
      <p id="title">Assignment Tracker</p>
    </div>

    <div class="SignIn">
      <p id="usernameLabel">Username</p>
      <div class="usernameBox">
        <input type="box" id="usernameBox" v-model="username" />
      </div>
      <div class="passwordBox">
        <p id="usernameLabel">Password</p>

        <input type="box" id="passwordBox" v-model="password" />
      </div>
      <div class="loginButton">
        <button type="button" id="loginButton">Log In</button>
      </div>
      <div class="signInButton">
        <button type="button" id="signInButton">Sign In</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {};
</script>

  <style>
#title {
  text-align: center;
  font-family: "Calibri";
  font-style: bold;
  font-weight: 600;
  font-size: 40px;
  color: #534949;
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