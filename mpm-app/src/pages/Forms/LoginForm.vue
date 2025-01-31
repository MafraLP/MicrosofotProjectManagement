<template>
  <q-form>
    <q-input
      filled
      v-model="email"
      type="text"
      required
      :label="$t('fields.email')"
      :rules="[
        (val, rules) =>
          rules.email(val) ||
          $t('errors.input.invalid', { input: $t('fields.email') }),
      ]"
    />
    <q-input
      style="padding-top: 5px"
      filled
      v-model="password"
      type="password"
      required
      :label="$t('fields.password')"
      :rules="[
        (val) =>
          val.length >= 6 ||
          $t('errors.input.short', {
            input: $t('fields.password'),
            min: 6,
          }),
      ]"
    />
    <q-btn
      color="primary"
      class="q-mt-md"
      style="width: 100%"
      :label="$t('actions.login')"
      @click="emitCredentials"
    />
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    emitCredentials() {
      this.$emit("submit", { email: this.email, password: this.password });
    },
  },
};
</script>
