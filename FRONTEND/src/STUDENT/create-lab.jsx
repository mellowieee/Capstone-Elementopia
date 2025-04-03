import { useState, useEffect } from "react";
import { X, Plus, User, Copy, Check } from "lucide-react";
import './create-Lab.css';  // Import the CSS file

export default function CreateLaboratory() {
  const [laboratoryName, setLaboratoryName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCode(result);
  };

  const addStudent = () => {
    if (studentEmail && !students.includes(studentEmail)) {
      setStudents([...students, studentEmail]);
      setStudentEmail("");
    }
  };

  const removeStudent = (email) => {
    setStudents(students.filter((student) => student !== email));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (laboratoryName) {
      console.log({
        name: laboratoryName,
        students,
        code,
      });
    }
  };

  return (
    <div className="laboratory-container">
        <div className="header">
      <h2>Create New Laboratory</h2>
      <p>Set up a new laboratory for your students to explore chemistry.</p>
      </div>

      <div className="input-group">
        <label htmlFor="name">Laboratory Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g., Chemistry 101 Lab"
          value={laboratoryName}
          onChange={(e) => setLaboratoryName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Laboratory Code</label>
        <div className="code-container">
          <div className="code">{code}</div>
          <button onClick={copyCode}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p>Share this code with your students to join the laboratory</p>
      </div>

      <div className="input-group">
        <label htmlFor="student">Add Students (Optional)</label>
        <div className="student-input">
          <input
            id="student"
            type="email"
            placeholder="student@example.com"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <button onClick={addStudent}>
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <div className="student-list">
          <div>
            {students.map((student) => (
              <div key={student} className="student-item">
                <User size={12} />
                {student}
                <button onClick={() => removeStudent(student)}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="button-group">
      <button className="cancel-button">
          Cancel
        </button>
        <button onClick={handleSubmit} className="submit-button">
          Create Laboratory
        </button>

      </div>
    </div>
  );
}
