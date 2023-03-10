import isDev from "./is-dev";

// const devURL = "https://aion-backend-dev.azurewebsites.net";
const devURL = "https://zypl-forms-backend.azurewebsites.net/";

const prodURL = "https://zypl-forms-backend.azurewebsites.net/";

const baseURL = isDev ? devURL : prodURL;

export default baseURL;
