// src/Calendar.js
import React, { useState } from 'react';

const Calendar = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(selectedYear);

  // Generate days in the selected month and year
  const generateDays = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  // Handle year change
  const handleYearChange = (event) => {
    setYearInput(event.target.value);
  };

  // Handle year submit (when editing is done)
  const handleYearSubmit = () => {
    setSelectedYear(Number(yearInput));
    setEditingYear(false);
  };

  // Navigation Functions
  const navigateMonth = (direction) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const navigateYear = (direction) => {
    setSelectedYear((prevYear) => prevYear + direction);
  };

  return (
    <div>
      <h1 id="calendar-heading">Calendar</h1>
      
      {/* Dropdown for selecting the month */}
      <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>{month}</option>
        ))}
      </select>

      {/* Year display and editing */}
      {editingYear ? (
        <input
          type="number"
          id="year-input"
          value={yearInput}
          onChange={handleYearChange}
          onBlur={handleYearSubmit}
          autoFocus
        />
      ) : (
        <span
          id="year-display"
          onDoubleClick={() => setEditingYear(true)}
        >
          {selectedYear}
        </span>
      )}

      {/* Navigation buttons for months and years */}
      <div>
        <button id="prev-month" onClick={() => navigateMonth(-1)}>Previous Month</button>
        <button id="next-month" onClick={() => navigateMonth(1)}>Next Month</button>
        <button id="prev-year" onClick={() => navigateYear(-1)}>Previous Year</button>
        <button id="next-year" onClick={() => navigateYear(1)}>Next Year</button>
      </div>

      {/* Table of days */}
      <table id="days-table">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateDays(selectedMonth, selectedYear).map((day, index) => (
            <td key={index}>{day}</td>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
