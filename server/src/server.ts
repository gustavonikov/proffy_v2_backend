import express from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-unresolved
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// GET: pegar ou buscar infos na página
// POST: criar nova info no back
// PUT: atualizar uma info existente
// DELETE: deletar uma info

// Corpo (Request body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar ex: app.delete('/users/:id')
// Query params: Paginação, pesquisa na página, filtrar, ordenar

app
    .use(routes)
    .listen(3333); // a porta padrão é 80
