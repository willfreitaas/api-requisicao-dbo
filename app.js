const express = require('express');
const app = express();

const {rotasAlunos} = require('./src/routes/alunoRoutes');

const PORT = 8081;

app.use(express.json());

app.use("/alunos", rotasAlunos);







app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});