/* Your Code Here */
function createEmployeeRecord(employeeInfo){
    return {
        "firstName" : employeeInfo[0],
        "familyName" : employeeInfo[1],
        "title" : employeeInfo[2],
        "payPerHour" : employeeInfo[3],
        "timeInEvents": [],
        "timeOutEvents": [] 
    }
}

function createEmployeeRecords(employeeList){
    return employeeList.reduce((acc,curr)=>{
        acc.push(createEmployeeRecord(curr));
        return acc;
    },[]);
}

function createTimeInEvent(employee, timeIn){
    let dateTime = timeIn.split(' ');
    employee.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(dateTime[1]),
        "date": dateTime[0]
    });
    return employee;
}

function createTimeOutEvent(employee, timeOut){
    const dateTime = timeOut.split(' ');
    employee.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(dateTime[1]),
        "date": dateTime[0]
    });
    return employee;
}

function hoursWorkedOnDate(employee, date){
    const timeInByDate = employee.timeInEvents.find(element => element.date === date); 
    const timeOutByDate = employee.timeOutEvents.find(element => element.date === date);
    return (timeOutByDate.hour - timeInByDate.hour)/100;
}

function wagesEarnedOnDate(employee, date){
    const hours = hoursWorkedOnDate(employee, date);
    return parseInt(employee.payPerHour) * hours;
}

function allWagesFor(employee){
    return employee.timeInEvents.reduce((acc,curr)=>{
        return acc += wagesEarnedOnDate(employee,curr.date);
    },0);
}

function calculatePayroll(employeesList){
    return employeesList.reduce((acc,curr)=>{
        return acc += allWagesFor(curr);
    },0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

