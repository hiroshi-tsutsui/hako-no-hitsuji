import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-red-500">Kanji Combat 漢字バトル</h1>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <p className="mb-4 text-xl">Defeat monsters by writing the correct Kanji!</p>
          <div className="p-8 border-4 border-red-600 rounded-lg bg-slate-800">
            <p className="text-6xl mb-4">火</p>
            <input type="text" placeholder="Reading?" className="text-black p-2 rounded" />
            <button className="ml-2 bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700">ATTACK</button>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Level 1{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Start your journey. Basic N5 Kanji.
          </p>
        </div>
      </div>
    </main>
  );
}
