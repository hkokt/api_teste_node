import App from "./server/app";
const port = 3000;
export const app = new App();

app.server.listen(port);
console.log(`server rodando na porta:${port}`);
