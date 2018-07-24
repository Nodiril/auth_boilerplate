<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" size="mini" class="card-box register-form">
      <h3 class="title">Register</h3>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" placeholder="Password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="cpassword">
        <el-input v-model="registerForm.cpassword" placeholder="Confirm Password" type="password"></el-input>
      </el-form-item>
      <el-button style="width:100%;margin-bottom:10px" type="primary" :loading="loading" @click.native.prevent="handleRegister('registerForm')">Register</el-button>
    </el-form>
  </div>
</template>

<script>
import registerV from '@/validation/user'
import Validator from '@/validation/validator'
import { REGISTER_MUTATION } from '@/graphql'

export default {
  name: 'register',
  data: function () {
    let registerFields = registerV['register']
    let validator = new Validator(registerFields)
    let validate = validator.validate.bind(this)

    var CustomValidations = {
      validatePassword: (rule, value, callback) => {
        if (this.registerForm.cpassword !== '') {
          this.$refs.registerForm.validateField('cpassword')
        }
        callback()
      },

      validateConfirmPassword: (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error("Two inputs don't match!"))
        } else {
          callback()
        }
      }
    }

    return {
      fields: registerFields,
      CustomValidations,
      registerForm: {
        username: '',
        password: '',
        cpassword: ''
      },
      registerRules: {
        username: [{ validator: validate, trigger: 'blur' }],
        password: [{ validator: validate, trigger: 'blur' }],
        cpassword: [{ validator: validate, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.$apollo
            .mutate({
              mutation: REGISTER_MUTATION,
              variables: {
                username: this.registerForm.username,
                password: this.registerForm.password
              }
            })
            .then(response => {
              this.loading = false
              this.$store.dispatch('Register', {
                username: this.registerForm.username,
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.register-container {
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
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .register-form {
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
