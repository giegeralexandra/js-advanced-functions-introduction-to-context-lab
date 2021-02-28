// Your code here
function createEmployeeRecord(array) {
    let employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(array){
    return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record,dateStamp){
    let dateSplit = dateStamp.split(" ");
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateSplit[1], 10),
        date: dateSplit[0]
    })
    return record 
}

function createTimeOutEvent(record, dateStamp){
    let dateSplit = dateStamp.split(" ");
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateSplit[1], 10),
        date: dateSplit[0]
    })
    return record 
}

function hoursWorkedOnDate(record, date){
    let inObj = record.timeInEvents.find(function(e){return e.date === date})
    let outObj = record.timeOutEvents.find(function(e){return e.date === date})
    return (outObj.hour - inObj.hour)/100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record,date) * record.payPerHour
}

function allWagesFor(record) {
    let array = record.timeInEvents.map(events => events.date);
    let wages = array.reduce(function(total, date){
        return wagesEarnedOnDate(record, date) + total
    }, 0);
    return wages 
}

function findEmployeeByFirstName(records, firstNameGiven){
    return records.find(function(e){
        return e.firstName === firstNameGiven
    })
}

function calculatePayroll(records){
    let wagesArray = records.map(record => allWagesFor(record))
    return wagesArray.reduce(function(total, num){
        return total + num},
        0)
}