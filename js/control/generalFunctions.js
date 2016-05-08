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




