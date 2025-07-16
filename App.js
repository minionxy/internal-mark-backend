const express = require('express')
const cors = require('cors')
const sendgrid = require('@sendgrid/mail')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

sendgrid.setApiKey('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')
app.post("/calculate", (request, response) => {
    const name = request.body.name
    const email = request.body.email
    const subject = request.body.subject
    const admnno = parseInt(request.body.admnno)
    const present = parseInt(request.body.present)
    const totalpresent = parseInt(request.body.totalpresent)
    const getexam1 = parseInt(request.body.getexam1)
    const getexam2 = parseInt(request.body.getexam2)
    const getassmark1 = parseInt(request.body.getassmark1)
    const getassmark2 = parseInt(request.body.getassmark2)

    const attendance = (present / totalpresent) * 8
    const exammarks = ((getexam1 + getexam2) / 80) * 20
    const assignmentmarks = getassmark1 + getassmark2
    const totalinternal = attendance + exammarks + assignmentmarks

    const resultData = {
        name,
        email,
        admnno,
        subject,
        totalinternal,
        attendance,
        exammarks,
        assignmentmarks
    }

    const emailContent = `
        <h3>Internal Marks Report</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Admission No:</strong> ${admnno}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Attendance:</strong> ${attendance.toFixed(2)}</p>
        <p><strong>Exam Marks:</strong> ${exammarks.toFixed(2)}</p>
        <p><strong>Assignment Marks:</strong> ${assignmentmarks}</p>
        <p><strong>Total Internal Marks:</strong> ${totalinternal.toFixed(2)}</p>
    `

    const message = {
        to: email,
        from: 'gauthamkrishnar123@gmail.com', // ✅ Must be verified in SendGrid
        subject: `Internal Marks of ${name}`,
        html: emailContent
    }

    sendgrid.send(message)
        .then(() => {
            console.log("Mail sent")
            return response.json(resultData) // ✅ Only send response once
        })
        .catch((error) => {
            console.error("Error sending mail", error)
            return response.status(500).json({ error: "Mail not sent" })
        })
})

app.listen(4000, () => {
    console.log('Server is running')
})
