const mailgun = require("mailgun-js")
const DOMAIN  = 'sandbox3061015a63154323aad5ea2c4344af40.mailgun.org'
const KEY     = process.env.MG_KEY
const mg      = mailgun({apiKey: KEY, domain: DOMAIN})


exports.handler = async event => {
  // const subject = event.queryStringParameters.name || 'World'
  const from = `${event.queryStringParameters.firstname} ${event.queryStringParameters.lastname} <${event.queryStringParameters.email}>`
  const data = {
    from,
    to:   'olivier.sarrouy@gmail.com',
    subject: `[membership-request] ${event.queryStringParameters.firstname} ${event.queryStringParameters.lastname}`,
    text: 'Testing some Mailgun awesomness!'
  }

  mg.messages().send(data, function (error, body) {



    console.log('body')
    console.log(body)
    console.log('error')
    console.log(error)

    if (error) {
      return {
        statusCode: 500,
        body: error.toString(),
      }
    } else {
      return {
        statusCode: 200,
        body,
      }
    }

  })


}