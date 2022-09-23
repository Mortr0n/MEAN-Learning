

// let students = [
//     {name: 'Remy', cohort: 'Jan'},
//     {name: 'Genevieve', cohort: 'March'},
//     {name: 'Chuck', cohort: 'Jan'},
//     {name: 'Osmund', cohort: 'June'},
//     {name: 'Nikki', cohort: 'June'},
//     {name: 'Boris', cohort: 'June'}
// ];

// students.forEach(student => {
//     console.log(`Name: ${student.name}, Cohort: ${student.cohort}`);
// })

let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
        {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
        {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
};

for(const prop in users){
    console.log(`${prop}`);
    let obj = users[prop];
    for(const item in obj){
        const items = obj[item].first_name + obj[item].last_name
        const count = items.length;
        console.log(`${Number(item)+1} - ${obj[item].first_name}, ${obj[item].last_name} ${ obj[item].first_name} - ${count}`)
    }
}


