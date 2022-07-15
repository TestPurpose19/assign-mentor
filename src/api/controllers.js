import dbService from "../db/dbService.js";

export const addStudent = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      // bad request
      res.status(400);
      throw new Error("student name and email required");
    }
    // create new student
    const newStudent = await dbService.createStudent({ name, email });
    res.json({ newStudent });
  } catch (err) {
    next(err);
  }
};

export const addMentor = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      // bad request
      res.status(400);
      throw new Error("mentor name and email required");
    }
    // create new mentor
    const newMentor = await dbService.createMentor({ name, email });
    res.json({ newMentor });
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    // get all students data
    const students = await dbService.getAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

export const getAssignedStudents = async (req, res, next) => {
  try {
    // get data of students with mentors assigned
    const assignedStudents = await dbService.getAssignedStudents();
    res.json(assignedStudents);
  } catch (err) {
    next(err);
  }
};

export const getUnassignedStudents = async (req, res, next) => {
  try {
    // get data of students with mentors unassigned
    const unassignedStudents = await dbService.getUnassignedStudents();
    res.json(unassignedStudents);
  } catch (err) {
    next(err);
  }
};

export const assignMentor = async (req, res, next) => {
  try {
    const { studentId, mentorId } = req.body;
    if (!studentId || !mentorId) {
      // bad request
      res.status(400);
      throw new Error("studentId and mentorId required");
    }
    const student = await dbService.getStudentById(studentId);
    if (!student) throw new Error("student does not exist");
    if (student.mentor)
      throw new Error(
        "Mentor already assigned. Use the /reassign-mentor route to reassign a mentor."
      );
    const mentor = await dbService.getMentorById(mentorId);
    if (!mentor) throw new Error("mentor does not exist");
    // assign mentor to student
    const assignedStudent = await dbService.assignMentor(student, mentor);
    res.json(assignedStudent);
  } catch (err) {
    next(err);
  }
};

export const reassignMentor = async (req, res, next) => {
  try {
    const { studentId, mentorId } = req.body;
    if (!studentId || !mentorId) {
      // bad request
      res.status(400);
      throw new Error("studentId and mentorId required");
    }
    const student = await dbService.getStudentById(studentId);
    if (!student) throw new Error("student does not exist");
    const mentor = await dbService.getMentorById(mentorId);
    if (!mentor) throw new Error("mentor does not exist");
    const assignedStudent = await dbService.assignMentor(student, mentor);
    res.json(assignedStudent);
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    // get student data
    let student = await dbService.getStudentById(studentId);
    if (!student) throw new Error("student does not exist");
    if (student.mentor) await student.populate("mentor");
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const getMentor = async (req, res, next) => {
  try {
    const mentorId = req.params.id;
    // get mentor data
    let mentor = await dbService.getMentorById(mentorId);
    if (!mentor) throw new Error("mentor does not exist");
    // get assigned students to mentor
    const assignedStudents = await dbService.getAssignedStudentsToMentor(
      mentorId
    );
    res.json({ ...mentor._doc, assignedStudents });
  } catch (err) {
    next(err);
  }
};

export const getMentorAssignments = async (req, res, next) => {
  try {
    const mentorId = req.params.id;
    let mentor = await dbService.getMentorById(mentorId);
    if (!mentor) throw new Error("mentor does not exist");
    // get assigned students to mentor
    const assignedStudents = await dbService.getAssignedStudentsToMentor(
      mentorId
    );
    res.json(assignedStudents);
  } catch (err) {
    next(err);
  }
};

export const getAllMentors = async (req, res, next) => {
  try {
    const mentors = await dbService.getAllMentors();
    res.json(mentors);
  } catch (err) {
    next(err);
  }
};
