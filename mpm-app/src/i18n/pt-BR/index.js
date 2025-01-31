export default {
  failed: "Ação falhou",
  success: "Ação foi bem-sucedida",
  project_name: "Microsoft Project Management",
  inbox: "Inbox",
  begin: "Início",
  end: "Término",
  not_assigned: "N/A",

  fields: {
    email: "Email",
    password: "Senha",
    title: "Título",
    description: "Descrição",
  },

  actions: {
    login: "Entrar",
    logout: "Sair",
    create: "Criar",
    save: "Salvar",
    cancel: "Cancelar",
  },

  projects: {
    name: "Projetos",
    project_proposal: "Proposta de Projeto",
    add: "Adicionar projeto",
  },

  warnings: {
    no_projects_found: "Nenhum projeto encontrado",
  },
  errors: {
    auth: {
      session_expired: "Sua sessão expirou. Por favor, faça login novamente.",
    },
    input: {
      invalid: "{input} inválido(a)",
      short: "{input} deve possuir {min} caracteres",
      max_length: "{input} deve possuir no máximo {max} caracteres",
      required: "{input} é obrigatório(a)",
    },
  },

  landing_page: {
    clients: {
      about: "Sobre",
      title: "Bem vindo ao Microsoft Project Management",
      description:
        "Como cliente, você pode criar projetos e acompanhar o progresso de cada um deles.<br>Para começar, basta acessar a aba de projetos e enviar uma proposta. Sua solicitação será encaminhada ao administrador, que irá avaliá-la e fornecer um feedback. O administrador poderá aprovar, solicitar ajustes ou recusar a proposta, e a decisão será comunicada diretamente a você.<br><br>Após receber o feedback, você poderá aceitar ou cancelar a sua solicitação. Caso o projeto seja aprovado, será possível acompanhar todas as etapas do progresso diretamente na plataforma.",
    },
  },
};
