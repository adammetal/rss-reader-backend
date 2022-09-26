import app from './server';

app.listen(8080, () => {
  console.log('App listening on 8080');
  console.log('Usage:');
  console.log('http://localhost:8080?feedUrl=xzy');
});
