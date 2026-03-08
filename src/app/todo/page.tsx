"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Download, ArrowLeft, ListChecks, X } from "lucide-react";
import Link from "next/link";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type Filter = "all" | "active" | "completed";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("richo-todos");
    if (stored) {
      try { setTodos(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (loaded) localStorage.setItem("richo-todos", JSON.stringify(todos));
  }, [todos, loaded]);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.completed));

  const exportCSV = () => {
    const headers = "ID,Task,Status,Created At\n";
    const rows = todos
      .map((t) => `"${t.id}","${t.text}",${t.completed ? "Done" : "Pending"},"${new Date(t.createdAt).toISOString()}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `todos_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container max-w-xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <ListChecks size={28} className="text-primary-accent" />
          <h1 className="text-3xl font-bold gradient-text">To-Do List</h1>
        </div>
        <p className="text-text-secondary mb-8 text-sm">Tasks are saved in your browser &mdash; no account needed.</p>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl bg-card-bg border border-border-subtle text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-accent/50 transition-colors text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-4 py-3 rounded-xl bg-primary-accent text-white hover:bg-primary-accent/90 transition-colors"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {(["all", "active", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f ? "bg-primary-accent/15 text-primary-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {completedCount > 0 && (
              <button onClick={clearCompleted} className="text-xs text-text-secondary hover:text-red-400 transition-colors">
                Clear done
              </button>
            )}
            {todos.length > 0 && (
              <button onClick={exportCSV} className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-primary-accent transition-colors">
                <Download size={12} /> CSV
              </button>
            )}
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card-bg border border-border-subtle group"
              >
                <button
                  onClick={() => toggleTodo(t.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    t.completed
                      ? "bg-primary-accent border-primary-accent"
                      : "border-border-subtle hover:border-primary-accent/50"
                  }`}
                >
                  {t.completed && <Check size={12} className="text-white" />}
                </button>
                <span className={`flex-1 text-sm ${t.completed ? "line-through text-text-secondary/50" : "text-text-primary"}`}>
                  {t.text}
                </span>
                <button
                  onClick={() => deleteTodo(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-red-400 transition-all"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTodos.length === 0 && loaded && (
            <p className="text-center py-12 text-text-secondary text-sm">
              {filter === "all" ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
            </p>
          )}
        </div>

        {/* Summary */}
        {todos.length > 0 && (
          <p className="text-center text-xs text-text-secondary mt-6">
            {completedCount}/{todos.length} completed
          </p>
        )}
      </div>
    </div>
  );
}
