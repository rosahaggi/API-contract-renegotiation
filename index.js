const express = require('express')
const dadosMockados = require('./dados.json')
const moment = require('moment')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


// rotas - endpoint

app.get('/verificar-renegociacao/:userId', (req, res) => {

    const userId = parseInt(req.params.userId)
    const usuarios = dadosMockados.filter(dado => dado.id === userId)

    
    if (usuarios.length === 0) {
        return res.status(401).json({ message: 'ID inválido' })
    }

    if ( usuarios[0].status !== "ACTIVE") {
        return res.status(400).json({ message: '{ "eligible": false } contrato inativo' })
    }

    function calculoAtraso() {
        const diaVencimento = new Date(usuarios[0].installments[0].dueAt)
        const dataAtual = new Date(moment().format("YYYY-MM-DD"))
        const calculo = Math.abs(dataAtual- diaVencimento);
        const resultado = Math.ceil(calculo / (1000 * 3600 * 24));
        return resultado
    }

        for (const installment of usuarios[0].installments) {
            if (installment.status === 'LATE') {
                if (calculoAtraso() > 30)
                    return res.status(200).json({ message: '{ "eligible": true }' })
            }
        }
        return res.status(406).json({ message: '{ "eligible": false } atraso menor que 30 dias' })

})

app.listen(3000)