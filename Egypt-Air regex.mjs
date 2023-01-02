import fileDatas from "./datas.mjs";

/// airbook datas

const booking_data = {
    "source": "email",
    "table": "air_booking",
    "issuing_date": "2018-4-10",
    "commission_type": "rate",
    "total_price": 80915,
    "status": "pending",
    "loyalty_card": "",
    "total_net_collection": 0,
    "product_type": "flight",
    "pnr": "KUT8G3",
    "void_airline": 725,
    "is_void": false,
    "transaction_type": "sales",
    "channel": "non_gds",
    "return_date": "2018-4-15",
    "return_time": "14:45",
    "is_open": false,
    "ticket_number": "2101256459",
    "conjunction_number": "",
    "document_type": "eticket",
    "published_fare": 35821,
    "negotiated_fare": 35821,
    "remittance": 80915,
    "markup": 0,
    "penality": 0,
    "total_air_taxes": 45094,
    "total_fare_net": 80915,
    "total_fees_net": 0,
    "total_taxes_fees": 0,
    "total_taxes_fare": 0,
    "total_taxes_commission": 0,
    "total_share": 0,
    "fee": [],
    "commission_rate": -1,
    "commission_amount": 0,
    "discount_amount": 0,
    "fop": "nonref",
    "fop_ref": "",
    "booking_oid": "",
    "issuing_oid": "www.arikair.com",
    "iata": "",
    "traveler_number": 1,
    "traveler_name": "BAMGBOYE/EBUNOLUWA DR",
    "air_taxes": [
       {
          "code": "QT",
          "amount": 3500
       },
       {
          "code": "JY",
          "amount": 1792
       },
       {
          "code": "NG",
          "amount": 3602
       },
       {
          "code": "YQ",
          "amount": 36200
       }
    ],
    "segment": [
       {
          "class": "D",
          "cabin": "business",
          "departure_date": "2018-4-14",
          "departure_time": "11:15",
          "fare_basis": "",
          "leg_price": 0,
          "arrival_city": "CBQ",
          "arrival_airport_code": "CBQ",
          "departure_city": "LOS",
          "departure_airport_code": "LOS",
          "id_airline": "W3",
          "code_share": "",
          "arrival_date": "2018-4-14",
          "arrival_time": "12:45",
          "flying_time": "00:00",
          "mileage": 0,
          "equipment": "",
          "stopover_city": "",
          "is_smoking": false,
          "meal": "",
          "number_stop": 0,
          "franchise": "",
          "flight_number": "W3 638",
          "departure_terminal": "",
          "arrival_terminal": "",
          "status": "Holding Confirmed",
          "seat": ""
       },
       {
          "class": "B",
          "cabin": "economy",
          "departure_date": "2018-4-15",
          "departure_time": "13:15",
          "fare_basis": "",
          "leg_price": 0,
          "arrival_city": "LOS",
          "arrival_airport_code": "LOS",
          "departure_city": "CBQ",
          "departure_airport_code": "CBQ",
          "id_airline": "W3",
          "code_share": "",
          "arrival_date": "2018-4-15",
          "arrival_time": "14:45",
          "flying_time": "00:00",
          "mileage": 0,
          "equipment": "",
          "stopover_city": "",
          "is_smoking": false,
          "meal": "",
          "number_stop": 0,
          "franchise": "",
          "flight_number": "W3 639",
          "departure_terminal": "",
          "arrival_terminal": "",
          "status": "Holding Confirmed",
          "seat": ""
       }
    ],
    "exchange_number": "",
    "remark": [],
    "description": "",
    "notes": "",
    "class": "D",
    "cabin": "business",
    "discount_rate": 0,
    "is_incomplete": true,
    "trip_merged_number": "",
    "id_customer": [],
    "id_airline": 725,
    "id_currency": "NGN",
    "id_product": "myflight",
    "id_supplier": "myflight",
    "id_consultant": "",
    "id_traveler": [],
    "id_invoice": [],
    "id_agent_sign": "00",
    "airline_iata": "W3",
    "airline": "Arik Air",
    "destination": "CBQ",
    "itinerary": " LOS CBQ LOS",
    "currency_rate": 1,
    "int_dom": "domestic",
    "departure_date": "2018-4-14",
    "departure_time": "11:15"
 }

const airbook_data = {
    "TOTRASH": false,
    "ERRMSG": "",
    "BOOKING": []
}

const _regex_ticket_number = /Ticket number:\s*(\d{3}\s\d{10})\s-\s(\d*)/im

const _regex_traveler_name = /Passenger:\s*(.+)\(/im

const _regex_pnr = /Booking ref:\s*(\w+)/i

const _regex_issuing_date = /Date:\s*(\d{2})(\w{3})(\d{4})/i

const _regex_total_price = /Total Amount:.+\:\s(.+)/img

const _regex_equipment = /Baggage:\s*(\w+)/igm

const _regex_number_stop = /Number of stops:\s*(\w+)/i

const _regex_terminal = /Terminal:\s*(\w+)/img

const _regex_class = /Class:\s*(\w)/mig

const _regex_status = /Booking status:\s*(\w+)/i

const _regex_form_of_payement = /Form of payment:\s*(\w+)/i

const _regex_city_and_flight_number = /((?:\w{3,}\s){2,})(?:\s*)((?:\w{3,}\s){2,})(?:\s*)((?:\w{2}\d+))/mg
///((?:\w{3,}\s){2,})(?:\s*)((?:\w{3,}\s){2,})(?:\s*)((?:\w{2}\d+))(?:\s*)((?:\d{2}:\d{2}))(?:\s*)((?:\d{2}:\d{2}))(?:\s*.+\d{2})((?:\w))/mg

const _regex_dep_arr_time = /(?:\w{2}\d{3}\s*(.+))(\d{2}:\d{2})/mg

const _regex_dep_arr_duration = /Duration:\s(\d{2}:\d{2})/mg

const _regex_dep_arr_date = /(\d{2})([A-za-z]{3})\(/mg

const _regex_taxes = /(?:[A-Z]{3}\s)(\d+.\d+)(\w{2})/gmi

const _regex_itinerary = /Fare\sCalculation:([:\w\s\/-]+)\sEND/im

const _regex_id_current = /Taxes:\s*(\w{3})/i

const _regex_issuing_oid = /ref:\s\w+\s+([\s\w]+),/im




///////////// extraction methods ///

const _matcher = function (data, regex, index=0){

    const matchData=data.match(regex)?.slice(1)

    if(index == null){
        return (matchData==null ||matchData==undefined)?false:matchData
    }
    return (matchData==null ||matchData==undefined)?false:matchData[index]
}

const _matcherArray = function(data,_reg){

    let matcher = []
    let m = null;
    //console.log(data)
    while ((m = _reg.exec(data)) !== null) {
        //console.log(m);
        for (let i = 1; i < m.length; i++) {
            matcher.push(m[i].trim())
            //console.log(m[i]);
        }
    }

    
    //const tb_datas = data.match(_first_reg)

    return matcher?((matcher.length==1)?matcher[0]:matcher):null

    // return tb_datas?.map(val=> {
    //     // catch values of datas and code
    //     let matcher = val.match(_reg_spec)?.slice(1)
    //     console.log(val);
    //     console.log(matcher)
    //     //matcher.shift()

       

    // })
}

/// function to extract taxes values and codes
// this function return an array [ [value, code], [value, code] ]
const _extract_taxes = function(datas, _regex){
    const tb_taxes = datas.match(_regex_taxes)

    return tb_taxes?.map(val=> {
            // catch values of taxes and code
        let matcher = val.match(/(\d+.\d+)(\w{2})/i).slice(1,3)

        //matcher.shift()

        return matcher

    })

}

/// compute taxes
    //form of payement
    const _fop = function(_fop){
        let fop = null;
        switch(_fop.toUpperCase()){
            case "CASH": fop = "cash";break;
            case "CC": fop = "nonref";break;
            case "CREDIT": fop = "nonref";break;
            case "CHECK": fop = "check";break;
            default : fop = "nonref";
        };

        return fop
    }
// taxes structures array [ [value, code], [value, code] ]
const _compute_taxes = function(taxes){

    let total = 0

    taxes?.forEach((val) => {
    total += +val[0]
    })
    
    return total
}

//function to extract cabin type
const _cabin = function(t_class){
    const reg_ob = {
        "premium": /U|E/,
        "economy": /G|K|Q|X|Y|T|V|N|M|L|H|B|S|W/,
        "business": /Z|I|D|C|J/,
        "first": /R|P|F|A/
    }

    // loop on reg_ob to catch good cabin index
    for (const [index, val] of Object.entries(reg_ob)) {
        if(val.test(t_class)){
            return index
        }
    }
    
}

// function to extract travel classes
/// function to exact taxes values and codes
// this function return an array [ [value, code], [value, code] ]
const _extract_travel_classes = function(datas){

    return _matcherArray(datas,_regex_class, /\s(\w)/i )

}

// function to get issuing date
    // converte month
    const _convertMonthToInt = function(month){
        //alert('month='+month)
        //console.log(month);
        switch(month.toUpperCase()){
        case "JAN":month="01";			       break;
        case "FEB":month="02";			       break;
        case "MAR":month="03";				   break;
        case "APR":month="04";				   break;
        case "MAY":month="05";				   break;
        case "JUN":month="06";				   break;
        case "JUL":month="07";				   break;
        case "AUG":month="08";				   break;
        case "SEP":month="09";				   break;
        case "OCT":month="10";				   break;
        case "NOV":month="11";				   break;
        case "DEC":month="12";				   break;
        }
        
        return month
        
    }
// converte date
let _year = null

const _convertYearToFourChars = function(year){
    return _year = year.length==2?"20"+year:year
    //return _year
}
// parse date to a good format
 const _issuing_date = function(data, _regex){

    const date = data.match(_regex).slice(1,4);

    //console.log(date);

    if(date){
         return _convertYearToFourChars(date[2])+"-"+_convertMonthToInt(date[1])+"-"+date[0];
    }
   
}

// function to exact departure and arrived date
const _dep_arr_date = function(data){

    return _matcherArray(data,_regex_dep_arr_date )

}
// function to exact departure and arrived time
const _dep_arr_time = function(data){

    return _matcherArray(data,_regex_dep_arr_time)

}
// function to exact departure and arrived duration
const _dep_arr_duration = function(data){

    return _matcherArray(data,_regex_dep_arr_duration)

}

//get itinary 

const _itinary = function(data){
    data = _matcher(fileDatas, _regex_itinerary)
    //data = data.match(fileDatas, _regex_itinerary)
    //data = data?data[0]: null
    data = data.split("M/IT")
    data.pop()

    const _reg = /[\s\/-](-\w{3}|\w{3})\s/gm // /[\s\/-](\w{3})\s/igm
    
    let itinary = ""

   //console.log(_matcherArray(data[0],_reg));

    data.map((val) => {

        const m = _matcherArray(val,_reg)

        m.map((mv,) => {
            itinary += mv+" "
        })
        //console.log(matcherAll(val, _reg))
    })
    //console.log(itinary);
    return itinary.trim()
}


///----------------------Make datas --------------

/// get travel_name
 booking_data.traveler_name = _matcher(fileDatas, _regex_traveler_name)
    //console.log( booking_data.traveler_name);

// get issuing_date
booking_data.issuing_date = _issuing_date(fileDatas, _regex_issuing_date)
    //console.log(booking_data.issuing_date);

//get status
booking_data.status = _matcher(fileDatas, _regex_status)
    //console.log(booking_data.status);

//get pnr
booking_data.pnr = _matcher(fileDatas, _regex_pnr)
    //console.log(booking_data.pnr);

//get ticket_number
const ticker_numb_details = _matcher(fileDatas, _regex_ticket_number, null)
booking_data.ticket_number = ticker_numb_details[0]
booking_data.conjunction_number = ticker_numb_details[1]
booking_data.id_airline  = booking_data.void_airline = ticker_numb_details[0].substring(0,3)
    //console.log(booking_data.ticket_number,"conj:", booking_data.conjunction_number);

// get form of payement 
booking_data.fop = _fop(_matcher(fileDatas, _regex_form_of_payement))

//get total_price
booking_data.total_price = isNaN()?_matcher(fileDatas, _regex_total_price):0


//get total_air_taxes
const tb_taxes = _extract_taxes(fileDatas, _regex_taxes)

booking_data.total_air_taxes =  _compute_taxes(tb_taxes)
    //console.log(tb_taxes, booking_data.total_air_taxes)

// get id_currency
booking_data.id_currency = _matcher(fileDatas, _regex_id_current)
//generate air_taxes

booking_data.air_taxes = tb_taxes.map((val) => ({
    "code": val[1],
    "amount": val[0],
 }))
    //console.log(booking_data.air_taxes);

// get number off stop
booking_data.number_stop = _matcher(fileDatas, _regex_number_stop)
    //console.log(booking_data.number_stop);
// get issuing_oid
booking_data.issuing_oid = _matcher(fileDatas, _regex_issuing_oid)

// generate segment

const classes =  _extract_travel_classes(fileDatas)

const dep_arr_date = _dep_arr_date(fileDatas)

const dep_arr_time = _dep_arr_time(fileDatas)

//get departure_date an time
booking_data.departure_date = dep_arr_date[0]
booking_data.departure_time = dep_arr_time[0]

const dep_arr_duration = _dep_arr_duration(fileDatas)

const equipment = _matcherArray(fileDatas, _regex_equipment)

const dep_arr_city_and_flight_number = _matcherArray(fileDatas, _regex_city_and_flight_number)

// get destination
booking_data.destination = dep_arr_city_and_flight_number[1]

//get cabin
booking_data.cabin =  _cabin(classes[0])

//get traveler class
booking_data.class = classes[0]

//console.log(dep_arr_duration);

booking_data.segment = classes.map((t_class, index) => ({
        "class": t_class,
        "cabin": _cabin(t_class),
        "departure_date": _year+'-'+ _convertMonthToInt(dep_arr_date[2*index+1]) +'-'+ dep_arr_date[2*index],
        "departure_time": dep_arr_time[2*index],
        "fare_basis": "",
        "leg_price": 0,
        "arrival_city": dep_arr_city_and_flight_number[3*index+1],
        "arrival_airport_code": dep_arr_city_and_flight_number[3*index+1],
        "departure_city": dep_arr_city_and_flight_number[3*index],
        "departure_airport_code": dep_arr_city_and_flight_number[3*index],
        "id_airline":booking_data.id_airline, // to be updated
        "code_share": "",
        "arrival_date": _year+'-'+ _convertMonthToInt(dep_arr_date[2*index+1]) +'-'+ dep_arr_date[2*index],
        "arrival_time": dep_arr_time[2*index+1],
        "flying_time": dep_arr_duration[index],
        "mileage": 0,
        "equipment": equipment[index],
        "stopover_city": "",
        "is_smoking": false,
        "meal": "",
        "number_stop": 0,
        "franchise": "",
        "flight_number":  dep_arr_city_and_flight_number[3*index+2],
        "departure_terminal": "",
        "arrival_terminal": "",
        "status": booking_data.status,
        "seat": ""
    
}))

//------------- TO BE UPDATED ----
booking_data.fop_ref="" 
booking_data.remittance = 0
booking_data.negotiated_fare = 0
booking_data.published_fare = 0
booking_data.total_fare_net = 0
booking_data.airline = "Agypt Air"
//booking_data.traveler_number =""

// get airline_iata
booking_data.airline_iata = dep_arr_city_and_flight_number[2] // to be updated

booking_data.int_dom = "international" 

booking_data.itinerary = _itinary(fileDatas)

//-----------------------
console.log(booking_data);
