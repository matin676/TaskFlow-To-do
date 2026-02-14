import { motion } from "framer-motion";

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-400/20 rounded-full blur-[100px] opacity-30" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto pt-20 pb-10 px-6"
      >
        {children}
      </motion.div>
    </div>
  );
}
