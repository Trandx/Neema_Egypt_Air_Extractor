import fileDatas from "./datas.js";

						/// airbook datas

                       (() =>{

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
                                "iata": "",
                                "traveler_number": 1,
                                "traveler_name": "",
                                "air_taxes": [
                                {
                                    "code": "",
                                    "amount": 0
                                },
                                
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
                                "airline_iata": "W3",
                                "airline": "000",
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


                            ///total\s*\w{3}\s(?<total_fare_net>[\d.]*).+fee\s\w*\s()/gm
                            //fees\s(?<taxe_fee>.+)\s*[\s\w]+(?<issuing_date>\d{2}\s\w*\s\d{4})

                            // const _regex_money = /total\s*(?<id_currency>\w{3})\s(?<total_fare_net>[\d.]*).+fee\s\w*\s(?<total_fees_net>\w*.\w*)\s*.+total\s*\w{3}\s(?<total_price>\w*.\w*)[.+\s\w]*fare\s*\w{3}\s(?<published_fare>\w*.\w*)[.+\s\w:/;]*fees\s(?<taxe_fee>.+)\s*[\s\w]+(?<issuing_date>\d{2}\s\w*\s\d{4})/gm

                            

                            const _regex_flight = /(?<segment>Flight\s\d\s-).+\n.*ARR\.\sTIME\s*(?<flight_code>\w+)\s+(?<flight_number>\d+)\n\s*(?<departure_time>\d\d:\d\d)\s*(?<arrival_time>\d\d:\d\d)\s*(?<departure_city>[a-zA-Z\s]+)\((?<departure_airport_code>\w*)\)\s*(?<arrival_city>[\w\s]*)\((?<arrival_airport_code>\w*)\)[\s\w]*(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})\n*.*\n*\s*ticket.res.book.design.code.(?<class>\w).\s*(?<fare_basis>\w*)\s*(?<flying_time>.+\s)\s*(?<franchise>\d*\sKG)\s+(?<seat>\w+)/gm
                            // /ARR\.\sTIME\s*(?<flight_code>\w+)\s+(?<flight_number>\d+)\n\s*(?<departure_time>\d\d:\d\d)\s*(?<arrival_time>\d\d:\d\d)\s*(?<departure_city>[a-zA-Z\s]+)\((?<departure_airport_code>\w*)\)\s*(?<arrival_city>[\w\s]*)\((?<arrival_airport_code>\w*)\)[\s\w]*(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})/gm
                            
                            

                            const _regex_ticket_number = /Ticket Number\s*(?<ticket_number>\d+)/gm
                            ///\*Ticket Number\*\n\n\*(?<ticket_number>\d+)*/gm

                            const _regex_traveler_name = /Name\s*(?<traveler_name>.+)/gm
                            ///Name\*\n*\*?(?<traveler_name>[\w\s\/]*)\*?/gm

                            const _regex_pnr = /Booking Reference\s*(?<pnr>\w*)/gm
                            ///Fare Breakdown\*\n*\*?(?<pnr>[\w\s\/]*)\*?/gm

                            // const _regex_flight_number = /ARR\.\sTIME\s*(?<flight_code>\w+)\s+(?<flight_number>\d+)/gm
                            // ///ARR\.\sTIME\*\n*\*(?<flight_code>\w+)\*\n+\*(?<flight_number>\d{3})*/gm

                            const _regex_franchise = /\*?(?<franchise>\d*\sKG)\*?/gm

                            const _regex_fop = /Form of payment\s*(?<fop>\w+)/gm
                            ///\*Form of payment\*\n*\*(?<fop>\w)*/gm

                            const _regex_fare = /FARE\s+\W\s(?<fare>[\d,.]+)/gm
                            ///\*FARE\*\n*\*\W\s(?<fare>[\d,.]+)*/gm

                            const _regex_taxes = /TAXES\s*\W\s(?<taxe>.+\w)/gm
                            ///\*TAXES\*\n*\*\W\s(?<taxe>.+\w)/gm

                            const _regex_currency = /TAXES\s*(?<currency>\W)/gm

                            const _regex_surchage = /SURCHARGES\s*\W\s(?<taxe>.+)/gm
                            ///\*SURCHARGES\*\n*\*\W\s(?<taxe>.+\w)/gm

                            const _regex_total = /TOTAL\s*\W\s(?<taxe>.+)/gm
                            ///\*TOTAL\*\n*\*\W\s(?<taxe>.+\w)/gm

                            const _regex_issuing_date = /Issuing Airline And Date[\s\w.\W]+\/\s(?<issuing_date>\w+)/gm
                            //01MAY24
                            const _regex_iata = /IATA Number\s*(?<iata>\d+)/gm
                            ///\*IATA Number\*\n*\*(?<iata>\d+)*/gm

                            const _regex_cabin = /ticket.res.book.design.code.(?<class>\w)/gm

                            const _regex_seat = /MINS\s*(?<seat>\w+)\s+\d+\sKG/gm

                            
                            // const matchData=_regex_flight.exec(fileDatas)

                            // console.log(matchData.groups);
    
    
                            ///////////// extraction methods ///
    
                            const _matcher = function (data, regex, index=0){
    
                                const matchData=data.match(regex)?.slice(1)

                                console.log(matchData);
    
                                if(index == null){
                                    return (matchData==null ||matchData==undefined)?false:matchData
                                }
                                return (matchData==null ||matchData==undefined)?false:matchData[index]
                            }
    
                            const _matcherArray = function(data,_reg){
    
                                let matcher = []
                                let m = null;
                                //console.log(_reg)
                                while ((m = _reg.exec(data)) !== null) {
                                    //console.log(m);
                                    for (let i = 1; i < m.length; i++) {
                                        
                                        matcher.push(m[i].trim())
                                        //console.log(m[i]);
                                    }
                                }
    
                                
                                //const tb_datas = data.match(_first_reg)

                                if(matcher.length == 0){
                                    return '';
                                }else{
                                    return (matcher.length==1)?matcher[0]:matcher
                                }
    
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
                            
    
                            /// compute taxes
                            //form of payement
                            const _fop = function(_fop){
                                let fop = null;
                                switch(_fop.toUpperCase()){
                                    case "CASH": fop = "cash";break;
                                    case "CC": fop = "credit_card";break;
                                    case "CREDIT": fop = "nonref";break;
                                    case "CHECK": fop = "check";break;
                                    default : fop = "nonref";
                                };

                                return fop
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

                            const _GoodFormatDate = (date) =>{
                                date = date.split(" ");
                                //console.log(date);
                                return _convertYearToFourChars(date[2])+"-"+_convertMonthToInt(date[1])+"-"+date[0];
                            }

                            const _tiketNumberFormat = () => {
                                const ticket_code = _matcherArray(fileDatas, _regex_ticket_number)[0]
                                const id_airline = ticket_code?.slice(0,3) || '';
                                const ticket_number = ticket_code?.substr(3) || '';

                                return {
                                    id_airline,
                                    ticket_number
                                }
                            }

                            const _formatTaxes = function(){
                                let taxes = _matcherArray(fileDatas, _regex_taxes)
                                console.log(taxes);
                                taxes = taxes.split(' ')

                                const air_taxes = []

                                const fee = []

                                for (let i = 0; i < taxes.length; i=i+3) {
                                    console.log(taxes[i]);
                                    const taxeParsed = parseFloat(taxes[i].replace(',', ''));

                                    fee.push(taxes[i+1])

                                    air_taxes.push(
                                        {
                                            "code": taxes[i+1],
                                            "amount": taxeParsed
                                        }
                                    )
                                    
                                }

                                let _surchage = _matcherArray(fileDatas, _regex_surchage)

                                if(_surchage) {
                                    _surchage = _surchage.split(' ')

                                    air_taxes.push(
                                        {
                                            "code": _surchage[1],
                                            "amount": parseFloat(_surchage[0].replace(',', ''))
                                        }
                                    )

                                    fee.push(_surchage[1])
                                }

                                let _total_air_taxes = 0

                                air_taxes.forEach(({amount}) => {
                                    _total_air_taxes += +amount
                                })
                                //const taxe_fee = data?.taxe_fee.replace(/\s*\w{3}\s|\s;\s/gm, " ").split(" ")

                                return {
                                            air_taxes: air_taxes,
                                            //data: data,
                                            total_air_taxes: _total_air_taxes,
                                            fee: fee,
                                        }
                            }

                            const _currency = () => {
                                const _c = _matcherArray(fileDatas, _regex_currency)
                                let currency = ''

                                switch (_c) {
                                    case '₦': currency = 'NGN'; break;
                                    case '$': currency = 'USA'; break;
                                
                                    default:
                                        break;
                                }

                                return currency
                            }
                          
                            const _traveler_name = () => {
                                const name = _matcherArray(fileDatas, _regex_traveler_name)[0]

                                return name.split('(')[0]?.trim()
                            }

                            (() => {
                                let m = null;
                                
                                const _extractor_segment = () =>{
                                    
                                    let itinerary = "";

                                    let segment = []

                                    let airline_iata = null, flight_number = null
                                    
                                    const { id_airline, ticket_number} = _tiketNumberFormat()
                                
                                    while ((m=_regex_flight.exec(fileDatas)) !== null) {
                                        const gp = m.groups;

                                        itinerary += gp.departure_city.trim()+" "+gp.arrival_city.trim()+" ";

                                       airline_iata = gp.flight_code.trim()
                                       flight_number = gp.flight_number.trim()

                                        const _class = _matcherArray(fileDatas, _regex_cabin)
                                        segment.push({
                                            "class": _class || '',
                                            "cabin": _cabin(_class) || '',
                                            "departure_date": _GoodFormatDate(gp.departure_date),
                                            "departure_time": gp.departure_time.trim(),
                                            "fare_basis": "",
                                            "leg_price": 0,
                                            "arrival_city": gp.arrival_city.trim(),
                                            "arrival_airport_code": gp.arrival_airport_code.trim(),
                                            "departure_city": gp.departure_city.trim(),
                                            "departure_airport_code": gp.departure_airport_code.trim(),
                                            "id_airline": id_airline, // update
                                            "code_share": "",
                                            "arrival_date": _GoodFormatDate(gp.arrival_date),
                                            "arrival_time": gp.arrival_time.trim(),
                                            "flying_time": gp.flying_time?.trim() || "00:00",
                                            "mileage": 0,
                                            "equipment": "",
                                            "stopover_city": "",
                                            "is_smoking": false,
                                            "meal": "",
                                            "number_stop": !isNaN(gp.number_stop)?gp.number_stop:0,
                                            "franchise": _matcherArray(fileDatas, _regex_franchise),
                                            "flight_number": airline_iata+" "+flight_number, // update
                                            "departure_terminal": gp?.departure_terminal?.trim() || "",
                                            "arrival_terminal": gp.arrival_terminal?.trim() || "",
                                            "status": "Holding Confirmed",
                                            "seat": _matcherArray(fileDatas, _regex_seat) || ''
                                        },)



                                        // for (let i = 1; i < m.length; i++) {
                                        //     matcher.push(m[i].trim())
                                        //     //console.log(m[i]);
                                        // }
                                    }

                                    return {
                                        segment,
                                        itinerary,
                                        airline_iata,
                                        id_airline, 
                                        ticket_number
                                    }
                                }

                                //build booking_data

                                const {segment, itinerary, airline_iata , id_airline, ticket_number } = _extractor_segment()
                                const {air_taxes, /*data,*/ total_air_taxes, fee} = _formatTaxes()

                                const _issuing_dateForamatted = () => {
                                   const _issuing_date = _matcherArray(fileDatas, _regex_issuing_date)

                                   return _GoodFormatDate( _issuing_date.substr(0, 2)+" "+_issuing_date.substr(2, 3)+" "+_issuing_date.substr(5, undefined))
                                }

                                booking_data.total_fare_net = +_matcherArray(fileDatas, _regex_fare).replace(",", "");
                                booking_data.ticket_number = ticket_number
                                //booking_data.total_taxes_commission = data.total_taxes_commission
                                booking_data.total_price = +_matcherArray(fileDatas, _regex_total).replace(",", "")
                                booking_data.published_fare = booking_data.total_fare_net //data.published_fare // will be updated
                                booking_data.negotiated_fare = booking_data.total_fare_net // will be updated
                                booking_data.remittance = booking_data.published_fare -  booking_data.negotiated_fare // will be updated
                                booking_data.issuing_date = _issuing_dateForamatted()
                                booking_data.air_taxes = air_taxes
                                booking_data.total_air_taxes = total_air_taxes //
                                //booking_data.fee = fee
                                // booking_data.total_fees_net = data.total_fees_net
                                booking_data.segment = segment
                                booking_data.itinerary = itinerary.trim()
                                booking_data.destination = segment[segment.length-1]["arrival_city"]
                                booking_data.id_currency = _currency()

                                booking_data.departure_date = segment[0]["departure_date"]
                                booking_data.departure_time = segment[0]["departure_time"]
                                booking_data.departure_airport_code = segment[0]["departure_airport_code"]
                                booking_data.departure_city = segment[0]["departure_city"]
                                booking_data.departure_terminal = segment[0]["departure_terminal"]

                                booking_data.arrival_date = segment[segment.length-1]["arrival_date"]
                                booking_data.arrival_time = segment[segment.length-1]["arrival_time"]
                                booking_data.arrival_terminal = segment[segment.length-1]["arrival_terminal"]
                                booking_data.arrival_airport_code = segment[segment.length-1]["arrival_airport_code"]
                                booking_data.arrival_city = segment[segment.length-1]["arrival_city"]

                                booking_data.class = segment[0]["class"]
                                booking_data.cabin = segment[0]["cabin"]
                                
                                // booking_data.meal = _matcherArray(fileDatas, _regex_meal)// to be updated
                                booking_data.iata = _matcherArray(fileDatas, _regex_iata)// No .xxxx
                                // booking_data.issuing_oid = _matcherArray(fileDatas, _regex_issuing_oid) // WIDE TRavel Deals
                                // booking_data.booking_oid = _matcherArray(fileDatas, _regex_issuing_oid) // WIDE TRavel Deals

                                booking_data.int_dom = "international"
                                // booking_data.airline = 000

                                booking_data.traveler_name = _traveler_name()  

                                booking_data.pnr = _matcherArray(fileDatas, _regex_pnr)
                                booking_data.fop = _fop(_matcherArray(fileDatas, _regex_fop))

                                booking_data.id_airline = id_airline
                                booking_data.airline_iata = airline_iata 
                                booking_data.flight_number = segment[0].flight_number

                                console.log(booking_data);

                            })()
    
                           
                            //-----------------------
                            
                            airbook_data.BOOKING.push(booking_data)
    
                            //console.log(booking_data);
    
    
                            return airbook_data
                        })()