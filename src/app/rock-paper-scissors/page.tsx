"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

const choices: { value: Choice; emoji: string; label: string }[] = [
  { value: "rock", emoji: "🪨", label: "Rock" },
  { value: "paper", emoji: "📄", label: "Paper" },
  { value: "scissors", emoji: "✂️", label: "Scissors" },
];

function getResult(player: Choice, computer: Choice): Result {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) return "win";
  return "lose";
}

const resultMessages: Record<Result, { text: string; color: string }> = {
  win: { text: "You Win! 🎉", color: "text-green-400" },
  lose: { text: "You Lose! 😢", color: "text-red-400" },
  draw: { text: "It's a Draw! 🤝", color: "text-yellow-400" },
};

export default function RockPaperScissorsPage() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const play = useCallback((choice: Choice) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    setTimeout(() => {
      const compChoice = choices[Math.floor(Math.random() * 3)].value;
      setComputerChoice(compChoice);
      const res = getResult(choice, compChoice);
      setResult(res);
      setScore((prev) => ({
        wins: prev.wins + (res === "win" ? 1 : 0),
        losses: prev.losses + (res === "lose" ? 1 : 0),
        draws: prev.draws + (res === "draw" ? 1 : 0),
      }));
      setIsAnimating(false);
    }, 800);
  }, [isAnimating]);

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container max-w-2xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <Link
          href="/"
          aria-label="Back to Home"
          title="Back to Home"
          className="fixed bottom-6 right-6 md:bottom-7 md:right-7 lg:bottom-8 lg:right-8 z-50 w-14 h-14 md:w-[60px] md:h-[60px] lg:w-16 lg:h-16 rounded-full bg-primary-accent text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-primary-accent/40 active:scale-95 transition-all duration-300 group"
        >
          <Home size={24} className="group-hover:-rotate-12 transition-transform" />
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Rock Paper Scissors</h1>
        <p className="text-text-secondary mb-10">Choose your weapon and battle the computer!</p>

        {/* Score */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-2xl font-bold text-green-400">{score.wins}</p>
            <p className="text-xs text-text-secondary mt-1">Wins</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-2xl font-bold text-yellow-400">{score.draws}</p>
            <p className="text-xs text-text-secondary mt-1">Draws</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-2xl font-bold text-red-400">{score.losses}</p>
            <p className="text-xs text-text-secondary mt-1">Losses</p>
          </div>
        </div>

        {/* Battle area */}
        <div className="flex items-center justify-center gap-8 mb-10 min-h-[120px]">
          <div className="text-center">
            <AnimatePresence mode="wait">
              {playerChoice && (
                <motion.div
                  key={playerChoice}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className="text-6xl mb-2"
                >
                  {choices.find((c) => c.value === playerChoice)?.emoji}
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-xs text-text-secondary">You</p>
          </div>

          <div className="text-2xl font-bold text-border-subtle">VS</div>

          <div className="text-center">
            <AnimatePresence mode="wait">
              {computerChoice ? (
                <motion.div
                  key={computerChoice}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl mb-2"
                >
                  {choices.find((c) => c.value === computerChoice)?.emoji}
                </motion.div>
              ) : isAnimating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-6xl mb-2"
                >
                  ❓
                </motion.div>
              ) : null}
            </AnimatePresence>
            <p className="text-xs text-text-secondary">Computer</p>
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-center text-2xl font-bold mb-8 ${resultMessages[result].color}`}
            >
              {resultMessages[result].text}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Choice buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {choices.map((c) => (
            <motion.button
              key={c.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => play(c.value)}
              disabled={isAnimating}
              className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-primary-accent/50 hover:shadow-lg hover:shadow-primary-accent/10 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="text-4xl">{c.emoji}</span>
              <span className="text-xs text-text-secondary">{c.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Reset */}
        <div className="text-center">
          <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-primary-accent transition-colors">
            <RotateCcw size={14} /> Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}
