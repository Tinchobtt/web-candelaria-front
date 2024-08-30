export const isOpen = () =>{
    const schedules = {
        "Domingo": [{ start: "11:30", end: "15:00" }],
        "Lunes": [{ start: "19:00", end: "22:30" }],
        "Martes": [
            { start: "11:30", end: "15:00" },
            { start: "19:00", end: "22:30" }
        ],
        "Miércoles": [
            { start: "11:30", end: "15:00" },
            { start: "19:00", end: "22:30" }
        ],
        "Jueves": [
            { start: "11:30", end: "15:00" },
            { start: "19:00", end: "22:30" }
        ],
        "Viernes": [
            { start: "11:30", end: "15:00" },
            { start: "19:00", end: "22:30" }
        ],
        "Sábado": [
            { start: "11:30", end: "15:00" },
            { start: "19:00", end: "22:30" }
        ]
    };

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const daySchedules = schedules[currentDay];

    return daySchedules.some(schedule => {
        return currentTime >= schedule.start && currentTime <= schedule.end;
    });
}