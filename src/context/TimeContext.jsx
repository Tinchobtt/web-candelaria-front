import { createContext, useContext } from 'react';

const TimeContext = createContext();

export const TimeContextProvider = ({ children }) => {
    const schedules = {
        "Domingo": [{ start: "10:00", end: "23:00" }],
        "Lunes": [{ start: "10:00", end: "23:00" }],
        "Martes": [{ start: "10:00", end: "23:00" }],
        "Miércoles": [{ start: "10:00", end: "23:00" }],
        "Jueves": [{ start: "10:00", end: "23:00" }],
        "Viernes": [{ start: "10:00", end: "23:30" }],
        "Sábado": [{ start: "10:00", end: "23:30" }]
    };

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const daySchedules = schedules[currentDay] || [];
    const isOpen = daySchedules.some(schedule => {
        return currentTime >= schedule.start && currentTime <= schedule.end;
    });

    const checkIfOpen = (date, time) => {
        let selectedDate = new Date(date);
        selectedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
        const selectedDay = daysOfWeek[selectedDate.getDay()];
        const selectedSchedules = schedules[selectedDay] || [];

        return selectedSchedules.some(schedule => {
            return time >= schedule.start && time <= schedule.end;
        });
    };

    return (
        <TimeContext.Provider value={{ isOpen, checkIfOpen }}>
            {children}
        </TimeContext.Provider>
    );
};

export const useTime = () => useContext(TimeContext);