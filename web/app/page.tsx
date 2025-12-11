"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center relative overflow-hidden">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          FEZA ARŞİVİ
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          İstikbal göklerdedir. Geçmişten geleceğe uzanan uzay ve havacılık
          yolculuğuna tanıklık edine.
        </p>

        <div className="mt-12 flex gap-6 justify-center flex-wrap">
          <MenuCard
            href="/turkiye"
            title="Türkiye"
            icon={<Rocket className="w-8 h-8 text-red-500" />}
            description="Milli Teknoloji Hamlesi ve yerli projeler."
            color="border-red-500/50 hover:bg-red-900/20"
          />
          <MenuCard
            href="/dunya"
            title="Dünya"
            icon={<Globe className="w-8 h-8 text-blue-500" />}
            description="Küresel uzay ajansları ve devasa görevler."
            color="border-blue-500/50 hover:bg-blue-900/20"
          />
        </div>
      </motion.div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
    </main>
  );
}

function MenuCard({
  href,
  title,
  icon,
  description,
  color,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-80 p-6 border rounded-2xl backdrop-blur-md bg-white/5 transition-all cursor-pointer group ${color}`}
      >
        <div className="mb-4 flex justify-center">{icon}</div>
        <h2 className="text-2xl font-bold font-orbitron mb-2 group-hover:text-white transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5 text-gray-300" />
        </div>
      </motion.div>
    </Link>
  );
}
