// const employeeData = JSON.parse(localStorage.getItem("employees"));
// console.log(employeeData);
const apiUrl = "http://localhost:3000/employeeList"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log("into the script file")
$(document).ready(() => {
    fetchData()
});

function fetchData(){
    $.ajax({
        type: "GET",
        url: apiUrl,
        success: (employeeData) => {
            if (employeeData) {
                employeeData.forEach((employee) => {

                    console.log("employee", employee)
                    const departmentHTML = employee.department
                        .map((dept) => `<span>${capitalizeFirstLetter(dept)}</span>`)
                        .join(", ");


                    const dateString = `${employee.startDate.day} ${months[employee.startDate.month - 1]} ${employee.startDate.year}`;

                    const row = `
                    <tr>
                        <td>
                            <div class="emp-dash-table-body-img">
                                <img src="${employee.profileImage}" alt="Profile Image" />
                                <span>${capitalizeFirstLetter(employee.name)}</span>
                            </div>
                        </td>
                        <td>${capitalizeFirstLetter(employee.gender)}</td>
                        <td>${departmentHTML}</td>
                        <td>${employee.salary}</td>
                        <td>${dateString}</td>
                        <td>
                            <img onclick="deleteEmployee('${employee.id}')" src="../assets/delete.png" alt="Delete" class="delete-icon"/>
                            <img onclick="editEmployee('${employee.id}')" src="../assets/pen.png" alt="Edit"/>
                        </td>
                    </tr>`;

                    $(".emp-dash-table-body").append(row);
                });
            }
        },
        error: (err) => {
            console.log(err.message)
        }
    },
    )
}

function deleteEmployee(employeeId) {
    console.log("employeeId", employeeId)
    $.ajax({
        type: "DELETE",
        url: `${apiUrl}/${employeeId}`,
        success: () => {
            alert("Employee deleted succesfully!")         
            window.location.reload();

        },
        error: (err) => {
            console.log(err.message)
        }
    })
}

function editEmployee(index) {
    $.get(`${apiUrl}/${index}`,function(data){
        // console.log(data)
        localStorage.setItem("employeeToEdit", JSON.stringify(data));
        window.location.href = "empForm.html";
    })
}

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

