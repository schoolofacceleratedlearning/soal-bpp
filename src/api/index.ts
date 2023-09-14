import Express from 'express';
import searchController from './search/search.controller';

const router = Express.Router();

router.get('/', (_req, res) => {
  res.send("Welcome to SOAL's BPP!");
});

router.post('/search', searchController);

export default router;
