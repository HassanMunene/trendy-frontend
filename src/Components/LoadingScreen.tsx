import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-rose-100 to-white z-50">
      <motion.div
        className="bg-pink-600 size-16 rounded-lg flex items-center justify-center"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{
          rotate: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div 
          className="size-8 rounded-full bg-white"
          animate={{
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </motion.div>
    </div>
  );
}

export default LoadingScreen;