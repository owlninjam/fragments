import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950 islamic-pattern"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5, opacity: 0 },
                enter: { scale: 1, opacity: 1 },
                exit: { scale: 0.5, opacity: 0 },
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="islamic-card p-8 text-center">
                <h2 className="text-2xl font-arabic mb-4 text-emerald-800 dark:text-emerald-200">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h2>
                <Button
                  className={"z-50 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"}
                  onClick={() => {
                    connect()
                      .then(() => {})
                      .catch(() => {})
                      .finally(() => {});
                  }}
                >
                  <span>
                    <Phone
                      className={"size-4 opacity-80"}
                      strokeWidth={2}
                      stroke={"currentColor"}
                    />
                  </span>
                  <span>Start Conversation</span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
