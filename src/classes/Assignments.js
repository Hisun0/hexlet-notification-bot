// import Firebase from "./Firebase.js";
// import config from "../../config.js";

export class Assignments {
  constructor(coll) {
    this.coll = coll;
  }


  getAvailableAssignments() {
    return Object.values(this.coll).filter(obj => obj.accessibility === true);
  }
  
  getAssignmentsByCourseID(courseID) {
    return Object.values(this.coll).filter(obj => obj.courseID === courseID);
  }
      
//  createPromptsForObj(obj) {
//    return `Доступно задание: (${obj.title})[${obj.url}] до ${obj.due}`;
//  }
//
//  createPrompts() {
//    return Object.valiues(this.coll).map(obj => Object.values(this).createPromptsForObj(obj)).join('\n\n');
//  }
};

// const firebase = new Firebase(config);
// firebase.auth();
// console.log(config);
// const coll = await firebase.get('assignments');
// console.log(coll)
// const assignments = new Assignments(coll);
// console.log(assignments.getAvailableAssignments());