const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post("/calculate", (request, response) => {
    const name = request.body.name
    const subject = request.body.subject
    const admno = parseInt(request.body.admno)
    const present = parseInt(request.body.present)
    const totalpresent = parseInt(request.body.totalpresent)

    const getexam1 = parseInt(request.body.getexam1)
    const getexam2 = parseInt(request.body.getexam2)

    const getassmark1 = parseInt(request.body.getassmark1)
    const getassmark2 = parseInt(request.body.getassmark2)

    const attendance = (present / totalpresent) * 8
    const exammark3 = ((getexam1 + getexam2) / 80) * 20
    const assignment = getassmark1 + getassmark2

    const totalinternal = attendance + assignment + exammark3
    response.json({ "name": name, "admnno": admno, "subject": subject, "totalinternal": totalinternal, "attendance": attendance, "exammarks": exammark3, "assignmentmarks": assignment })
})



app.listen(4000, () => {
    console.log('Server is running')
})