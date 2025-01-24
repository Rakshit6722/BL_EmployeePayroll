const form = document.querySelector('#employeeForm');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value;

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert('Name must be letters only');
        return
    }

    const profileImage =  document.querySelector("input[name='profile-image']:checked")?.value || ""
    if(!profileImage){
        alert('Please select a profile image');
        return
    }

    const gender = document.querySelector("input[name='profile-gender']:checked")?.value || "";
    if(!gender){
        alert('Please select a gender')
        return
    }

    const department = Array.from(document.querySelectorAll("input[name='department']:checked")).map(element => element?.value)
    if(department.length === 0){
        alert('Please select a department');
        return
    }

    const newEmployee = {
        name,
        profileImage,
        gender,
        department,
        salary: document.getElementById("salary").value,
        startDate:{
            day: document.getElementById("day").value,
            month: document.getElementById("month").value,
            year: document.getElementById("year").value
        },
        notes: document.getElementById("notes")?.value || ""
    }

    if(localStorage.getItem('employees')){
        const existingEmployees = JSON.parse(localStorage.getItem('employees'));
        existingEmployees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(existingEmployees));
    }else{
        localStorage.setItem('employees', JSON.stringify([newEmployee]));
    }
    alert('Employee added successfully');
})

form.addEventListener("reset", (e) => {
    if(!confirm('Are you sure you want to reset the form?')){
        e.preventDefault()
        return
    }else{
        document.getElementById("name").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("day").value = "";
        document.getElementById("month").value = "";
        document.getElementById("year").value = "";
        document.getElementById("notes").value = "";
        document.querySelector("input[name='profile-image']:checked").checked = false;
        document.querySelector("input[name='profile-gender']:checked").checked = false;
        Array.from(document.querySelectorAll("input[name='department']:checked")).forEach(element => element.checked = false);
    }
})