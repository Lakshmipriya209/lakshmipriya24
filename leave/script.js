
// Initial leave balance
let casualLeaveBalance = 10;
let medicalLeaveBalance = 15;

// Function to apply for leave
function applyLeave() {
    const leaveType = document.getElementById('leave-type').value;
    const leaveDays = parseInt(document.getElementById('leave-days').value);

    // Check if leave days is valid
    if (isNaN(leaveDays) || leaveDays <= 0) {
        alert('Please enter a valid number of days.');
        return;
    }

    // Apply leave based on leave type
    if (leaveType === 'casual') {
        if (leaveDays > casualLeaveBalance) {
            alert('Not enough casual leave balance.');
        } else {
            casualLeaveBalance -= leaveDays;
            alert(`Casual leave approved for ${leaveDays} days.`);
        }
    } else if (leaveType === 'medical') {
        if (leaveDays > medicalLeaveBalance) {
            alert('Not enough medical leave balance.');
        } else {
            medicalLeaveBalance -= leaveDays;
            alert(`Medical leave approved for ${leaveDays} days.`);
        }
    }

    // Update the leave balance display
    updateLeaveBalance();
}

// Function to update the leave balance in the UI
function updateLeaveBalance() {
    document.getElementById('casual-leave').textContent = casualLeaveBalance;
    document.getElementById('medical-leave').textContent = medicalLeaveBalance;
}
