import React from "react";

const Course = ({ course }) => {
    const rows = () => course.parts.map(part => <li key={part.id}>
        {part.name} {part.exercises}</li>)
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <div>
                <h2>{course.name}</h2>
            </div>
            <div>
                <ul>
                    {rows()}
                </ul>
                <b>total of {total} exercises</b>
            </div>
        </div>
    );
};

const Courses = ({ courses }) => {
    const courseList = () => courses.map(course =>
        <Course key={course.id} course={course} />)
    return (
        <div>
            {courseList()}
        </div>
    )
}

export default Courses