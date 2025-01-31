<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ $t("project_name") }} </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="190">
      <q-list>
        <template v-for="(menuItem, index) in linksList" :key="index">
          <q-item
            clickable
            :active="menuItem.label === 'Outbox'"
            @click="navigateTo(menuItem.link)"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.title }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import router from "src/router";

defineOptions({
  name: "MainLayout",
});

defineProps({
  linksList: Array,
});

const leftDrawerOpen = ref(false);

function navigateTo(link) {
  console.log(link);
  router()
    .push(link)
    .catch((error) => {
      console.error("Erro ao navegar para o link:", error);
    });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
