# assign mentor backend

# routes

- /student
  - /all - get all students
  - /add - add new student
  - /assigned - get assigned students
  - /unassigned - get unassigned students
  - /:id - get student details
- /mentor
  - /all - get all mentors
  - /add - add mentor
  - /assignments/:id - get mentor assignments
  - /:id - get mentor details
- /assign-mentor - assign mentor
- /reassign-mentor - reassign mentor

# db schema

- student
  - name
  - email
  - mentor(stores mentorId)
- mentor
  - name
  - email
