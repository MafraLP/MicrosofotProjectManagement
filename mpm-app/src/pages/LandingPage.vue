<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="work" size="2rem" />
          {{ $t("project_name") }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <!-- Hero Section -->
        <section class="hero q-pa-md">
          <div class="text-center q-mb-xl">
            <h1 class="text-h2 q-mb-md">Projeto Desafio Aprovafacil</h1>
            <p class="text-h5 q-mb-lg">
              Utilizando Quasar Framework e Vue.js
            </p>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="q-py-lg">
          <div class="text-center q-mb-lg">
            <h2 class="text-h3">Features</h2>
          </div>
          <div class="row q-col-gutter-md justify-center">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="col-12 col-sm-4"
            >
              <q-card class="feature-card">
                <q-card-section>
                  <q-icon :name="feature.icon" size="3rem" color="primary" />
                  <h3 class="text-h5 q-mt-sm q-mb-xs">{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const features = ref([
  {
    icon: "link",
    title: "Morphs",
    description:
      "Relação morfológicas para criação de Status de tarefas e projetos.",
  },
  {
    icon: "source",
    title: "Ambientes",
    description:
      "Ambientes separados para Teams e Clientes, garantindo segurança e privacidade mas reutilizando recursos",
  },
]);
</script>

<style scoped>
.hero {
  background: linear-gradient(145deg, var(--q-primary) 30%, var(--q-secondary));
  color: white;
  padding: 100px 0;
}

.feature-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
}

.cta {
  background: linear-gradient(145deg, var(--q-primary) 30%, var(--q-secondary));
}
</style>
