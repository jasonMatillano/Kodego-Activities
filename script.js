function isJohnIncluded(students) {
  const targetName = "John";
  let isFound = false;
  
  students.forEach(student => {
    // Convert both names to lowercase and then compare
    if (student.name.toLowerCase() === targetName.toLowerCase()) {
      isFound = true; // John is found
    }
  });
  
  return isFound;
}

const students = [
  {
    name: "Alice",
    age: 20,
    grade: 85,
  },
  {
    name: "Bob",
    age: 21,
    grade: 92,
  },
  {
    name: "Carol",
    age: 19,
    grade: 78,
  },
  {
    name: "David",
    age: 22,
    grade: 95,
  },
  {
    
    name: "Eva",
    age: 20,
    grade: 88,
  },
];

if (isJohnIncluded(students)) {
  console.log("John is included in the list of students.");
} else {
  console.log("John is not included in the list of students.");
}
