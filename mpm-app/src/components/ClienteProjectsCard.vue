<template>
  <q-card class="rounded-borders" style="width: 200px">
    <!--header-->
    <q-card-section
      :style="{ backgroundColor: cardData.status_color, padding: '2px' }"
    >
      <div class="text-white text-uppercase text-center text-bold">
        {{ cardData.status }}
      </div>
    </q-card-section>

    <!--body-->
    <q-card-section>
      <div class="text-h6">
        {{
          cardData.title.length > 15
            ? cardData.title.substring(0, 12) + "..."
            : cardData.title
        }}
      </div>
      <div class="dates-container">
        <div class="date-container">
          <div class="date-label">{{ $t("begin") }}</div>
          <div class="date-value">{{ cardData.start_date }}</div>
        </div>
        <div class="date-container">
          <div class="date-label">{{ $t("end") }}</div>
          <div class="date-value">{{ cardData.end_date }}</div>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-text">{{ cardData.progress }}%</div>
        <q-linear-progress
          :value="cardData.progress / 100"
          :color="cardData.status_color"
          track-color="grey-3"
          size="8px"
          class="q-mt-sm"
        />
      </div>
      <div class="manager-container">
        <q-icon name="person" class="manager-icon" />
        <div class="manager-text">
          {{ cardData.manager ?? $t("not_assigned") }}
        </div>
      </div>
    </q-card-section>

    <!--footer-->
    <q-card-section
      style="padding-left: 15px; padding-bottom: 5px; padding-top: 5px"
    >
      <div v-if="cardData.project_proposal" class="maintenance-flag">
        PROPOSTA DE PROJETO
      </div>
      <div v-else>
        {{ cardData.team_count }}
        <q-icon name="people" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "ClienteProjectsCard",
  props: {
    cardData: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 15px;
}

.progress-container {
  padding-top: 15px;
  position: relative;
}

.progress-text {
  position: absolute;
  top: 0px;
  right: 0;
  font-size: 0.7rem;
  color: #666;
}

.dates-container {
  display: flex;
  justify-content: space-evenly;
}

.date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-label {
  font-size: 0.875rem;
  color: #999;
}

.date-value {
  font-size: 0.875rem;
  color: #333;
}

.manager-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
}

.manager-icon {
  margin-right: 5px;
  color: #666;
}

.manager-text {
  font-size: 0.875rem;
  color: #333;
}

.maintenance-flag {
  background: repeating-linear-gradient(
    45deg,
    lightyellow,
    lightyellow 10px,
    lightgray 10px,
    lightgray 20px
  );
  color: black;
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
}
</style>
