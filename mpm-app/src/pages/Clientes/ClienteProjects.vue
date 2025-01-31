<template>
  <q-page>
    <q-toolbar class="shadow-2 q-toolbar--dense">
      <q-btn
        flat
        icon="add"
        :label="$t('projects.add')"
        @click="openProjectProposalModal"
      />
    </q-toolbar>
    <div v-if="isProjectsLoading" class="q-pa-md central-message">
      <q-spinner size="50px" color="primary" />
    </div>
    <div v-else-if="projects.length === 0" class="q-pa-md central-message">
      <q-icon name="warning" size="50px" color="warning" />
      <div>{{ $t("warnings.no_projects_found") }}</div>
    </div>
    <div v-else class="q-gutter-md row wrap q-pa-md">
      <cliente-projects-card
        v-for="(project, index) in projects"
        :key="index"
        :cardData="project"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      />
    </div>

    <ProjectProposalModal ref="projectModal" />
  </q-page>
</template>

<script>
import ProjectProposalModal from "components/modals/ProjectProposalModal.vue";
import ClienteProjectsCard from "components/ClienteProjectsCard.vue";

export default {
  name: "ClienteProjects",
  components: {
    ClienteProjectsCard,
    ProjectProposalModal,
  },
  data() {
    return {
      isProjectsLoading: false,
      projects: [
        {
          title: "Projeto Alpha",
          status: "EM ANDAMENTO",
          status_color: "blue",
          team_count: 5,
          start_date: "Jan/23",
          end_date: "Dez/23",
          progress: 60,
          manager: "João Silva",
        },
        {
          title: "Projeto Beta",
          status: "CANCELADO",
          status_color: "red",
          team_count: 3,
          start_date: "Fev/23",
          end_date: "Nov/23",
          progress: 25,
          manager: "Maria Oliveira",
        },
        {
          title: "Projeto Gama",
          status: "CONCLUÍDO",
          status_color: "green",
          team_count: 8,
          start_date: "Mar/22",
          end_date: "Out/22",
          progress: 100,
          manager: "Carlos Souza",
        },
        {
          title: "Projeto Épsilon",
          status: "PAUSADO",
          status_color: "gray",
          team_count: 4,
          start_date: "Jun/23",
          end_date: "Ago/23",
          progress: 40,
          //manager: "Bruno Lima",
          project_proposal: true,
        },
        {
          title: "Projeto Delta",
          status: "EM PLANEJAMENTO",
          status_color: "orange",
          team_count: 2,
          start_date: "Abr/24",
          end_date: "Dez/24",
          progress: 10,
          manager: "Ana Paula",
        },
      ],
    };
  },
  methods: {
    fetchProjects() {},
    openProjectProposalModal() {
      this.$refs.projectModal.openModal();
    },
  },
};
</script>

<style scoped>
.central-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
