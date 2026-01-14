import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [text, setText] = useState("");
  const today = new Date().toDateString();

  // Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calmloop"));
    if (saved?.date === today) setHabits(saved.habits);
    else if (saved) setHabits(saved.habits.map(h => ({ ...h, done: false })));
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("calmloop", JSON.stringify({ date: today, habits }));
  }, [habits]);

  const addHabit = () => {
    if (!text.trim()) return;
    setHabits([...habits, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(h =>
      h.id === id ? { ...h, done: !h.done } : h
    ));
  };

  const progress = habits.length
    ? Math.round((habits.filter(h => h.done).length / habits.length) * 100)
    : 0;

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
      <header className="header">
        <h1>CalmLoop</h1>
        <span>{today}</span>
      </header>

      {/* HERO */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Build calm habits. One day at a time.</h2>
        <p>
          Add your habits, stay consistent, and track your daily progress.
          Simple. Calm. Effective.
        </p>
      </motion.section>

      {/* MAIN APP */}
      <main className="app">
        <div className="input-row">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a habit..."
            onKeyDown={e => e.key === "Enter" && addHabit()}
          />
          <button onClick={addHabit}>+</button>
        </div>

        <div className="grid">
          <AnimatePresence>
            {habits.map(h => (
              <motion.div
                key={h.id}
                className={`card ${h.done ? "done" : ""}`}
                onClick={() => toggleHabit(h.id)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
              >
                {h.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="progress">
          <span>{progress}% completed</span>
          <div className="bar">
            <motion.div
              className="fill"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 CalmLoop — Take care of your mind.</p>
      </footer>
    </>
  );
}

/* ================= CSS ================= */

const css = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #020617;
  color: #e5e7eb;
  font-family: Inter, sans-serif;
}

/* HEADER */
.header {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #22d3ee;
}

/* HERO */
.hero {
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  padding: 0 20px;
}

.hero h2 {
  font-size: 32px;
}

.hero p {
  color: #94a3b8;
  margin-top: 10px;
}

/* APP */
.app {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

/* INPUT */
.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-row input {
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  background: #020617;
  color: white;
  border: 1px solid #22d3ee;
}

.input-row button {
  width: 56px;
  font-size: 24px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(90deg,#14b8a6,#22d3ee);
}

/* HABITS */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  padding: 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 14px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
}

.card.done {
  opacity: 0.6;
  text-decoration: line-through;
}

/* PROGRESS */
.progress {
  margin-top: 30px;
}

.bar {
  height: 8px;
  background: #020617;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 6px;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg,#14b8a6,#22d3ee);
}

/* FOOTER */
.footer {
  margin-top: 60px;
  padding: 20px;
  text-align: center;
  color: #94a3b8;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .input-row {
    flex-direction: column;
  }

  .input-row button {
    width: 100%;
  }
}
`;
