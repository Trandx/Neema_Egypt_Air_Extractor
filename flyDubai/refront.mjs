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

        const _regex_traveler_name = /Passenger\sdetails\s*(?<traveler_name>.+)/gm

        const _regex_pnr = /Your\sbooking\sis\sconfirmed\s*(?<pnr>.+)/gm

        const _regex_flight_number = /Flight\s*(?<flight_number>.+)\)/gm

        const _regex_departure_arrival_date = /(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})/gm
        ///(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})[,+\s\w]/gm

        const _regex_departure_arrival_time = /(?<departure_time>\d{2}:\d{2})[\w\s,()_-]*(?<arrival_time>\d{2}:\d{2})/gm

        const _regex_flying_time = /-\s(?<flying_time_hour>\d{2})\w\s(?<flying_time_min>\d{2})/gm

        const _regex_issuing_date = /Booked\son\s*(?<issuing_date>\d{2}\s\w*\s\d{4})/gm

        const _regex_departure_arrival_city = /(?:\n\s*(?<departure_city>(?:[A-Z\(][a-z\-\)]+\s){2,})\s*(?<arrival_city>(?:[A-Z\(][a-z\-\)]+\s){2,})\s+)/g

        const _regex_meal = /(?<meal>\w+)\s*meal\s*\(\w+\)/g

        const _regex_terminal = /(?:Terminal\s*(?<terminal_from>\w))(?:\s{6,}Terminal\s*(?<terminal_to>\w))|(?:Terminal\s*(?<terminal_from_only>\w))|(?:\n\s{6,}Terminal\s*(?<terminal_to_only>\w))/g

        const _regex_class_cabin = /\s{2}(?<class_cabin>Economy|Premium|Business|First)/g

        const _regex_franchise = /(?:(?<hand>\d+)\shand|(?<checked>\d+)\s*kg\schecked)\s*\w*\s*baggage/g

        const _regex_issuing_oid = /Invoice:\s*\s(?<issuing_oid>[\s\w]*\s)\s/gmi

        const _regex_fop_ref = /(?<fop_ref>\*+\d{4})/gmi

        const _regex_booking_oid = _regex_issuing_oid

        const _regex_total_price = /Booking\stotal\s*\w+\s(?<total_price>[\d.,]*)/gi

        const _regex_total_fare_net = /Fare\s*total\s*[A-Z]{3}\s*(?<total_fare_net>\d+[.,]\d+(?:.\d{2})?)/ig

        //const _regex_fare_net = /Passenger\stotal\s*\w+\s(?<fare_net>[\d.,]*)/gi

        const _regex_total_fees_net = /(?:fee\s\w*\s(?<total_fees_net>[\d.,]*))/gmi

        const _regex_id_currency = /Passenger\stotal\s*(?<id_currency>\w{3})/gi

        const _regex_air_taxes = /\s*\w{3}\s|\s;\s/gm

        const _regex_taxes_fees = /Taxes\/fees\s(?<taxes_fees>.+)/gi

       // const _regex_taxes_fare = ""
        
        const _regex_published_fare = /Base\s*Fare\s*[A-Z]{3}\s*(?<publihed_fare>\d+[.,]\d+(?:.\d{2})?)/ig

        const _regex_iata = /IATA\sNo.\s(?<iata>\w*)/gmi

        const _regex_departure_airport_code = /(?<departure_airport_code>[A-Z]{3})\s*(?<arrival_airport_code>[A-Z]{3})/g

        const _regex_stop_over = /(?<stop_over>Stopover)\s*in\s*(?<stop_over_city>\w+)/g;

       

        const _matcherArray = function(data,_reg){
    
            let matcher = []
            let m = null;
            //console.log(data)
            while ((m = _reg.exec(data)) !== null) {
                //console.log(m);
                for (let i = 1; i < m.length; i++) {
                    //console.log(m[i]);
                    matcher.push(m[i]?.trim())
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

            const _formatTaxes = () =>{
                m =_regex_money.exec(fileDatas)
                
                const data = m.groups;

                console.log(data);

                const air_taxes = [];

                const taxe_fee = data?.taxe_fee.replace(_regex_air_taxes, " ").split(" ")

                const fee = []

                for (let i = 0; i < (taxe_fee.length-1)/2; i++) {

                    fee.push(taxe_fee[2*i+1])

                    air_taxes.push(
                        {
                            "code": taxe_fee[2*i],
                            "amount": taxe_fee[2*i+1]
                        }
                    )
                    
                }

                return {
                            air_taxes: air_taxes,
                            data: data,
                            total_air_taxes: taxe_fee[taxe_fee.length-1],
                            fee: fee,
                        }
            }

            /// build BOOKING DATA
            return (() => {

                booking_data.traveler_name = _matcherArray(fileDatas, _regex_traveler_name)
                booking_data.pnr = _matcherArray(fileDatas, _regex_pnr)

                booking_data.id_currency = _matcherArray(fileDatas, _regex_id_currency)
                
                booking_data.published_fare = _matcherArray(fileDatas, _regex_published_fare) 
                booking_data.iata = _matcherArray(fileDatas, _regex_iata)
                booking_data.total_fees_net = _matcherArray(fileDatas, _regex_total_fees_net)
                booking_data.total_fare_net = _matcherArray(fileDatas, _regex_total_fare_net)
                booking_data.total_price = _matcherArray(fileDatas, _regex_total_price)

                booking_data.booking_oid = _matcherArray(fileDatas, _regex_booking_oid)
                booking_data.issuing_oid = _matcherArray(fileDatas, _regex_issuing_oid)

                booking_data.fop_ref = _matcherArray(fileDatas, _regex_fop_ref)
                booking_data.issuing_date = _GoodFormatDate(_matcherArray(fileDatas, _regex_issuing_date))

                

                // method to update segment, air_taxes and so on

                const _getTerminal = function(){
                    const terminal_data = _regex_terminal.exec(fileDatas).groups

                    return {
                        departure_terminal: terminal_data.terminal_from??terminal_data.terminal_from_only,
                        arrival_terminal:  terminal_data.terminal_to??terminal_data.terminal_to_only
                    }
                }

                // const _getFlightNumber = function(){

                //     const _regex_flight_number_data = _regex_flight_number.exec(fileDatas).groups.flight_number
                    
                //     const [airline_iata , id_airline] = _regex_flight_number_data.trim().split(" ")

                //     return {
                //         airline_iata: airline_iata,
                //         id_airline: id_airline
                //     }
                // }

                const { air_taxes, total_air_taxes, fee} = (() =>{
                    
                   const  taxes_fees_data =_regex_taxes_fees.exec(fileDatas).groups.taxes_fees

                    console.log(taxes_fees_data);

                    const air_taxes = [];

                    const taxes_fees = taxes_fees_data?.replace(/\s*\w{3}\s|\s;\s/gm, " ").split(" ")

                    const fee = []

                    for (let i = 0; i < (taxes_fees.length-1)/2; i++) {

                        fee.push(taxes_fees[2*i+1])

                        air_taxes.push(
                            {
                                "code": taxes_fees[2*i],
                                "amount": taxes_fees[2*i+1]
                            }
                        )
                        
                    }

                    return {
                                air_taxes: air_taxes,
                                total_air_taxes: taxes_fees[taxes_fees.length-1],
                                fee: fee,
                            }
                })()
                   
                const {segment }  = (() => {

                    let m = null
                    let segment = []

                    const class_cabin = _matcherArray(fileDatas, _regex_class_cabin)
                    const flight_number = _matcherArray(fileDatas, _regex_flight_number)
                    const departure_arrival_date = _matcherArray(fileDatas, _regex_departure_arrival_date)
                    const departure_arrival_time = _matcherArray(fileDatas, _regex_departure_arrival_time)
                    const departure_arrival_city = _matcherArray(fileDatas, _regex_departure_arrival_city)
                    const meal = _matcherArray(fileDatas, _regex_meal)
                    const flying_time = _matcherArray(fileDatas, _regex_flying_time) 
                    const departure_airport_code = _matcherArray(fileDatas, _regex_departure_airport_code)
                    const franchise = _matcherArray(fileDatas, _regex_franchise)
                    const stop_over = _matcherArray(fileDatas, _regex_stop_over)
                    
                    for (let index = 0; index < flight_number.length; index++) {
                        const num = flight_number[index];
                        
                        const {departure_terminal, arrival_terminal} = _getTerminal()
                        segment.push({
                            "class": class_cabin[index],
                            "cabin": class_cabin[index],
                            "departure_date": _GoodFormatDate(departure_arrival_date[2*index]),
                            "departure_time":departure_arrival_time[2*index]+":"+departure_arrival_time[2*index],
                            "fare_basis": "",
                            "leg_price": 0,
                            "arrival_city": departure_arrival_city[2*index+1],
                            "arrival_airport_code": departure_airport_code[2*index],
                            "departure_city": departure_arrival_city[2*index],
                            "departure_airport_code": departure_airport_code[2*index+1],
                            "id_airline": flight_number[index].split(" ")[1], // update
                            "code_share": "",
                            "arrival_date": _GoodFormatDate(departure_arrival_date[2*index+1]),
                            "arrival_time": departure_arrival_time[2*index+1]+":"+departure_arrival_time[2*index+1],
                            "flying_time": flying_time[index],
                            "mileage": 0,
                            "equipment": "",
                            "stopover_city": stop_over[index]||"",
                            "is_smoking": false,
                            "meal": meal[index],
                            "number_stop": stop_over[index]?1:0,
                            "franchise": +(franchise[index]||0+franchise[index+1]||0)+" kg",
                            "flight_number": num, /// update
                            "departure_terminal": departure_terminal||"",
                            "arrival_terminal": arrival_terminal||"",
                            "status": "Holding Confirmed",
                            "seat": ""
                        },)
                    
                    }

                    booking_data.airline_iata = flight_number[0].split(" ")[0]
                    // const taxes_fees_data =   _matcherArray(fileDatas, _regex_total_taxes_fees)
                    // booking_data.total_taxes_fees = ""
                    // booking_data.fee = []
                    // booking_data.air_taxes.push(
                    //     {
                    //         "code": taxe_fee[2*i],
                    //         "amount": taxe_fee[2*i+1]
                    //     }
                    // )

                    return {
                        segment: segment
                        
                    }

                })()

               //console.log(data);


                //const flight_number = _matcherArray(fileDatas, _regex_flight_number);
   
                // [booking_data.airline_iata, booking_data.id_airline] = flight_number?.trim().split(" ")

                // console.log(booking_data);

            booking_data.segment = segment
            booking_data.arrival_date = segment[segment.length-1]["arrival_date"]
            booking_data.arrival_time = segment[segment.length-1]["arrival_time"]
            booking_data.arrival_terminal = segment[segment.length-1]["arrival_terminal"]
            booking_data.arrival_airport_code = segment[segment.length-1]["arrival_airport_code"]
            booking_data.arrival_city = segment[segment.length-1]["arrival_city"]

            booking_data.class = segment[0]["class"]
            booking_data.cabin = segment[0]["cabin"]

            booking_data.air_taxes = air_taxes
            booking_data.total_air_taxes = total_air_taxes //
            booking_data.fee = fee

            return booking_data;

            })()

            

    })()