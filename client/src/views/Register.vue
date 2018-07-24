<template>
  <div id="app">
    <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="120px" :inline-message="true">
      <el-form-item label="Username" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input type="password" v-model="registerForm.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">Submit</el-button>
        <el-button @click="resetForm('registerForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userV from '@/validation/user'
import Validator from '@/validation/validator'

export default {
  data () {
    let registerFields = userV['register']
    let validator = new Validator(registerFields)
    let validate = validator.validate.bind(this)

    var CustomValidations = {
      'validatePassword': (rule, value, callback) => {
        if (this.registerForm.confirmPassword !== '') {
          this.$refs.registerForm.validateField('confirmPassword')
        }
        callback()
      },

      'validateConfirmPassword': (rule, value, callback) => {
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
        confirmPassword: ''
      },
      registerRules: {
        username: [{ validator: validate, trigger: 'blur' }],
        password: [{ validator: validate, trigger: 'blur' }],
        confirmPassword: [{ validator: validate, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
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
