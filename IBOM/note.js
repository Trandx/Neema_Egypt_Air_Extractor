const _regex_class = [
    /\s\(([A-Z])\)/im,
    /^(\w)\n\n\t\w/im,
    /ticket.res.book.design.code.(\w)/im
]
    var classe = ''
for(i = 0; i = _regex_class.length-1; i++){
    classe = matchRe(_regex_class[i],val,1).trim();
    if(classe != "") break;

    //alert('class='+classe)
}