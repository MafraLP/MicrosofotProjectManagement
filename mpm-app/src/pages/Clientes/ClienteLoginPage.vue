<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-page">
        <q-card class="q-pa-md" flat bordered>
          <q-card-section>
            <div class="text-h6">{{ $t("project_name") }}</div>
          </q-card-section>
          <login-form @submit="login" />
          <q-card-section> </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginForm from "pages/Forms/LoginForm.vue";
import AuthApi from "src/api/clientes/AuthApi";
import {useAuthStore} from "stores/useAuthStore";

export default {
  components: {LoginForm},
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    login({email, password}) {
      AuthApi.login({email: email, password: password})
        .then((response) => {
          this.authStore.login(response.data.data)
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
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
