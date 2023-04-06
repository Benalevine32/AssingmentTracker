import signIn from '@/components/SignIn.vue'
import MainPage from '@/components/MainPage.vue'
import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "SignIn",
      component: signIn,
    },
    {
      path: '/main',
      name: "MainPage",
      component: MainPage,
    },
    {
      path: '/SignUp',
      name: "SignUp",
      component: SignUp,
    }
  ]
})



