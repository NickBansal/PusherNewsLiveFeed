const app = require('.');

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:8000/`);
});
