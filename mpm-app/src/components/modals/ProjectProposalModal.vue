<template>
  <q-dialog v-model="isModalOpen">
    <q-card style="width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ $t("projects.project_proposal") }}</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="title"
          :label="$t('fields.title')"
          :rules="[
            (val) =>
              !!val ||
              $t('errors.input.required', { input: $t('fields.title') }),
            (val) =>
              val.length <= 25 ||
              $t('errors.input.max_length', {
                input: $t('fields.title'),
                max: 500,
              }),
          ]"
          required
        />
        <q-input
          v-model="description"
          type="textarea"
          :label="$t('fields.description')"
          :rules="[
            (val) =>
              !!val ||
              $t('errors.input.required', { input: $t('fields.description') }),
            (val) =>
              val.length <= 500 ||
              $t('errors.input.max_length', {
                input: $t('fields.description'),
                max: 500,
              }),
          ]"
          required
        />
        <div class="char-counter">{{ description.length }} / 500</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          color="negative"
          :label="$t('actions.cancel')"
          @click="closeModal"
        />
        <q-btn
          flat
          color="primary"
          :disable="isSalvarAvailable"
          :label="$t('actions.save')"
          @click="saveProposal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ProjectProposalApi from "src/api/clientes/ProjectProposalApi";
export default {
  name: "ProjectProposalModal",
  data() {
    return {
      isModalOpen: false,
      title: "",
      description: "",
    };
  },
  computed: {
    isSalvarAvailable() {
      return !this.title || !this.description;
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    saveProposal() {
      ProjectProposalApi.create({
        title: this.title,
        description: this.description,
      }).then((response) => {
        this.closeModal();
        this.$emit("proposal-saved");
      });
    },
  },
};
</script>

<style scoped>
.char-counter {
  text-align: right;
  font-size: 0.75rem;
  color: #666;
}
</style>
