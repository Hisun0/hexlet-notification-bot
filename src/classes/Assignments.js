// import courses from "../../data/courses.js";

class Assignments {
  constructor(coll) {
    this.coll = Object.values(coll);
  }

  getAvailableAssignments() {
    this.coll = this.coll.filter(obj => obj.accessibility === true);
    return this;
  }

  getCourseAssignments(courseId) {
    this.coll = this.coll.filter(obj => obj.courseId === courseId);
    return this;
  }
      
  createPromptsForObj(obj) {
    return `Доступно задание: (${obj.title})[${obj.url}] до ${obj.due}`;
  }
  
  createPrompts() {
    const prompts = this.coll.map(obj => this.createPromptsForObj(obj));
    return prompts.join('\n');
  }
};

export default Assignments;
