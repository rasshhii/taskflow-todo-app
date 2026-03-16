# TaskFlow — Modern Task Manager

A sleek, feature-rich todo application built with React and Vite. Manage your tasks efficiently with an intuitive interface, real-time updates, and persistent storage.

## Features

✨ **Task Management**
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Real-time task statistics

🎨 **Modern UI**
- Clean, minimalist design
- Responsive layout for all devices
- Smooth animations and transitions
- Professional typography with Google Fonts (Syne & DM Sans)

🔍 **Smart Filtering**
- Filter tasks by status (All, Active, Completed)
- Quick view of task statistics
- Empty state notifications

💾 **Data Persistence**
- Local storage integration
- Auto-save functionality
- Never lose your tasks

🌓 **Theme Support**
- Dark and light theme options
- Persistent theme preference

## Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **Storage**: Browser Local Storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── Header/              # App header
│   ├── AddTaskForm/         # New task input
│   ├── FilterBar/           # Task filtering
│   ├── TaskList/            # Task container
│   ├── TaskItem/            # Individual task
│   ├── StatsBar/            # Statistics display
│   ├── ConfirmDialog/       # Confirmation modal
│   └── EmptyState/          # Empty state UI
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## How to Use

1. **Add a Task**: Enter your task in the input field and press Enter or click Add
2. **Complete a Task**: Click the checkbox next to a task to mark it complete
3. **Delete a Task**: Click the delete icon and confirm the action
4. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
5. **Toggle Theme**: Click the theme button in the header to switch between dark/light modes

## Features Showcase

- **Confirmation Dialogs**: Get confirmation before deleting important tasks
- **Task Statistics**: See at a glance how many tasks are pending/completed
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **LocalStorage**: Your tasks are saved automatically and persist across sessions

## Browser Support

Works best on modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

Built with ❤️ using React and Vite
