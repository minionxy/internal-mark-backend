const express = require('express')
const cors = require('cors')
const sendgrid = require('@sendgrid/mail')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

sendgrid.setApiKey('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')

app.post("/calculate", (request, response) => {
    const {
        name,
        email,
        subject,
        admnno,
        present,
        totalpresent,
        getexam1,
        getexam2,
        getassmark1,
        getassmark2
    } = request.body

    // Calculations
    const attendance = (parseInt(present) / parseInt(totalpresent)) * 8
    const exammarks = ((parseInt(getexam1) + parseInt(getexam2)) / 80) * 20
    const assignmentmarks = parseInt(getassmark1) + parseInt(getassmark2)
    const totalinternal = attendance + exammarks + assignmentmarks

    const resultData = {
        name,
        email,
        admnno,
        subject,
        attendance: attendance,
        exammarks: exammarks,
        assignmentmarks,
        totalinternal: totalinternal
    }

    // Email content
    const emailContent = `
        <h3>Internal Marks Report</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Admission No:</strong> ${admnno}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Attendance:</strong> ${attendance}</p>
        <p><strong>Exam Marks:</strong> ${exammarks}</p>
        <p><strong>Assignment Marks:</strong> ${assignmentmarks}</p>
        <p><strong>Total Internal Marks:</strong> ${totalinternal}</p>
    `

    const message = {
        to: email,
        from: 'gauthamkrishnar123@gmail.com',
        subject: `Internal Marks of ${name}`,
        html: emailContent
    }

    sendgrid.send(message)
        .then(() => {
            console.log("Mail sent successfully")
            return response.json(resultData)
        })
        .catch((error) => {
            console.error("Error sending mail:", error)
            return response.status(500).json({ error: "Failed to send email", details: error.toString() })
        })
})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})

