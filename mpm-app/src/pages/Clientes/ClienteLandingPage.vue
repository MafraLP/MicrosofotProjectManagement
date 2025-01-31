<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t("landing_page.clients.title") }}</div>
      </q-card-section>

      <q-card-section>
        <div v-html="$t('landing_page.clients.description')"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>
