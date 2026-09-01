import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Role = "faculty" | "student";
type Status = "Present" | "Absent";

type Student = {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  year: number;
};

type Subject = {
  id: string;
  name: string;
  code: string;
};

type Attendance = {
  studentId: string;
  subjectId: string;
  date: string;
  status: Status;
};

type Mark = {
  studentId: string;
  subjectId: string;
  exam: string;
  mark: number;
  maxMark: number;
};

/* ---------------- DEMO DATA ---------------- */

const students: Student[] = [
  {
    id: "1",
    name: "Ananya Kumar",
    rollNo: "IT001",
    department: "Information Technology",
    year: 3,
  },
  {
    id: "2",
    name: "Priya Sharma",
    rollNo: "IT002",
    department: "Information Technology",
    year: 3,
  },
  {
    id: "3",
    name: "Kavya Raj",
    rollNo: "IT003",
    department: "Information Technology",
    year: 3,
  },
  {
    id: "4",
    name: "Harini S",
    rollNo: "IT004",
    department: "Information Technology",
    year: 3,
  },
  {
    id: "5",
    name: "Divya M",
    rollNo: "IT005",
    department: "Information Technology",
    year: 3,
  },
];

const subjects: Subject[] = [
  {
    id: "1",
    name: "Web Technology",
    code: "IT3401",
  },
  {
    id: "2",
    name: "Operating Systems",
    code: "CS3451",
  },
  {
    id: "3",
    name: "Database Management",
    code: "CS3401",
  },
  {
    id: "4",
    name: "Computer Networks",
    code: "CS3591",
  },
];

const attendance: Attendance[] = [
  {
    studentId: "1",
    subjectId: "1",
    date: "2026-08-25",
    status: "Present",
  },
  {
    studentId: "1",
    subjectId: "1",
    date: "2026-08-26",
    status: "Present",
  },
  {
    studentId: "1",
    subjectId: "1",
    date: "2026-08-27",
    status: "Absent",
  },
  {
    studentId: "1",
    subjectId: "2",
    date: "2026-08-25",
    status: "Present",
  },
  {
    studentId: "1",
    subjectId: "2",
    date: "2026-08-26",
    status: "Present",
  },
  {
    studentId: "2",
    subjectId: "1",
    date: "2026-08-25",
    status: "Present",
  },
  {
    studentId: "2",
    subjectId: "1",
    date: "2026-08-26",
    status: "Absent",
  },
  {
    studentId: "2",
    subjectId: "1",
    date: "2026-08-27",
    status: "Present",
  },
  {
    studentId: "3",
    subjectId: "1",
    date: "2026-08-25",
    status: "Present",
  },
  {
    studentId: "3",
    subjectId: "1",
    date: "2026-08-26",
    status: "Present",
  },
  {
    studentId: "3",
    subjectId: "1",
    date: "2026-08-27",
    status: "Present",
  },
  {
    studentId: "4",
    subjectId: "1",
    date: "2026-08-25",
    status: "Absent",
  },
  {
    studentId: "4",
    subjectId: "1",
    date: "2026-08-26",
    status: "Present",
  },
  {
    studentId: "4",
    subjectId: "1",
    date: "2026-08-27",
    status: "Present",
  },
  {
    studentId: "5",
    subjectId: "1",
    date: "2026-08-25",
    status: "Present",
  },
  {
    studentId: "5",
    subjectId: "1",
    date: "2026-08-26",
    status: "Present",
  },
  {
    studentId: "5",
    subjectId: "1",
    date: "2026-08-27",
    status: "Present",
  },
];

const marks: Mark[] = [
  {
    studentId: "1",
    subjectId: "1",
    exam: "Internal 1",
    mark: 86,
    maxMark: 100,
  },
  {
    studentId: "1",
    subjectId: "2",
    exam: "Internal 1",
    mark: 78,
    maxMark: 100,
  },
  {
    studentId: "1",
    subjectId: "3",
    exam: "Internal 1",
    mark: 91,
    maxMark: 100,
  },
  {
    studentId: "2",
    subjectId: "1",
    exam: "Internal 1",
    mark: 72,
    maxMark: 100,
  },
  {
    studentId: "2",
    subjectId: "2",
    exam: "Internal 1",
    mark: 81,
    maxMark: 100,
  },
  {
    studentId: "3",
    subjectId: "1",
    exam: "Internal 1",
    mark: 94,
    maxMark: 100,
  },
  {
    studentId: "3",
    subjectId: "2",
    exam: "Internal 1",
    mark: 88,
    maxMark: 100,
  },
];

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const [role, setRole] = useState<Role>("faculty");
  const [page, setPage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const facultyMenu = [
    ["Dashboard", LayoutDashboard],
    ["Students", Users],
    ["Subjects", BookOpen],
    ["Attendance", CalendarCheck],
    ["Marks", Award],
    ["Analytics", TrendingUp],
  ] as const;

  const studentMenu = [
    ["Dashboard", LayoutDashboard],
    ["My Attendance", CalendarCheck],
    ["My Marks", Award],
    ["Performance", TrendingUp],
  ] as const;

  const menu = role === "faculty" ? facultyMenu : studentMenu;

  function navigate(name: string) {
    setPage(name);
    setMobileOpen(false);
  }

  function switchRole() {
    const newRole = role === "faculty" ? "student" : "faculty";

    setRole(newRole);
    setPage("Dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-950 p-5 text-white transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2">
              <GraduationCap size={24} />
            </div>

            <div>
              <h1 className="font-bold">EduTrack</h1>

              <p className="text-xs text-slate-400">
                Attendance & Marks
              </p>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>

        <div className="mb-5 rounded-xl bg-slate-900 p-3">
          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <p className="font-semibold">
            {role === "faculty"
              ? "Faculty / Admin"
              : "Student"}
          </p>
        </div>

        <nav className="space-y-2">
          {menu.map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => navigate(name)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                page === name
                  ? "bg-indigo-600"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              <Icon size={19} />

              {name}
            </button>
          ))}
        </nav>

        <button
          onClick={switchRole}
          className="absolute bottom-5 left-5 flex w-[calc(100%-40px)] items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-300"
        >
          Switch to{" "}
          {role === "faculty" ? "Student" : "Faculty"}
        </button>
      </aside>

      {/* MAIN AREA */}

      <div className="md:ml-64">
        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-8">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </button>

          <h2 className="text-xl font-bold">
            {page}
          </h2>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 sm:block">
              {role === "faculty"
                ? "Faculty"
                : "Student"}
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              {role === "faculty" ? "F" : "S"}
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <main className="p-4 md:p-8">
          {role === "faculty" && page === "Dashboard" && (
            <FacultyDashboard />
          )}

          {role === "faculty" && page === "Students" && (
            <StudentsPage />
          )}

          {role === "faculty" && page === "Subjects" && (
            <SubjectsPage />
          )}

          {role === "faculty" && page === "Attendance" && (
            <AttendancePage />
          )}

          {role === "faculty" && page === "Marks" && (
            <MarksPage />
          )}

          {role === "faculty" && page === "Analytics" && (
            <AnalyticsPage />
          )}

          {role === "student" && page === "Dashboard" && (
            <StudentDashboard />
          )}

          {role === "student" &&
            page === "My Attendance" && (
              <StudentAttendance />
            )}

          {role === "student" && page === "My Marks" && (
            <StudentMarks />
          )}

          {role === "student" &&
            page === "Performance" && (
              <Performance />
            )}
        </main>
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ---------------- FACULTY DASHBOARD ---------------- */

function FacultyDashboard() {
  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const percentage = Math.round(
    (present / attendance.length) * 100
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Good morning 👋
        </h1>

        <p className="mt-1 text-slate-500">
          Here's your academic management overview.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={students.length.toString()}
          description="Active students"
        />

        <StatCard
          title="Subjects"
          value={subjects.length.toString()}
          description="Current semester"
        />

        <StatCard
          title="Attendance"
          value={`${percentage}%`}
          description="Overall attendance"
        />

        <StatCard
          title="Average Marks"
          value="84%"
          description="Internal exams"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart />

        <RecentStudents />
      </div>
    </div>
  );
}

/* ---------------- ATTENDANCE CHART ---------------- */

function AttendanceChart() {
  const data = subjects.map((subject) => {
    const records = attendance.filter(
      (a) => a.subjectId === subject.id
    );

    const present = records.filter(
      (a) => a.status === "Present"
    ).length;

    return {
      subject: subject.code,
      attendance: records.length
        ? Math.round(
            (present / records.length) * 100
          )
        : 0,
    };
  });

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-bold">
        Attendance by Subject
      </h3>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="subject" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="attendance"
              fill="#4f46e5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- RECENT STUDENTS ---------------- */

function RecentStudents() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">
        Students
      </h3>

      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
          >
            <div>
              <p className="font-semibold">
                {student.name}
              </p>

              <p className="text-sm text-slate-500">
                {student.rollNo}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- STUDENTS PAGE ---------------- */

function StudentsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      students.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          student.rollNo
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-2xl font-bold">
            Student Management
          </h3>

          <p className="text-slate-500">
            Search and manage students.
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search student..."
            className="rounded-xl border bg-white py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Roll No
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Department
                </th>

                <th className="p-4 text-left">
                  Year
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {student.rollNo}
                  </td>

                  <td className="p-4">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.department}
                  </td>

                  <td className="p-4">
                    {student.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SUBJECTS ---------------- */

function SubjectsPage() {
  return (
    <div>
      <h3 className="mb-5 text-2xl font-bold">
        Subjects
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <BookOpen />
            </div>

            <h4 className="font-bold">
              {subject.name}
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              {subject.code}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ATTENDANCE ---------------- */

function AttendancePage() {
  const [selectedSubject, setSelectedSubject] =
    useState("1");

  const [date, setDate] =
    useState("2026-09-01");

  const [statuses, setStatuses] = useState<
    Record<string, Status>
  >({});

  function toggle(studentId: string) {
    setStatuses((current) => ({
      ...current,
      [studentId]:
        current[studentId] === "Present"
          ? "Absent"
          : "Present",
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold">
          Mark Attendance
        </h3>

        <p className="text-slate-500">
          Select subject and date, then mark students.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border bg-white p-5">
        <select
          value={selectedSubject}
          onChange={(e) =>
            setSelectedSubject(e.target.value)
          }
          className="rounded-xl border px-4 py-2"
        >
          {subjects.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="rounded-xl border px-4 py-2"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {students.map((student) => {
          const status =
            statuses[student.id] ?? "Absent";

          return (
            <div
              key={student.id}
              className="flex items-center justify-between border-b p-4 last:border-0"
            >
              <div>
                <p className="font-semibold">
                  {student.name}
                </p>

                <p className="text-sm text-slate-500">
                  {student.rollNo}
                </p>
              </div>

              <button
                onClick={() =>
                  toggle(student.id)
                }
                className={`rounded-xl px-5 py-2 font-semibold ${
                  status === "Present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() =>
          alert(
            `Attendance saved for ${date}`
          )
        }
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Save Attendance
      </button>
    </div>
  );
}

/* ---------------- MARKS ---------------- */

function MarksPage() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold">
          Examination Marks
        </h3>

        <p className="text-slate-500">
          Student-wise internal marks.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Subject
</
