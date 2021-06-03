function birthdayChecker(){
    var birth = document.getElementById("birthday");

    if(birth != ""){
        var date = new Date();
        var month = date.getMonth() + 1;
        var year = date.getFullYear() - 18;
        if(month < 10)
            month = '0' + month.toString();
        
        if(day < 10)
            day = '0' + day.toString();

        var minDate = year + '-' + month + '-' + day;
    }

    console.log(minDate);
    console.log(birth);
}