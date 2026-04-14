# 🚀 QUICK START FOR MANAGER PRESENTATION

## Running the App in VS Code (3 Easy Ways)

### **Method 1: Press Ctrl+Shift+B (Fastest ⚡)**
1. Open the project in VS Code
2. Open any file in `/src` folder
3. Press **Ctrl+Shift+B**
4. Watch the terminal - you'll see the localhost link appear:
   ```
   ➜  Local:   http://localhost:5173/
   ```
5. Click on the link or copy it to your browser

---

### **Method 2: Use VS Code Task Menu**
1. Press **Ctrl+Shift+P** in VS Code
2. Type: `Tasks: Run Task`
3. Select: **🚀 npm run dev - START APP**
4. Terminal will show the localhost link

---

### **Method 3: Manual Terminal Command**
1. Open VS Code integrated terminal (Ctrl+`)
2. Make sure you see: `PS C:\Users\Madhuri\Desktop\mini_project_ToDoList_SPA\todo-app>`
3. Type: `npm run dev`
4. You'll see:
   ```
   VITE v5.4.21 ready in 1237 ms
   ➜  Local:   http://localhost:5173/
   ```

---

## ✅ If Localhost Link Appears
- App is working! ✓
- Click the link or paste `http://localhost:5173/` in browser
- You'll see the landing page

---

## ❌ If You See ERRORS

### Error: "Cannot find module"
→ Run: `npm install`

### Error: "Cannot find package.json"  
→ Make sure you're in the `todo-app` folder (check the path at bottom of VS Code terminal)

### Error: "Port 5173 already in use"
→ Close other VS Code windows or run: `npm run dev -- --port 3000`

---

## 💡 PRO TIPS FOR PRESENTATION

### Show App Building:
```
npm run build
```
This compiles the app for production (shows professionalism).

### Show Statistics Page:
- Click "Stats" in navigation (top right)
- Shows all the impressive features: habits, streaks, analytics

### Show Focus Mode (Pomodoro):
- Create a task
- Click the task
- Click "Start Focus Mode"
- Shows 25-min timer

### Command Palette Shortcut:
- Press **Ctrl+K** while app is open
- Shows power-user feature (navigation without mouse)

---

## 📋 FEATURES TO DEMO

1. **Landing Page** - First impression (attractive design)
2. **Create Task** - Add "Demo Task" with High priority
3. **Sub-tasks** - Add subtasks to show breakdown feature
4. **Focus Mode** - Show Pomodoro timer
5. **Stats Page** - Show analytics & habit tracking
6. **Settings** - Toggle dark/light theme
7. **Filter** - Show All/Active/Completed
8. **Command Palette** - Ctrl+K navigation

---

## ⏱️ TIMING FOR PRESENTATION

- **Landing Page:** 30 seconds (impress with design)
- **Dashboard:** 1 minute (create task, show filters)
- **Sub-tasks:** 1 minute (add subtasks)
- **Focus Mode:** 1 minute (show timer, pause it)
- **Stats:** 1 minute (show analytics)
- **Command Palette:** 30 seconds (press Ctrl+K)

**Total: 5-6 minutes** for a polished demo

---

## 🆘 EMERGENCY FIXES (If Something Breaks)

### Reset Everything:
```powershell
npm install
npm run dev
```

### Clear Cache:
```powershell
npm cache clean --force
npm install
```

### Alternative Port (if 5173 busy):
```powershell
npm run dev -- --port 3000
```

Then open: `http://localhost:3000`

---

**YOU'VE GOT THIS! 💪** Good luck with your presentation!
