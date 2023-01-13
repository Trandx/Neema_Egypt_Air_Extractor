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
                                "void_airline": 725,
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
                                "airline": "",
                                "destination": "",
                                "itinerary": " ",
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
    
                            //alert(fileDatas)


                            ///total\s*\w{3}\s(?<total_fare_net>[\d.]*).+fee\s\w*\s()/gm
                            //fees\s(?<taxe_fee>.+)\s*[\s\w]+(?<issuing_date>\d{2}\s\w*\s\d{4})

                            const _regex_money = /total\s*(?<id_currency>\w{3})\s(?<total_fare_net>[\d.]*).+fee\s\w*\s(?<total_fees_net>\w*.\w*)\s*.+total\s*\w{3}\s(?<total_price>\w*.\w*)[.+\s\w]*fare\s*\w{3}\s(?<published_fare>\w*.\w*)[.+\s\w:/;]*fees\s(?<taxe_fee>.+)\s*[\s\w]+(?<issuing_date>\d{2}\s\w*\s\d{4})/gm

                            const _regex_flight = /Flight\s*(?<flight_number>[\w\s]+)[)\s]*(?<class>\w*)[\s\w]*(?<departure_date>\d{2}\s\w*\s\d{4})[,\s\w]*(?<arrival_date>\d{2}\s\w*\s\d{4})[,\s\w()]*(?<departure_time>(\d{2}:\d{2}))[\s-]*(?<flying_time>[\w\s]*)[\s-]*(?<number_stop>.+)\s*(?<arrival_time>\d{2}:\d{2}).+\s*(?<departure_city>\w+)\s*(?<arrival_city>\w*)[\s\w(]*\)\s*\w*\s*(?<departure_airport_code>(?:\w{3,}\s)+)\s*(?<arrival_airport_code>(?:\w{3,}\s)+).+\s*?(?:Terminal\s*(?<arrival_terminal>\w))/gm

                            const _regex_traveler_name = /details\s*(.+)/gm

                            const _regex_pnr = /Your\sbooking\sis\sconfirmed\s*(.+)/gm

                            const _regex_iata = /IATA\sNo.\s(?<iata>\w*)/gmi

                            const _regex_issuing_oid = /Invoice:\s*\s(?<issuing_oid>[\s\w]*\s)\s/gmi
    
                            const _regex_meal = ""
                            
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
                          

                            (() => {
                                let m = null;
                                
                                const _extractor_segment = () =>{
                                    
                                    let itinerary = "";

                                    let segment = []

                                    let airline_iata = null, id_airline = null

                                    while ((m=_regex_flight.exec(fileDatas)) !== null) {
                                        const gp = m.groups;

                                        //console.log(gp);

                                        itinerary += gp.departure_city.trim()+" "+gp.arrival_city.trim()+" ";

                                        [airline_iata , id_airline] = gp.flight_number.trim().split(" ")

                                        segment.push({
                                            "class": gp.class.trim(),
                                            "cabin": gp.class.trim(),
                                            "departure_date": _GoodFormatDate(gp.departure_date),
                                            "departure_time":gp.departure_time.trim(),
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
                                            "flying_time": gp.flying_time.trim(),
                                            "mileage": 0,
                                            "equipment": "",
                                            "stopover_city": "",
                                            "is_smoking": false,
                                            "meal": "",
                                            "number_stop": !isNaN(gp.number_stop)?gp.number_stop:0,
                                            "franchise": "",
                                            "flight_number": "", /// update
                                            "departure_terminal": gp?.departure_terminal?.trim()||0,
                                            "arrival_terminal": gp.arrival_terminal.trim(),
                                            "status": "Holding Confirmed",
                                            "seat": ""
                                        },)



                                        // for (let i = 1; i < m.length; i++) {
                                        //     matcher.push(m[i].trim())
                                        //     //console.log(m[i]);
                                        // }
                                    }

                                    return {
                                        segment: segment,
                                        itinerary: itinerary,
                                        airline_iata: airline_iata,
                                        id_airline: id_airline
                                    }
                                }

                                const _formatTaxes = () =>{
                                    m =_regex_money.exec(fileDatas)
                                    
                                    const data = m.groups;

                                    console.log(data);

                                    const air_taxes = [];

                                    const taxe_fee = data?.taxe_fee.replace(/\s*\w{3}\s|\s;\s/gm, " ").split(" ")

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

                                //build booking_data

                                const {segment, itinerary, airline_iata , id_airline } = _extractor_segment()
                                const {air_taxes, data, total_air_taxes, fee} = _formatTaxes()

                                booking_data.total_fare_net = data.total_fare_net
                                //booking_data.total_taxes_commission = data.total_taxes_commission
                                booking_data.total_price = data.total_price
                                booking_data.published_fare = data.published_fare
                                booking_data.issuing_date = _GoodFormatDate(data.issuing_date)
                                booking_data.air_taxes = air_taxes
                                booking_data.total_air_taxes = total_air_taxes //
                                booking_data.fee = fee
                                booking_data.total_fees_net = data.total_fees_net
                                booking_data.segment = segment
                                booking_data.itinerary = itinerary.trim()
                                booking_data.destination = segment[segment.length-1]["arrival_city"]
                                booking_data.id_currency = data.id_currency

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
                                
                                booking_data.meal = _matcherArray(fileDatas, _regex_meal)// to be updated
                                booking_data.iata = _matcherArray(fileDatas, _regex_iata)// No .xxxx
                                booking_data.issuing_oid = _matcherArray(fileDatas, _regex_issuing_oid) // WIDE TRavel Deals
                                booking_data.booking_oid = _matcherArray(fileDatas, _regex_issuing_oid) // WIDE TRavel Deals

                                booking_data.int_dom = "international"
                                booking_data.airline = 141

                                booking_data.traveler_name = _matcherArray(fileDatas, _regex_traveler_name)

                                booking_data.pnr = _matcherArray(fileDatas, _regex_pnr)

                                booking_data.id_airline = id_airline
                                booking_data.airline_iata = airline_iata 
                                booking_data.flight_number = airline_iata+" "+id_airline

                                console.log(booking_data);

                            })()
    
                           
                            //-----------------------
                            
                            airbook_data.BOOKING.push(booking_data)
    
                            //console.log(booking_data);
    
    
                            return airbook_data
                        })()