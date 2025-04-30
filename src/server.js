import app from './app.js'

const PORT = 3000

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server rodando na porta http://localhost:${PORT}`)
})

