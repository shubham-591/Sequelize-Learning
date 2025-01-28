const express = require('express');
const app = express();
const carRoutes = require('./routes/carRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const tagRoutes = require('./routes/tagRoutes');

app.use(express.json());

app.use('/', carRoutes);
app.use('/', userRoutes)
app.use('/', tagRoutes)

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})