import app from './app';

const PORT = process.env.PORT || 3000;
console.log('Test console. log string');
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));