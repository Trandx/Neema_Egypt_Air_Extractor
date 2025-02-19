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
                                "iata": "",
                                "traveler_number": 1,
                                "traveler_name": "",
                                "air_taxes": [
                                {
                                    "code": "Tax",
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
                                    "airline": "",
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
                            const _regex_booking_ref = /BOOKING REFERENCES\s+(?<booking_oid>\d+)/mg

                            const _regex_fare_basis = [
                                /\w{3}\/\w{3}\s+(?<fare_basis>\w+)\s+All/mg,
                            ]

                            const _regex_iata = /IATA Code:\s(?<iata>[\d\s]+)/mg

                            const _regex_airline = /LEGEND\s+(?<airline_iata>\w{2})\s-\s(?<airline>.+)/mg //ok

                            const _regex_fare_and_amount = /\n(?<traveler_name>[\w\s]+)\s+(?<published_fare>\d+.\d{2})\s\w+\s+(?<charge>\d+.\d{2})\s\w+\s+(?<total_price>\d+.\d{2})\s(?<currency>\w+)\s+/mg //ok

                            const _regex_flight = [
                                /(?<departure_city>\w+)\s+-\s(?<departure_terminal>\w+\s{0,1}\d{0,}\w{0,})?\s+\w+,\s(?<departure_date>\d{2}\s\w+\s\d+)\s+(?<departure_time>\d\d:\d\d)\s+(?<flight_number>\w+)\s+\w+,[\s\w,:]+\s(?<cabin>\w+)\s+(?<status>\w+)\s+(?<arrival_city>\w+)\s+-\s(?<arrival_terminal>\w+\s{0,1}\d{0,}\w{0,})?[\s\w,]+\s(?<arrival_date>\d{2}\s\w+\s\d+)\s+(?<arrival_time>\d\d:\d\d)\s+(\(NON-STOP\))?\s+Duration:\s+(?<flying_time>\d\d:\d\d)[\s\w]+:\s(?<equipment>.+)\s+Transit/mgi,
                                
                                /(?<flight_number>\w+)\s+(\(NON-STOP\))?\s+(?<departure_city>\w+)\s+-\s(?<departure_terminal>\w+\s{0,1}\d{0,}\w{0,})?\s+\w+,\s(?<departure_date>\d{2}\s\w+\s\d+)\s+(?<departure_time>\d\d:\d\d)\s+\w+,[\s\w,]+:\d{2}\s+(?<cabin>\w+)\s+(?<status>\w+)\s+(?<arrival_city>\w+)\s+-\s(?<arrival_terminal>\w+\s{0,1}\d{0,}\w{0,})?[\s\w,]+\s(?<arrival_date>\d{2}\s\w+\s\d+)\s+(?<arrival_time>\d\d:\d\d)\s+Duration:\s+(?<flying_time>\d\d:\d\d)[\s\w]+:\s(?<equipment>.+)\s+Transit/mgi
                            ]
                            // /(?<departure_city>\w+)\s-\s(?<departure_terminal>\w+\s{0,1}\d{0,}\w{0,})?\s+\w+,\s(?<departure_date>\d{2}\s\w+\s\d+)\s+(?<departure_time>\d\d:\d\d)\s+(?<flight_number>\w+)\s+\w+,\s(?<arrival_date>\d{2}\s\w+\s\d+)\s+(?<arrival_time>\d\d:\d\d)\s+(?<cabin>\w+)\s+(?<status>\w+)\s+(?<arrival_city>\w+)\s-\s(?<arrival_terminal>\w+\s{0,1}\d{0,}\w{0,})?[\s\w:,]+(\(NON-STOP\))?\s+Duration:\s(?<flying_time>\d\d:\d\d)[\s\w]+:\s(?<equipment>.+)\s+Transit/mg

                            //const _regex_airport_datails = /\s{2}(?<airport>\w+)\s+(?<airport_code>\w+).+\d{14,}/mg //ok

                            const _regex_ticket_details = /(?<itinerary>\w{3}\/\w{3})\s+(?<flight_number>\w+)\s+(?<ticket_number>\d+)\/\d+\s/mg

                            //const _regex_traveler_name = /\w{3}\/\w{3}\s+\w+\s+\d+(\/1)?\s+(?<traveler_name>[\w\s]+)\n\s+/mg

                            const _regex_ancillary_details = [
                                /\w{3}\/\w{3}\s+(?<go_meal>.+)\s+(?<go_bagages>\d+Kg).+\s+\w\d+\s+(?<go_meal_rest>\w+)?\s+.+\s+.+\s+(?<back_meal>.+)\s+(?<back_bagages>\d+Kg).+\s+\w\d+\s+(?<back_meal_rest>\w+\n)?\s/mg,
                                /\w{3}\/\w{3}\s+(?<go_meal>.+)\n.+\s(?<go_bagages>\d+Kg).+\s+\w\d+\s+(?<go_meal_rest>\w+)?/mg,
                                /\w{3}\/\w{3}\s+\w\d{4}\s+(?<go_meal>.+)\s(?<go_bagages>\d+Kg)/mg
                            ] 

                            const _regex_pnr = /PNR\)\s+(?<pnr>\d+)/mg //ok

                            //const _regex_currency = /\s+[\d.]+\s(?<currency>\w+)/m //ok

                            //const _regex_total = /TOTAL IN AED\s+(?<publish_fare>[\d.]+)\s+(?<total_charge>[\d.]+)\s+(?<total_amount>[\d.]+)/gm //ok

                            //const _regex_fare_amount = /TOTAL IN AED\s+(?<total_fare_net>[\d.]+)/gm //ok

                            const _regex_issuing_date = /DATE OF ISSUE\s+(?<issuing_date>\d+\s\w+\s\d+)/gm //ok
                            
                            // const matchData=_regex_flight.exec(fileDatas)

                            // console.log(matchData.groups);
    
                            ///////////// extraction methods ///
                            const _match = (data,_reg) => {
                                let matcher = []
                                let m = null;
                                //console.log(_reg)
                                while ((m = _reg.exec(data)) !== null) {

                                    //console.log(m.groups);
                                    Object.keys(m.groups).forEach(function(key) {
                                        m.groups[key] = m.groups[key]?.trim()
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

                            const _ticketNumberFormat = function(ticket_code) {
                                //const ticket_code = _matcherArray(fileDatas, _regex_ticket_number)[0]
                                const id_airline = parseInt(ticket_code?.slice(0,3))  || '';
                                const ticket_number = parseInt(ticket_code?.substr(3)) || '';

                                return {
                                    id_airline,
                                    ticket_number
                                }
                            }

                                booking_data.iata = _matcherArray(fileDatas, _regex_iata)[0].iata.replace('      ', '').trim()

                                const airline = _matcherArray(fileDatas, _regex_airline)[0];
                                
                                if(airline){
                                    booking_data.airline_iata = airline.airline_iata
                                    booking_data.airline = airline.airline
                                }

                                const pnr_details = _matcherArray(fileDatas, _regex_pnr)[0];

                                booking_data.pnr = pnr_details.pnr

                                const booking_ref = _matcherArray(fileDatas, _regex_booking_ref)[0];

                                booking_data.booking_oid = booking_data.issuing_oid = booking_ref.booking_oid

                                const issuing_date = _matcherArray(fileDatas, _regex_issuing_date)[0]?.issuing_date;

                                if(issuing_date){
                                    booking_data.issuing_date = _GoodFormatDate(issuing_date);
                                }
                                
                                // const fare_amount = _matcherArray(fileDatas, _regex_fare_amount);

                                // booking_data.total_fare_net = fare_amount
                                
                                // const total = _matcherArray(fileDatas, _regex_total);

                                // booking_data.total_price = total[2];
                                // booking_data.total_fare_net = total[0];
                                // booking_data.total_air_taxes = total[1]

                                const fare_and_amount = _matcherArray(fileDatas, _regex_fare_and_amount);

                                //console.log(fare_and_amount);

                                //const airport_datails = _matcherArray(fileDatas, _regex_airport_datails);
                                
                                // let airport = {}
                                
                                // airport_datails.forEach(function(item) {
                                //     airport[item.airport_code] = item.airport
                                // })

                                //console.log('airport_datails', airport_datails, airport);

                                const ticket_details = _matcherArray(fileDatas, _regex_ticket_details);

                                //console.log('ticket_details', ticket_details);

                                //const traveler_names = _matcherArray(fileDatas, _regex_traveler_name);

                                //console.log('traveler_names', traveler_names);

                                const flight_data = _matcherArray(fileDatas, _regex_flight);

                                let flight = {}

                                flight_data.forEach(function(item) {
                                    flight[item.flight_number] = item
                                })
                              
                                //console.log(flight);

                                const ancillary_details = _matcherArray(fileDatas, _regex_ancillary_details)

                                //console.log(ancillary_details);

                                const fare_basis_data = _matcherArray(fileDatas, _regex_fare_basis)

                                const nbr_traveler = fare_and_amount.length;
                                //console.log('fare_and_amount', fare_and_amount);

                                booking_data.traveler_number = nbr_traveler;

                                console.log('ticket_details', ticket_details);
                                
                                const total_traveler_segment = ticket_details.length/nbr_traveler

                                const make_segment = function(key) {
                                    const segment = booking_data.segment[0]
                                    let data_seg = []
                                    let itinerary = ''

                                    const index = key*total_traveler_segment

                                    const {id_airline, ticket_number} = _ticketNumberFormat(ticket_details[index].ticket_number)

                                    booking_data.id_airline = id_airline,
                                    booking_data.void_airline = id_airline,
                                    booking_data.ticket_number = ticket_number

                                    

                                    for (let i = 0; i < total_traveler_segment; i++) {
                                        
                                        segment.airline = booking_data.airline //booking_data.airline_iata
                                        segment.id_airline = id_airline
                                        segment.fare_basis = fare_basis_data[i].fare_basis

                                        const flight_number = ticket_details[i].flight_number
                                        segment.flight_number = flight_number

                                        const airport_code = ticket_details[i].itinerary.split('/')
                                        
                                        segment.departure_airport_code = airport_code[0]

                                        segment.arrival_airport_code = airport_code[1]

                                        console.log(total_traveler_segment%2, i+1 == total_traveler_segment);
                                        if(total_traveler_segment%2 == 0 && i+1 == total_traveler_segment){
                                            console.log(ancillary_details[i]);
                                            segment.meal = `${ancillary_details[i].back_meal} ${(ancillary_details[i].back_meal_rest || '')}`
                                            segment.franchise = ancillary_details[i].back_bagages

                                            itinerary += airport_code[1] + ' '

                                        }else{
                                            //console.log(ancillary_details[i].go_meal);
                                            segment.meal = `${ancillary_details[i].go_meal} ${(ancillary_details[i].go_meal_rest || '')}`
                                            segment.franchise = ancillary_details[i].go_bagages

                                            itinerary += airport_code[0] + ' '+airport_code[1] + ' '
                                        }

                                        if(flight[flight_number]) {
                                            segment.equipment = flight[flight_number].equipment
                                            segment.arrival_time = flight[flight_number].arrival_time
                                            segment.departure_time = flight[flight_number].departure_time
                                            segment.cabin = flight[flight_number].cabin
                                            segment.class = _cabinToClass(flight[flight_number].cabin)
                                            segment.arrival_city = flight[flight_number].arrival_city
                                            segment.departure_city = flight[flight_number].departure_city
                                            segment.departure_terminal = flight[flight_number].departure_terminal || ''
                                            segment.arrival_terminal = flight[flight_number].arrival_terminal || ''
                                            segment.flying_time = flight[flight_number].flying_time
                                            segment.arrival_date = _GoodFormatDate(flight[flight_number].arrival_date)
                                            segment.departure_date = _GoodFormatDate(flight[flight_number].departure_date)
                                        }

                                        data_seg.push({...segment})
                                        
                                    }

                                    booking_data.itinerary = itinerary.trim()
                                    booking_data.destination = booking_data.itinerary.slice(-3)
                                    booking_data.departure_date =  data_seg[0].departure_date
                                    booking_data.departure_time = data_seg[0].departure_time
                                    booking_data.cabin = data_seg[0].cabin
                                    booking_data.class = data_seg[0].class
                                    booking_data.return_date = data_seg[data_seg.length -1].arrival_date
                                    booking_data.return_time = data_seg[data_seg.length -1].arrival_time
                                    
                                    return data_seg
                                }

                                const data = fare_and_amount.map(function(item, key) {
                                    booking_data.traveler_name = item.traveler_name
                                    booking_data.total_price = parseFloat(item.total_price)
                                    booking_data.published_fare = parseFloat(item.published_fare)
                                    booking_data.total_air_taxes = parseFloat(item.charge)
                                    booking_data.air_taxes[0].amount = parseFloat(item.charge)
                                    booking_data.id_currency = item.currency
                                    const segment = make_segment(key)


                                    //booking_data.remittance = booking_data.published_fare +  booking_data.total_air_taxes - booking_data.commission_amount

                                    booking_data.total_fare_net = booking_data.published_fare //data.published_fare // will be updated
                                    booking_data.negotiated_fare = booking_data.total_fare_net // will be updated
                                    booking_data.remittance = booking_data.published_fare -  booking_data.negotiated_fare // will be updated

                                    const d = {
                                        ...booking_data,
                                        segment
                                    };

                                    //console.log(d);

                                    return d
                                })

                                //console.log(data[0].segment);

                                //console.log(data[0].ticket_number, data[2].ticket_number)

                                airbook_data.BOOKING = data

                            
                            //-----------------------
                            
                            //airbook_data.BOOKING.push(booking_data)
    
                            //console.log(airbook_data);
    
    
                            return airbook_data
                        })()