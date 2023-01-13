import fileDatas from "./datas.mjs";

    /// airbook datas

    (() =>{

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
            "void_airline": 141,
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
            "iata": "",
            "traveler_number": 1,
            "traveler_name": "",
            "air_taxes": [
            {
                "code": "QT",
                "amount": 3500
            },
            
            ],
            "segment": [
            {
                "class": "",
                "cabin": "",
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
            "class": "",
            "cabin": "",
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
            "airline_iata": "",
            "airline": 141,
            "destination": "",
            "itinerary": " ",
            "currency_rate": 1,
            "int_dom": "international",
            "departure_date": "2018-4-14",
            "departure_time": "11:15"
        }

        const airbook_data = {
            "TOTRASH": false,
            "ERRMSG": "",
            "BOOKING": []
        }

        const _regex_extract_data = /ELECTRONIC\sTICKET(?<header>[\s\*\w:\/,-@'.()]*)\*IMPORTANT\sNOTICE[\s\*\w:\/,-@'.()]*BEFORE\sDEPARTURE.\s*(?<footer>[\s\*\w:\/,-@'.()]*)SEND\sBY\sAGENT/gm
        
        const _regex_ticket_number =  /TICKET'S NUMBER'S\s*:\s*(?<void_airline>\d{3})-(?<ticket_number>\d+)/g

        const _regex_id_agent_sign = /ISSUE\sAGENT:\s*(?<id_agent_sign>.+)/g

        const _regex_traveler_name = /INTERNET\s*NAME:\s*\*(?<traveler_name>.+)\*/g

        const _regex_pnr = /BOOKING\sREF.:\s*.+\*(?<pnr>.+)\*/g    ///FOID:\s*(?<pnr>.+)/ 

        const _regex_flight_number =  /FOID:\s*(?<flight_number>.+)/ // /NRO:\s*\*(?<flight_number>.+)\*/

        const _regex_fly_lines = /\*(?<departure_city>[\w\s]+)\s*\*(?<airline_iata>\w{2})\s(?<flight_number>\d+)\s(?<class>\w)\s*\*(?:(?<arrival_date_day>\d{1,2})(?<arrival_date_month>\w{3}))\s+(?<depature_time>\d+)\**\s(?<arrival_time>\d+)\*\s*(?<fare_basis>\w+)\s*(?<franchise>\w+)\s+(?<unknow>\w+)\s\*\s*(?<arrival_city>.+)\*/g

        const _regex_issuing_date = /ISSUE\sDATE:\s*(?<issuing_date>\d{2}\s\w{3}\s\d{4})/g


        const _regex_franchise = /(?:(?<hand>\d+)\shand|(?<checked>\d+)\s*kg\schecked)\s*\w*\s*baggage/g

        const _regex_issuing_oid = /Invoice:\s*\s(?<issuing_oid>[\s\w]*\s)\s/gmi

        const _regex_fop = /PAYMENT\s*:\s+(?<fop>\w+)/g

        const _regex_itinary_data = /FARE\sCALC.:([\s\w.]*)/gm
        
        const _regex_itinary = /\s(?<itinary>[A-Z]{3})\s/gm

        const _regex_id_currency = /AIR\sFARE\s*:\s(?<id_currency>\w{3})/gi

        const _regex_airline = /ISSUING\sAIRLINE\s*:\s*(?<airline>.+)/g



        const _regex_booking_oid = _regex_issuing_oid

        const _regex_total_price = /TOTAL.+\s(?<total_price>\d+.\d+)/gm

        const _regex_air_taxes = /\s(?<air_taxes_code>\d+.\d+)(?<air_taxes_amount>[A-Z]{2})\s/gm


        const _regex_total_fare_net = /AIR\sFARE\s*:.+\s(?<total_fees_net>\d+.\d+)/gm
       

        const _matcherArray = function(data,_reg, trimable=true){
    
            let matcher = []
            let m = null;
            //console.log(data)
            while ((m = _reg.exec(data)) !== null) {
               // console.log(m);
                for (let i = 1; i < m.length; i++) {
                    //console.log(m[i]);
                    trimable?matcher.push(m[i]?.trim()):matcher.push(m[i])
                    
                    //console.log(m[i]);
                }
            }

            return matcher?((matcher.length==1)?matcher[0]:matcher):null

        }

        // function to get issuing date
            // converte month
            
        const _convertMonthToInt = function(month){
            //alert('month='+month)
            //console.log(month);
            //console.log(month);
            
            switch(month = month.trim().toUpperCase()){
                
            case "JAN": month = "01";     break;			 
            case "FEB": month = "02";    break;			 
            case "MAR": month = "03";   break;	
            case "APR": month = "04";   break;	
            case "MAY": month = "05";     break;	
            case "JUN": month = "06";    break;	
            case "JUL": month = "07";    break;	
            case "AUGT": month = "08";  break;	
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
        
        const _GoodFormatDate = (date) =>{
            date = date.split(" ");
            return _convertYearToFourChars(date[2])+"-"+_convertMonthToInt(date[1])+"-"+date[0];
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

        /// build BOOKING DATA
        
        // (() => {

        //     const [h_data, f_data] = _matcherArray(fileDatas, _regex_extract_data)
            
        //     const [void_airline, ticket_number] = _matcherArray(h_data, _regex_ticket_number)

        //     const itinary_data = _matcherArray(f_data, _regex_itinary_data, false)
        //     const itinary = _matcherArray(itinary_data, _regex_itinary)

        //     // extracting data form header

        //     booking_data.traveler_name = _matcherArray(h_data, _regex_traveler_name)
            
        //     booking_data.pnr = _matcherArray(h_data, _regex_pnr)
        //     booking_data.id_agent_sign = _matcherArray(h_data, _regex_id_agent_sign)

        //     booking_data.ticket_number = ticket_number
        //     booking_data.void_airline = void_airline

        //     // extracting data from footer

        //     booking_data.id_currency = _matcherArray(f_data, _regex_id_currency)
            
        //     booking_data.itinerary = itinary

        //     booking_data.airline = _matcherArray(h_data, _regex_airline)

        //     booking_data.fop = _matcherArray(f_data, _regex_fop)
        //     booking_data.issuing_date = _GoodFormatDate(_matcherArray(fileDatas, _regex_issuing_date))

        //     booking_data.total_price = _matcherArray(f_data, _regex_total_price)
            
        //     // const { air_taxes, total_air_taxes, fee} = (() =>{
                
        //     //    const  taxes_fees_data =_regex_taxes_fees.exec(fileDatas).groups.taxes_fees

        //     //     console.log(taxes_fees_data);

        //     //     const air_taxes = [];

        //     //     const taxes_fees = taxes_fees_data?.replace(/\s*\w{3}\s|\s;\s/gm, " ").split(" ")

        //     //     const fee = []

        //     //     for (let i = 0; i < (taxes_fees.length-1)/2; i++) {

        //     //         fee.push(taxes_fees[2*i+1])

        //     //         air_taxes.push(
        //     //             {
        //     //                 "code": taxes_fees[2*i],
        //     //                 "amount": taxes_fees[2*i+1]
        //     //             }
        //     //         )
                    
        //     //     }

        //     //     return {
        //     //                 air_taxes: air_taxes,
        //     //                 total_air_taxes: taxes_fees[taxes_fees.length-1],
        //     //                 fee: fee,
        //     //             }
        //     // })()
                   
        //     // const {segment }  = (() => {
        //     //     let segment = []
        //     //     const segment_data = _matcherArray(h_data, _regex_fly_lines)

        //     //     const nb = 12
                
        //     //     for (let index = 0; index < segment_data.length/nb; index++) {
                    
        //     //         segment.push({
        //     //             "class": segment_data[index*nb+3],
        //     //             "cabin": _cabin(segment_data[index*nb+3]),
        //     //             "departure_date": _GoodFormatDate(segment_data[index*nb+4]+" "+segment_data[index*nb+5]+" "+booking_data.issuing_date.match(/\w{4}/i)), // day, month year
        //     //             "departure_time": segment_data[index*nb+6].substring(0, 1)+":"+segment_data[index*nb+6].substring(2, 3),
        //     //             "fare_basis": segment_data[index*nb+8],
        //     //             "leg_price": 0,
        //     //             "arrival_city": segment_data[index*nb+11],
        //     //             "arrival_airport_code": departure_airport_code[2*index],
        //     //             "departure_city": departure_arrival_city[2*index],
        //     //             "departure_airport_code": departure_airport_code[2*index+1],
        //     //             "id_airline": segment_data[index*nb+1], // update
        //     //             "code_share": "",
        //     //             "arrival_date": _GoodFormatDate(segment_data[index*nb+4]+" "+segment_data[index*nb+5]+" "+booking_data.issuing_date.match(/\w{4}/i)), // will write function for computing date automaticaly
        //     //             "arrival_time": segment_data[index*nb+7].substring(0, 1)+":"+segment_data[index*nb+7].substring(2, 3),
        //     //             "flying_time": "", // writing function to compute 
        //     //             "mileage": 0,
        //     //             "equipment": "",
        //     //             "stopover_city": "",
        //     //             "is_smoking": false,
        //     //             "meal": "",
        //     //             "number_stop": 0,
        //     //             "franchise":  segment_data[index*nb+9].substring(0, 1),
        //     //             "flight_number": segment_data[index*nb+2], /// update
        //     //             "departure_terminal":"",
        //     //             "arrival_terminal": "",
        //     //             "status": "Holding Confirmed",
        //     //             "seat": ""
        //     //         },)
                
        //     //     }

        //     //     // booking_data.airline_iata = flight_number[0].split(" ")[0]
                

        //     //     return {
        //     //         segment: segment
                    
        //     //     }

        //     // })()
               

        //     // booking_data.segment = segment
        //     // booking_data.arrival_date = segment[segment.length-1]["arrival_date"]
        //     // booking_data.arrival_time = segment[segment.length-1]["arrival_time"]
        //     // booking_data.arrival_terminal = segment[segment.length-1]["arrival_terminal"]
        //     // booking_data.arrival_airport_code = segment[segment.length-1]["arrival_airport_code"]
        //     // booking_data.arrival_city = segment[segment.length-1]["arrival_city"]

        //     // booking_data.class = segment[0]["class"]
        //     // booking_data.cabin = segment[0]["cabin"]

        //     // booking_data.air_taxes = air_taxes
        //     // booking_data.total_air_taxes = total_air_taxes //
        //     // booking_data.fee = fee

        //     console.log(booking_data)

        //     return booking_data;

        // })()

    })()


    