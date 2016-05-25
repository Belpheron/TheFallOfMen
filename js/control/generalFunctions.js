/**
 * @name getCritical()
 * @author Juan
 * @version 1.0
 * @date 19/05/2016
 * @description given a damage number and critical points, finds a random number
 *      between 0 and 100. If that number is between 0 and criticalPoints, returns 
 *      true
 * @param criticalPoints : chance to do a critical attack
 * @returns {Boolean}
 */
function getCritical(criticalPoints) {
    var result = Math.floor(Math.random() * 101);
    if (result > 0 && result < criticalPoints) {
        return true;
    }
    return false;
}

/**
 * @name putFoutDigits()
 * @author Juan
 * @version 1.0
 * @date 18/05/2016
 * @description converts a number to a four digit number
 * @param number : the number to be converted
 * @returns : the converted number
 */
function putFourDigits(number) {
    var result;
    if (number.toString().length == 1) {
        result = "000" + number;
    } else if (number.toString().length == 2) {
        result = "00" + number;
    } else if (number.toString().length == 3) {
        result = "0" + number;
    } else {
        result = number;
    }
    return result;
}

/**
 * @name getNowSQLDatetime()
 * @author Juan
 * @version 1.0
 * @date 25/03/2016
 * @description gets the current date and time and transforms it to the SQL
 *      datetime format
 * @returns : a string containing the current date and time in SQL datetime format
 */
function getNowSQLDatetime() {
    var currentDate = new Date();
    var now = "";
    now += currentDate.getFullYear() + "-";
    now += currentDate.getMonth()+1 + "-";
    now += currentDate.getDate() + " ";
    now += currentDate.getHours() + ":";
    now += currentDate.getMinutes() + ":";
    now += currentDate.getSeconds();
    return now;
}

/**
 * @name cleanText()
 * @author Juan
 * @version 1.0
 * @date 10/05/2016
 * @description cleans text from html special chars
 * @param text : the text to be cleaned
 * @returns : the cleaned text
 */
function cleanText(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) {
        return map[m];
    });
}

/**
 * @name isDate()
 * @author Juan
 * @date 02/02/2016
 * @version 1.0
 * @description checks if a given object is date or not
 * @param {Object} date : the date to verify
 * @returns {Boolean}   true if the given object is a date
 *                      false if not
 */
function isDate(txtDate)
{
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    var dtMonth = dtArray[3];
    var dtDay = dtArray[5];
    var dtYear = dtArray[1];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2)
    {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

/**
 * @name getMyDate()
 * @author Franc
 * @date 08/05/2016
 * @version 1.0
 * @description return a current date in format MySQL (yyyy-mm-dd)
 * @param none
 * @returns Date.
 */
function getMyDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10)
    {
        dd = '0' + dd
    }

    if (mm < 10)
    {
        mm = '0' + mm
    }
    //this format is best to compares & like MySQL
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}




