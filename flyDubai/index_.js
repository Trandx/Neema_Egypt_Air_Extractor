import fileDatas from "./datas.js";

/// airbook datas

(function() {

    const booking_data = {
        "source": "email",
        "table": "air_booking",
        "issuing_date": "",
        "commission_type": "rate",
        "total_price": 0,
        "status": "pending",
        "loyalty_card": "",
        "total_net_collection": 0,
        "product_type": "flight",
        "pnr": "",
        "void_airline": 0,
        "is_void": false,
        "transaction_type": "sales",
        "channel": "non_gds",
        "return_date": "",
        "return_time": "",
        "is_open": false,
        "ticket_number": "",
        "conjunction_number": "",
        "document_type": "eticket",
        "published_fare": 0,
        "negotiated_fare": 0,
        "remittance": 0,
        "markup": 0,
        "penality": 0,
        "total_air_taxes": 0,
        "total_fare_net": 0,
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
        "issuing_oid": "",
        "iata": "FZ",
        "traveler_number": 1,
        "traveler_name": "",
        "air_taxes": [
        // {
        //     "code": "Tax",
        //     "amount": 0
        // },
        
        ],
        "segment": [
        {
            "class": "",
            "cabin": "",
            "departure_date": "",
            "departure_time": "",
            "fare_basis": "",
            "leg_price": 0,
            "arrival_city": "",
            "arrival_airport_code": "",
            "departure_city": "",
            "departure_airport_code": "",
            "id_airline": "",
            "airline": "flydubai",
            "code_share": "",
            "arrival_date": "",
            "arrival_time": "",
            "flying_time": "00:00",
            "mileage": 0,
            "equipment": "",
            "stopover_city": "",
            "is_smoking": false,
            "meal": "",
            "number_stop": 0,
            "franchise": "",
            "flight_number": "",
            "departure_terminal": "",
            "arrival_terminal": "",
            "status": "Holding Confirmed",
            "seat": ""
        },
        
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
        "id_airline": "",
        "id_currency": "",
        "id_product": "myflight",
        "id_supplier": "myflight",
        "id_consultant": "",
        "id_traveler": [],
        "id_invoice": [],
        "id_agent_sign": "00",
        "airline_iata": "00",
        "airline": "flydubai",
        "destination": "",
        "itinerary": " ",
        "currency_rate": 1,
        "int_dom": "international",
        "departure_date": "",
        "departure_time": ""
    }

    const airbook_data = {
        "TOTRASH": false,
        "ERRMSG": "",
        "BOOKING": []
    }

    //alert(fileDatas)

    const _regex_traveler_name = /Passenger details\s*(?<traveler_name>.+)/gm

    const _regex_pnr = /Your\sbooking\sis\sconfirmed\s*(?<pnr>.+)/gm

    //const _regex_booking_ref = _regex_pnr

    const _regex_flight_number = /Flight\s*(?<flight_number>[\w\s\/]+)[)\s]*/gm

    const _regex_flight_date = /(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})/gm

    const _regex_cabin = /(?<cabin>\w*)\sValue/gmi

    const _regex_flight_dep_arr_time = /(?<departure_time>\d{2}:\d{2})[\w\s-]*(?<arrival_time>\d{2}:\d{2})/gm

    const _regex_flight_time = /-\s(?<flying_time>[\w\s]*)\s-/gm

    const _regex_franchise = /\s(?<hand_franchise>\d+\sKg)\shand[-\w\s()]+\s(?<other_franchise>\d+\sKg)\schecked/gmi

    const _regex_meal = /(?<meal>\w*)\smeal/gm

    const _regex_city = /\s{2,}(?<departure_city>\w+)\s((International Airport)|Airport)\s+(?<arrival_city>[-\w]+)\s([\(\)\w]+\s)?((International Airport)|Airport)\s/gm

    const _regex_city_code = /\s+(?<departure_airport_code>[A-Z]{2,4})\s+(?<arrival_airport_code>[A-Z]{2,4})\s\s/gm

    const _regex_stopover_city = /Stopover\sin\s(?<stopover_city>.+)\s\(\w{3}\)\s\|/gm

    const _regex_fare_basis = /Base fare\s+(?<id_currency>\w{3})\s(?<fare_basis>[\d.,]+)/gm

    const _regex_total_price = /Passenger total\s+\w+\s(?<total_price>[\d.,]+)/gm

    const _regex_taxes = /\s(?<code>[A-Z0-9]{2})\s\w{3}\s(?<amount>[\d.,]+)/gm

    const _regex_total_fare = /Fare total\s+\w+\s(?<total_fare>[\d.,]+)/gm

    const _regex_total_taxe = /Taxes\/fees[\w\s.,;]+;?\s{2,}\w+\s(?<total_taxe>[\d.,]+)/gm

    const _regex_issuing_date = /number:.+\s.+(?<issuing_date>\d{2}\s\w+\s\d+)/gm

    const _regex_fop = /(?<fop>\w+)\snumber/gm

    const _regex_fop_ref = /reference\s(?<fop_ref>\d+)/gm

    // const matchData=_regex_flight.exec(fileDatas)

    // console.log(matchData.groups);

    ///////////// extraction methods ///
    const _match = function(data,_reg) {
        let matcher = []
        let m = null;
        //console.log(_reg)
        while ((m = _reg.exec(data)) !== null) {

            console.log(m.groups);
            Object.keys(m.groups).forEach(function(key) {
                if(m.groups[key]){
                    m.groups[key] = m.groups[key].trim()
                    return
                }
                m.groups[key] = ''
            })

            matcher.push(m.groups)
        }

        if(matcher.length == 0){
            return '';
        }else{
            return matcher;
        }
    }

    const _matcherArray = function(data,_reg){

        if(Array.isArray(_reg)){
            let data_match = ''
            _reg.forEach(function(reg) {
                if(data_match !== '') return
                data_match = _match(data, reg)
                //console.log(reg, data_match);
            })
            //console.log(data_match);
            return data_match
        }else{
            return  _match(data,_reg);
        }

    }

    /// compute taxes
    //form of payement

    // const _fop = function(_fop){
    //     let fop = 'noref';
    //     switch(_fop.toUpperCase()){
    //         case "CASH": fop = "cash";break;
    //         case "CC": fop = "credit_card";break;
    //         case "CREDIT": fop = "nonref";break;
    //         case "CHECK": fop = "check";break;
    //         default : fop = "nonref";
    //     };
    //     return fop
    // }

    const _cabinToClass = function(cabin){
        switch (cabin?.toLowerCase()) {
            case 'premium':
                return 'U'
            case 'economy':
                return 'Y'
            case 'business':
                return 'D'
            case 'first':
                return 'F'
        }
    }
    
    // function to get issuing date
    // converte month
        
    const _convertMonthToInt = function(month){
        //alert('month='+month)
        //console.log(month);
        //console.log(month);
        
        switch(month = month.trim().toUpperCase()){
            
        case "JANUARY": month = "01";     break;			 
        case "FEBRUARY": month = "02";    break;			 
        case "MARCH": month = "03";   break;	
        case "APRIL": month = "04";   break;	
        case "MAY": month = "05";     break;	
        case "JUNE": month = "06";    break;	
        case "JULY": month = "07";    break;	
        case "AUGUST": month = "08";  break;	
        case "SEPTEMBER": month = "09";   break;	
        case "OCTOBER": month = "10";     break;	
        case "NOVEMBER": month = "11";    break;	
        case "DECEMBER": month = "12";    break;
        
        case "JAN": month = "01";     break;			 
        case "FEB": month = "02";    break;			 
        case "MAR": month = "03";   break;	
        case "APR": month = "04";   break;	
        case "MAY": month = "05";     break;	
        case "JUN": month = "06";    break;	
        case "JUL": month = "07";    break;	
        case "AUG": month = "08";  break;	
        case "SEP": month = "09";   break;	
        case "OCT": month = "10";     break;	
        case "NOV": month = "11";    break;	
        case "DEC": month = "12";    break;	

        }
        return month;
    }
    // converte date
    const _convertYearToFourChars = function(year){
        return year.length==2?"20"+year:year
        //return _year
    }

    const _GoodFormatDate = function(date) {
        date = date.split(" ");
        //console.log(date);
        return _convertYearToFourChars(date[2])+"-"+_convertMonthToInt(date[1])+"-"+date[0];
    }

    const _stringToTime = function(data) {
        return data.replace(/h\s/g, ':').replace('min', '')
    }

    const _computeFranchise = function(franchise_data) {
        return franchise_data.map(function(franchise) {
            let m = 0

            Object.keys(franchise).forEach(function(key) {
                m += +franchise[key].toLowerCase().replace(/\skg/g,'')
            })
            
            return m+' kg'
        })
    }

    const _build_itinerary = function(dep_city_code, arr_city_code) {
        const itinerary_length = booking_data.itinerary.length

        if (itinerary_length != 0) {
            const last_city_code = booking_data.itinerary.trim().split(' ').pop()

            console.log(last_city_code, dep_city_code, last_city_code !== dep_city_code, booking_data.itinerary);

            if(last_city_code !== dep_city_code){
                    booking_data.itinerary += dep_city_code +  ' ' +  arr_city_code + ' '
            }else{
                booking_data.itinerary += arr_city_code + ' '
            }
        }
    }

    const fop_data = _matcherArray(fileDatas, _regex_fop);

    if(fop_data.length !== 0){
        booking_data.fop = (fop_data[0].fop.toLowerCase() === 'card') ? 'CC': 'nonref'
    }

    const fop_ref_data = _matcherArray(fileDatas, _regex_fop_ref);

    if(fop_ref_data.length != 0){
        booking_data.fop_ref = fop_ref_data[0].fop_ref
    }

    const pnr_details = _matcherArray(fileDatas, _regex_pnr);

    if(pnr_details.length !== 0){
        booking_data.pnr = pnr_details[0].pnr
        booking_data.ticket_number = booking_data.pnr

        booking_data.booking_oid = booking_data.issuing_oid = booking_data.pnr
    }

    const ticket_date = _matcherArray(fileDatas, _regex_issuing_date)

    if(ticket_date.length !== 0){
        booking_data.issuing_date = _GoodFormatDate(ticket_date[0].issuing_date);
    }

    const total_taxes = _matcherArray(fileDatas, _regex_total_taxe)

    if (total_taxes.length !== 0) {
        booking_data.total_air_taxes = +total_taxes[0].total_taxe.replace(',', '');
    }

    const fare = _matcherArray(fileDatas, _regex_total_fare)

    if (fare.length !== 0) {
        console.log('fare', fare);
        
        booking_data.total_fare_net = +fare[0].total_fare.replace(',', '');
    }

    const traveler_name_data = _matcherArray(fileDatas, _regex_traveler_name)


    let cabin_list = _matcherArray(fileDatas, _regex_cabin)

    //console.log(cabin_list);

    const total_price_data = _matcherArray(fileDatas,_regex_total_price)

    if (total_price_data.length !== 0) {
        booking_data.total_price = +total_price_data[0].total_price.replace(',', '')
    }

    const fare_basis_data = _matcherArray(fileDatas, _regex_fare_basis)

    if (fare_basis_data.length !== 0) {

        booking_data.id_currency = fare_basis_data[0].id_currency
    }

    const taxes_data = _matcherArray(fileDatas, _regex_taxes)

    if (taxes_data.length !== 0) {
        booking_data.air_taxes = taxes_data.map(function(taxe){
            taxe.amout = +taxe.amount.replace(',', '')

            return taxe
        })
    }

    const city_data = _matcherArray(fileDatas, _regex_city)

    const city_code_data = _matcherArray(fileDatas, _regex_city_code)

    const stopover_city_data = _matcherArray(fileDatas,_regex_stopover_city)

    console.log('stopover_city_data', stopover_city_data);
    

    const meal_data = _matcherArray(fileDatas, _regex_meal)

    const flight_dep_arr_time_data = _matcherArray(fileDatas, _regex_flight_dep_arr_time)

    console.log(flight_dep_arr_time_data);
    
    const flight_date_data = _matcherArray(fileDatas, _regex_flight_date)

    const flight_time_data = _matcherArray(fileDatas, _regex_flight_time)

    let franchise_data = _matcherArray(fileDatas, _regex_franchise)
    
    if (franchise_data.length != 0) {
        franchise_data = _computeFranchise(franchise_data)
    }

    const flight_data = _matcherArray(fileDatas, _regex_flight_number);

    let new_flight_data =  []

    flight_data.forEach(function (item) {
        console.log('item', item);
        
        const sub_fligth = item.flight_number.split('/')

        new_flight_data = [
            ...new_flight_data,
            ...sub_fligth,
        ]
    })

    const nbr_traveler = traveler_name_data.length;
    //console.log('fare_and_amount', fare_and_amount);

    booking_data.traveler_number = nbr_traveler;

    //const total_traveler_segment = new_flight_data.length/nbr_traveler

    //const make_segment = function(segment_k) {

        //const index = segment_k*total_traveler_segment

        const segment_list = new_flight_data.map(function(flight_number, key) {

            const segment = booking_data.segment[0]

            segment.meal = meal_data[key].meal
            segment.id_airline = booking_data.iata
            segment.flight_number = flight_number

            segment.departure_date = _GoodFormatDate(flight_date_data[key].departure_date)

            segment.arrival_date = _GoodFormatDate(flight_date_data[key].arrival_date)

            segment.arrival_time = flight_dep_arr_time_data[key].arrival_time

            segment.departure_time = flight_dep_arr_time_data[key].departure_time
            

            segment.flying_time = _stringToTime(flight_time_data[key].flying_time)

            segment.departure_city = city_data[key].departure_city
            segment.arrival_city = city_data[key].arrival_city

            segment.departure_airport_code = city_code_data[key].departure_airport_code

            segment.arrival_airport_code = city_code_data[key].arrival_airport_code

            if (!cabin_list[key]) {
                cabin_list.push({
                    cabin: cabin_list[key-1].cabin
                })
            }

            if (!franchise_data[key]) {
                franchise_data.push(franchise_data[key-1])
            }

            segment.franchise = franchise_data[key]

            segment.cabin = cabin_list[key].cabin
            segment.class = _cabinToClass(segment.cabin)

            segment.fare_basis = +fare_basis_data[0].fare_basis.replace(',', '')

            segment.meal = meal_data[key].meal

            _build_itinerary(segment.departure_airport_code,  segment.arrival_airport_code)
            
            if (stopover_city_data.length != 0 && stopover_city_data[key]) {
                segment.stopover_city = stopover_city_data[key].stopover_city

                segment.number_stop = 1
            }
            

            //console.log( segment);

            return segment

        })

        

    //return data_seg
    //}

    const data = traveler_name_data.map(function(item, key) {

        booking_data.traveler_name = item.traveler_name
        //const segment = make_segment(key)

        booking_data.itinerary.trim()
        booking_data.segment = segment_list

        booking_data.departure_date =  segment_list[0].departure_date
        booking_data.departure_time = segment_list[0].departure_time
        booking_data.cabin = segment_list[0].cabin
        booking_data.class = segment_list[0].class
        booking_data.return_date = segment_list[segment_list.length -1].arrival_date
        booking_data.return_time = segment_list[segment_list.length -1].arrival_time


        //booking_data.remittance = booking_data.published_fare +  booking_data.total_air_taxes - booking_data.commission_amount

        booking_data.published_fare = booking_data.total_fare_net //data.published_fare // will be updated
        booking_data.negotiated_fare = booking_data.total_fare_net // will be updated
        booking_data.remittance = booking_data.published_fare -  booking_data.negotiated_fare // will be updated

        //console.log(d);

        return booking_data
    })

airbook_data.BOOKING = data

//-----------------------

//airbook_data.BOOKING.push(booking_data)

console.log(airbook_data);


return airbook_data
})()