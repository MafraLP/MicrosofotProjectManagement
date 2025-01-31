import ClientesBaseApi from "./ClientesBaseApi";

class ProjectProposalApi extends ClientesBaseApi {
  getProjectProposals() {
    return this.get("/project-proposal/");
  }

  create(data) {
    return this.post("/projects-proposal/", data);
  }
}

export default new ProjectProposalApi();
