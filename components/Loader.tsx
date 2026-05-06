// components/Loader.tsx

"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-white
          "
        >
          <Image
            src="https://fd-dev.trendreversal.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FtrendreversalLoader.4cd3ec24.webp&w=640&q=75"
            alt="Loading"
            width={380}
            height={380}
            priority
            unoptimized
            className="
              object-contain animate-pulse
              w-[180px] h-[180px]
              sm:w-[220px] sm:h-[220px]
              md:w-[300px] md:h-[300px]
              lg:w-[380px] lg:h-[380px]
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
