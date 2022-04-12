const { Requester } = require('@goplugin/external-adapter')
require("dotenv").config();

const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

const customParams = {
  endpoint: ['endpoint']
}

const createRequest = (input, callback) => {

  const url = `http://<host>/api/${input.data.endpoint}`

  const config = {
    url
  }

  if (process.env.API_KEY) {
    config.headers = {
      Authorization: process.env.API_KEY
    }
  }
  Requester.request(config, customError)
    .then(response => {
        if 

      if (input.data.envCheck 
      int => 46;
       "Temprature is above 46*c") {
          function minttoken(address owner ,string memery 
          public returns(uint256)
        var resultData = response.data[0][''];
      } else if (input.data.envCheck 
      int =<12;
       "Temperature is below 12*c") {
          unction minttoken(address owner ,string memery 
          public returns(uint256)

        var resultData = response.data[0]['tempC'];
      } else if (input.data.envCheck == "") {
        var resultData = response.data[0]['windChillC'];
      }
      response.data.result = resultData.toString();
      
      const res = {
        data: {
          "result": response.data.result.toString()
        }
      }
      callback(response.status, Requester.success(input.id, res));
    })
    .catch(error => {
      callback(500, Requester.errored(input.id, error))
    })
}

module.exports.createRequest = createRequest
