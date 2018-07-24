export default class Validator {
  constructor (fields) {
    this.fields = fields
  }

  validate (rule, value, callback) {
    let t = this
    let field = t.fields[rule.field]
    field.value = value.trim()

    if (!field.value && field.required) {
      callback(new Error(`Please input ${field.name.toLowerCase()}.`))
    }

    if (field.value.length < field.minLength) {
      callback(new Error(`${field.name} must be more than ${field.minLength} character(s).`))
    }

    if (field.value.length > field.maxLength) {
      callback(new Error(`${field.name} must be less than ${field.maxLength} character(s).`))
    }

    if (field.customValidations) {
      field.customValidations.forEach(func => {
        if (t.CustomValidations[func]) {
          t.CustomValidations[func](rule, value, callback)
        }
      })
    }

    callback()
  }
}
