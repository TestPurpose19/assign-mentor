import { Student, Mentor } from "./models.js";

const createStudent = async (studentData) => {
  const newStudent = new Student(studentData);
  await newStudent.validate();
  await newStudent.save();
  return newStudent;
};

const createMentor = async (mentorData) => {
  const newMentor = new Mentor(mentorData);
  await newMentor.validate();
  await newMentor.save();
  return newMentor;
};

const getAllStudents = async () => {
  const students = await Student.find();
  return students;
};

const getAssignedStudents = async () => {
  const assignedStudents = await Student.where("mentor")
    .ne(null)
    .populate("mentor");
  return assignedStudents;
};

const getUnassignedStudents = async () => {
  const unassignedStudents = await Student.where("mentor").equals(null);
  return unassignedStudents;
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (err) {
    throw new Error("wrong studentId format");
  }
};

const getMentorById = async (mentorId) => {
  try {
    const mentor = await Mentor.findById(mentorId);
    return mentor;
  } catch (err) {
    throw new Error("wrong mentorId format");
  }
};

const assignMentor = async (student, mentor) => {
  student.mentor = mentor._id;
  await student.save();
  return student.populate("mentor");
};

const getAssignedStudentsToMentor = async (mentorId) => {
  const assignedStudents = await Student.find(
    { mentor: mentorId },
    { _id: 1, name: 1, email: 1 }
  );
  return assignedStudents;
};

const getAllMentors = async () => {
  const mentors = await Mentor.find();
  return mentors;
};

export default {
  createStudent,
  createMentor,
  getAllStudents,
  getAssignedStudents,
  getUnassignedStudents,
  getStudentById,
  getMentorById,
  assignMentor,
  getAssignedStudentsToMentor,
	getAllMentors
};
