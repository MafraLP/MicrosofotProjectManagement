<template>
  <q-form>
    <q-input
      filled
      v-model="email"
      type="text"
      required
      :label="$t('email')"
      :rules="[(val, rules) => rules.email(val) || $t('errors.invalid_input', {campo: $t('email')})]"
    />
    <q-input
      style="padding-top: 5px"
      filled
      v-model="password"
      type="password"
      required
      :label="$t('password')"
      :rules="[val => val.length >= 6 || $t('errors.short_input', {campo: $t('password'), min: 6})]"
    />
    <q-btn label="Login" color="primary" class="q-mt-md" style="width: 100%" @click="emitCredentials" />
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    emitCredentials() {
      this.$emit('submit', {email: this.email, password: this.password});
    }
  }
}
</script>
