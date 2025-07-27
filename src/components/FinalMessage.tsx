import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FinalMessage: React.FC = () => {
  const [phase, setPhase] = useState<"postcards" | "game" | "final">("postcards");
  const [flipped, setFlipped] = useState<number[]>([]);

  // UNO-style postcards with different colors and fun messages
  const postcards = [
    {
      color: "red",
      message: "da",
      symbol: "🃏"
    },
    {
      color: "yellow",
      message: "i",
      symbol: "🔄"
    },
    {
      color: "green",
      message: "su",
      symbol: "+4"
    },
    {
      color: "blue",
      message: "ki",
      symbol: "⏭️"
    },
    {
      color: "purple",
      message: "😚",
      symbol: "🎯"
    }
  ];

  const flipCard = (index: number) => {
    if (!flipped.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: "linear-gradient(135deg, #FFEEAD, #FAD0C4, #FBC2EB)", fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
    >
      {phase === "postcards" && (
        <motion.div
          className="w-full max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8 drop-shadow-md">
           スペシャルポストカードをどうぞ📮🎴
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {postcards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`h-48 cursor-pointer perspective-1000 ${flipped.includes(idx) ? '' : 'hover:scale-105'}`}
                onClick={() => flipCard(idx)}
                whileHover={!flipped.includes(idx) ? { scale: 1.05 } : {}}
                whileTap={!flipped.includes(idx) ? { scale: 0.95 } : {}}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  flipped.includes(idx) ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card - UNO style */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center backface-hidden ${
                    card.color === "red" ? "bg-red-500" :
                    card.color === "yellow" ? "bg-yellow-400" :
                    card.color === "green" ? "bg-green-500" :
                    card.color === "blue" ? "bg-blue-500" : "bg-purple-500"
                  }`}>
                    <div className="text-white text-6xl font-bold">
                      {card.symbol}
                    </div>
                  </div>
                  
                  {/* Back of card - message */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center p-4 backface-hidden rotate-y-180 ${
                    card.color === "red" ? "bg-red-100" :
                    card.color === "yellow" ? "bg-yellow-100" :
                    card.color === "green" ? "bg-green-100" :
                    card.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                  }`}>
                    <p className="text-center text-gray-800 font-medium text-sm">
                      {card.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {(

            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full shadow-lg text-lg font-bold uppercase tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase("game")}
              >
                スペシャルメッセージへ進む 💖 →
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {phase === "game" && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center drop-shadow-sm">
            ハートをキャッチして、特別なメッセージを見つけてね！
          </h2>
          
          <div className="relative w-64 h-64 bg-white/80 rounded-xl shadow-lg flex items-center justify-center mb-8">
            <motion.div
              className="cursor-pointer absolute"
              drag
              dragConstraints={{
                top: -100,
                left: -100,
                right: 100,
                bottom: 100
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase("final")}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart size={90} className="text-red-500 drop-shadow-lg" fill="currentColor" />
            </motion.div>
          </div>
          
          <p className="text-gray-700 font-medium">
            ハートをキャッチしたら、ドラッグしてクリックしてね!
          </p>
        </motion.div>
      )}

      {phase === "final" && (
        <motion.div
          className="max-w-2xl bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <Heart className="text-red-500" size={48} fill="currentColor" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
            🎲 🎉🎂 ユリ、お誕生日おめでとう！！ 🎂🎉 🎲
          </h1>
          
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">
          ユリ、いつも楽しくて優しくて、本当に素敵な人だよ。出会えてよかった。
お誕生日おめでとう！これからの1年が笑顔でいっぱいの素敵な年になりますように。
いつも元気で、願いごとが全部叶いますように。
          </p>
          
          <div className="mt-8 flex justify-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ILYSM 💖
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};