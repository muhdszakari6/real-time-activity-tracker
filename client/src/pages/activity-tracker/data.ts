export const mockActivities = [
    {
        id: 1,
        date: new Date().toDateString(),
        content: "📝 John updated the project documentation",
    },
    {
        id: 2,
        date: new Date(Date.now() - 1000 * 60 * 2).toDateString(),
        content: "✅ Maria marked task 'Refactor auth flow' as complete",
    },
    {
        id: 3,
        date: new Date(Date.now() - 1000 * 60 * 10).toDateString(),
        content: "🔄 David pushed new commits to `main` branch",
    },
    {
        id: 4,
        date: new Date(Date.now() - 1000 * 60 * 30).toDateString(), // 
        content: "🗂️ A new task was added to the sprint backlog",
    },
];

