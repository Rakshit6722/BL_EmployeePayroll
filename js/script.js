const employeeData = JSON.parse(localStorage.getItem("employees"));
console.log(employeeData);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log("into the script file")
$(document).ready(() => {
    if (employeeData) {
        employeeData.forEach((employee,index) => {

            const departmentHTML = employee.department
                .map((dept) => `<span>${dept}</span>`)
                .join(", "); 


            const dateString = `${employee.startDate.day} ${months[employee.startDate.month-1]} ${employee.startDate.year}`;

            const row = `
                <tr>
                    <td>
                        <div class="emp-dash-table-body-img">
                            <img src="${employee.profileImage}" alt="Profile Image" />
                            <span>${employee.name}</span>
                        </div>
                    </td>
                    <td>${employee.gender}</td>
                    <td>${departmentHTML}</td>
                    <td>${employee.salary}</td>
                    <td>${dateString}</td>
                    <td>
                        <img onclick="deleteEmployee(${index})" src="../assets/delete.png" alt="Delete" class="delete-icon" data-index="${index}">
                        <img onclick="editEmployee(${index})" src="../assets/pen.png" alt="Edit">
                        <img>
                    </td>
                </tr>`;

            $(".emp-dash-table-body").append(row);
        });
    }
});

function deleteEmployee(index) {
    console.log("delete icon clicked");
    employeeData.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employeeData));
    window.location.reload();
}

function editEmployee(index) {
    console.log(index)
    console.log("edit icon clicked");
    window.location.href = `empForm.html?index=${index}`;
}

