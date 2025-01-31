<template>
  <main-layout :links-list="linksList" />
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import MainLayout from "layouts/MainLayout.vue";

defineOptions({
  name: "MainLayout",
});

const { t } = useI18n();

console.log(t("projects.add"));

const linksList = [
  {
    title: t("landing_page.clients.about"),
    icon: "home",
    link: "/",
  },
  {
    title: t("projects.name"),
    icon: "rocket_launch",
    link: "projects",
  },
  {
    title: t("inbox"),
    icon: "mail",
    link: "inbox",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
