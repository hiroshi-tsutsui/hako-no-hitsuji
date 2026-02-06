'use client';
import React, { useState } from 'react';

const RESULTS = [
  {
    title: "The Golden Fleece",
    desc: "You crave success and wealth. Inside your box, the sheep is shining. You are ambitious but lonely.",
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    title: "The Sleeping Lamb",
    desc: "You are tired. So tired. You just want peace. Your sheep is unconscious. Go to sleep.",
    color: "bg-blue-100 text-blue-800"
  },
  {
    title: "The Wolf in Sheep's Clothing",
    desc: "You are dangerous. You hide your true self. The sheep in your box has sharp teeth.",
    color: "bg-red-100 text-red-800"
  },
  {
    title: "The Invisible Sheep",
    desc: "You feel ignored. The box is empty. Or is it? You are a philosopher at heart.",
    color: "bg-gray-100 text-gray-800"
  }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);

  const QUESTIONS = [
    {
      q: "There is a box in front of you. What is it made of?",
      options: ["Cardboard", "Gold", "Glass", "Iron"]
    },
    {
      q: "You hear a sound from inside. What does it sound like?",
      options: ["'Baaa'", "Silence", "Scratching", "Singing"]
    },
    {
      q: "You open the box. How big is the sheep?",
      options: ["Tiny", "Huge", "Normal", "It's not a sheep"]
    }
  ];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Fake calculation algorithm
      const sum = newAnswers.reduce((a, b) => a + b, 0);
      setResult(RESULTS[sum % RESULTS.length]);
    }
  };

  if (result) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-8 ${result.color}`}>
        <h1 className="text-4xl font-bold mb-8">Your Sheep Diagnosis</h1>
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
          <p className="text-xl mb-8 leading-relaxed">{result.desc}</p>
          <a 
            href={`https://twitter.com/intent/tweet?text=I%20am%20"${result.title}".%20What%20is%20in%20your%20box?%20Find%20out%20at%20HakoNoHitsuji%20%23箱の中の羊`}
            target="_blank"
            className="block w-full p-4 bg-black text-white rounded cursor-pointer hover:opacity-80 mt-4"
          >
            Share on X (Twitter) #箱の中の羊
          </a>
          <button onClick={() => window.location.reload()} className="mt-4 text-gray-500 underline">Try Again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-200 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-center font-serif text-2xl mb-8 font-bold text-stone-700">箱の中の羊 (Sheep in the Box)</h1>
        
        <div className="mb-8">
          <p className="text-lg font-medium mb-6">{QUESTIONS[step].q}</p>
          <div className="space-y-3">
            {QUESTIONS[step].options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full p-4 border rounded-xl hover:bg-stone-100 transition text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map(i => (
             <div key={i} className={`w-3 h-3 rounded-full ${i === step ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
          ))}
        </div>
      </div>
    </main>
  );
}
