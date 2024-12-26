<template>
  <q-layout>
    <q-page-container>

      <q-page class="login-page">
        <q-card class="q-pa-md" flat bordered>
          <q-card-section>
            <div class="text-h6">{{$t('project_name')}}</div>
          </q-card-section>
            <login-form :on-submit="login" />
          <q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
import LoginForm from "pages/Forms/LoginForm.vue";

export default {
  components: {LoginForm},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Lógica de login aqui
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
