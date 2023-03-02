import isDev from "./is-dev";

// const devURL = "https://aion-backend-dev.azurewebsites.net";
const devURL = "https://aion-backend.azurewebsites.net";

const prodURL = "https://aion-backend.azurewebsites.net";

const baseURL = isDev ? devURL : prodURL;

export default baseURL;
