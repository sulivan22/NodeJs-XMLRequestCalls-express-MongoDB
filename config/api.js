const parseString = require('xml2js').parseString;
const axios = require('axios');



// const GetUserInfo = {
//     method: 'get',
//     url: 'https://www.voipinfocenter.com/API/Request.ashx?command=GetUserInfo&username=BTTF.DEV&password=Temporal_2021&customer=test4',
// };

const CreateUser = {
    method: 'get',
    url: `https://www.voipinfocenter.com/API/Request.ashx?command=createcustomer&username=BTTF.DEV&password=Temporal_2021&customer=${ customer }&customerpassword=${ password }`,
};


axios(CreateUser)
    .then(response => {
        parseString(response.data, function(err, result) {
            if (err) {
                console.log(err);
            } else {

                events = result

                //console.log(result.CreateAccount);
                console.log(events.GetUserInfo)
                    //console.log(result.GetUserInfo.EmailAddress[0]); // returns a json array
                    //JSON.stringify(events.GetUserInfo.Balance[0]).replace(/\"/g, "")


                // var customeruser = events.GetUserInfo.EmailAddress[0],
                //     separador = "@"
                // limite = 1,
                //     customer = customeruser.split(separador, limite);


                //console.log(result.GetUserInfo.Customer[0]).replace(/\"/g, "")
                //console.log(result.CreateAccount.Customer[0])
                //console.log(events.GetUserInfo.EmailAddress[0]).replace(/\"/g, "").split('@')[0]
                //JSON.stringify(events.GetUserInfo.Customer[0]).replace(/\"/g, "").split('*')[0]
            }
        });
    });





// const xx = {
//     method: 'get',
//     url: 'https://www.voipinfocenter.com/API/Request.ashx?command=getuserinfo&username=call2casa&password=sulivandbl12h&customer=sulivan&customerpassword=dbl12h',
// };

// const changepassword = {
//     method: 'get',
//     url: 'https: //www.voipinfocenter.com/API/Request.ashx?command=changepassword&username=_&password=_&customer=_ &oldcustomerpassword=_&newcustomerpassword=_',
// };





//`https://www.voipinfocenter.com/API/Request.ashx?command=createcustomer&username=call2casa&password=sulivandbl12h&customer=${ customer }&customerpassword=${ password }`