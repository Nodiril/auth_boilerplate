<template>
  <div id="app" class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
      <h3 class="title">Login</h3>
      <!--  label-width="120px" :inline-message="true" -->
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Password" @keyup.enter.native="handleLogin('loginForm')"></el-input>
      </el-form-item>
      <el-row>
        <el-col>
          <el-button style="width:100%;margin-bottom:10px" type="primary" :loading="loading" @click.native.prevent="handleLogin('loginForm')">Log In</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class='tips'><router-link to="/register">Not a member yet? Register now.</router-link></div>
        </el-col>
      </el-row>
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
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    handleLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.$apollo
            .mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                username: this.loginForm.username,
                password: this.loginForm.password
              }
            })
            .then(response => {
              this.loading = false
              this.$store.dispatch('Login', {
                username: this.loginForm.username,
                token: response.data.token
              })
              this.$router.replace('/')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    //width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
