<template>
  <div id="app">
    {{username}}
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="120px" :inline-message="true">
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">Submit</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userV from '@/validation/user'
import Validator from '@/validation/validator'
import { LOGIN_MUTATION } from '@/graphql'
import { mapGetters } from 'vuex'

export default {
  data () {
    let loginFields = userV['login']
    let validator = new Validator(loginFields)
    let validate = validator.validate.bind(this)

    return {
      fields: loginFields,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ validator: validate, trigger: 'blur' }],
        password: [{ validator: validate, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$apollo
            .mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                username: this.loginForm.username,
                password: this.loginForm.password
              }
            })
            .then(response => {
              console.log(this)
              this.$store.dispatch('Login', {username: this.loginForm.username, token: response.data.token})
              this.$router.replace('/')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login () {

    }
  }
}
</script>
