'use client';

import { useState, useEffect } from 'react';

type Kanji = {
  char: string;
  reading: string[]; // Support multiple correct answers
  meaning: string;
};

const KANJI_DATA: Kanji[] = [
  { char: '犬', reading: ['inu'], meaning: 'dog' },
  { char: '猫', reading: ['neko'], meaning: 'cat' },
  { char: '先生', reading: ['sensei'], meaning: 'teacher' },
  { char: '学校', reading: ['gakkou', 'gakkō'], meaning: 'school' },
  { char: '学生', reading: ['gakusei'], meaning: 'student' },
  { char: '日本', reading: ['nihon', 'nippon'], meaning: 'Japan' },
  { char: '水', reading: ['mizu'], meaning: 'water' },
  { char: '火', reading: ['hi', 'ka'], meaning: 'fire' },
  { char: '食べる', reading: ['taberu'], meaning: 'to eat' },
  { char: '行く', reading: ['iku'], meaning: 'to go' },
];

export default function BattleArena() {
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [currentKanji, setCurrentKanji] = useState<Kanji | null>(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('Encountered a Wild Kanji!');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shake, setShake] = useState(false); // Visual effect for damage
  const [flash, setFlash] = useState(false); // Visual effect for attack

  useEffect(() => {
    pickRandomKanji();
  }, []);

  const pickRandomKanji = () => {
    const random = KANJI_DATA[Math.floor(Math.random() * KANJI_DATA.length)];
    setCurrentKanji(random);
    setInput('');
  };

  const handleAttack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentKanji || gameState !== 'playing') return;

    const answer = input.toLowerCase().trim();
    if (currentKanji.reading.includes(answer)) {
      // Hit!
      const damage = 20;
      setEnemyHp(prev => Math.max(0, prev - damage));
      setMessage(`Hit! You dealt ${damage} damage.`);
      setFlash(true);
      setTimeout(() => setFlash(false), 300);

      if (enemyHp - damage <= 0) {
        setGameState('won');
        setMessage('Victory! The Kanji was defeated.');
      } else {
        pickRandomKanji();
      }
    } else {
      // Miss/Take Damage
      const damage = 15;
      setPlayerHp(prev => Math.max(0, prev - damage));
      setMessage(`Miss! It was "${currentKanji.reading[0]}". You took ${damage} damage.`);
      setShake(true);
      setTimeout(() => setShake(false), 300);

      if (playerHp - damage <= 0) {
        setGameState('lost');
        setMessage('Defeat... Study more!');
      } else {
         pickRandomKanji();
      }
    }
  };

  const restart = () => {
    setPlayerHp(100);
    setEnemyHp(100);
    setGameState('playing');
    setMessage('Encountered a Wild Kanji!');
    pickRandomKanji();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-6">
      
      {/* Enemy Area */}
      <div className={`relative bg-slate-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px] border-4 border-slate-700 shadow-xl transition-transform ${shake ? 'translate-x-2' : ''}`}>
        <div className="absolute top-4 right-4 w-32 h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-600">
           <div 
             className="h-full bg-red-500 transition-all duration-500"
             style={{ width: `${enemyHp}%` }}
           ></div>
        </div>
        <p className="text-slate-400 absolute top-4 left-4 font-mono text-xs">ENEMY LV.1</p>
        
        {gameState === 'playing' ? (
             <div className={`text-8xl font-black text-white ${flash ? 'opacity-0 scale-150' : 'opacity-100 scale-100'} transition-all duration-100`}>
                {currentKanji?.char}
             </div>
        ) : (
            <div className="text-6xl">
                {gameState === 'won' ? '🏆' : '💀'}
            </div>
        )}
      </div>

      {/* Message Log */}
      <div className="bg-slate-900 text-green-400 font-mono p-3 rounded border border-green-900 text-sm min-h-[3em] flex items-center">
        &gt; {message}
      </div>

      {/* Player Area */}
      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-lg">
         <div className="mb-4 flex justify-between items-center">
             <span className="font-bold text-slate-700 dark:text-slate-300">PLAYER</span>
             <div className="w-32 h-4 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-400">
                <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${playerHp}%` }}
                ></div>
             </div>
         </div>

         {gameState === 'playing' ? (
             <form onSubmit={handleAttack} className="flex gap-2">
                <input 
                    autoFocus
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type reading (romaji)..."
                    className="flex-1 px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                />
                <button 
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded font-bold hover:bg-indigo-700 transition-colors"
                >
                    ATTACK
                </button>
             </form>
         ) : (
             <button 
                onClick={restart}
                className="w-full bg-emerald-600 text-white py-3 rounded font-bold hover:bg-emerald-700 transition-colors"
             >
                PLAY AGAIN
             </button>
         )}
      </div>
    </div>
  );
}
