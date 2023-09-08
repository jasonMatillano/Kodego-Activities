function displayNamesAndCount(names) {
  // Create an empty array of students
  var students = []

  // Display each name using a for loop
  for (let i = 0; i < names.length; i++) {
    // console.log(names[i]);
    students.push(names[i])
  }

  // Display the total number of names in the array
  console.log('Students names are:', students);
  console.log('Total number of names:', names.length);  
}

// Example usage:
const namesArray = ['Alice', 'Bob', 'Charlie', 'David'];
displayNamesAndCount(namesArray);
