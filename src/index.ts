import App from "./server/app";
const port = 3000;

new App().server.listen(port);
console.log(`server rodando na porta:${port}`);
