import { Router } from "express";
import {
  addStudent,
  addMentor,
  getAllStudents,
  getAssignedStudents,
  getUnassignedStudents,
  assignMentor,
  reassignMentor,
  getStudent,
  getMentor,
  getMentorAssignments,
  getAllMentors,
} from "./controllers.js";

const router = Router();

// student routes
router
  .get("/student/all", getAllStudents)
  .post("/student/add", addStudent)
  .get("/student/assigned", getAssignedStudents)
  .get("/student/unassigned", getUnassignedStudents)
  .get("/student/:id", getStudent);

// mentor routes
router
  .post("/mentor/add", addMentor)
  .get("/mentor/assignments/:id", getMentorAssignments)
  .get("/mentor/all", getAllMentors)
  .get("/mentor/:id", getMentor);

// mentor assignment and reassignment
router
  .post("/assign-mentor", assignMentor)
  .patch("/reassign-mentor", reassignMentor);

export default router;
