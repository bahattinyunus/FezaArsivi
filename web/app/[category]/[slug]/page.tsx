import { getProject, getProjects } from "@/lib/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";

export async function generateStaticParams() {
    const trProjects = getProjects("turkiye");
    const worldProjects = getProjects("dunya");

    const paths = [
        ...trProjects.map((p) => ({ category: "turkiye", slug: p.slug })),
        ...worldProjects.map((p) => ({ category: "dunya", slug: p.slug })),
    ];

    return paths;
}

export default function ProjectPage({
    params,
}: {
    params: { category: string; slug: string };
}) {
    const category = params.category as "turkiye" | "dunya";
    const project = getProject(category, params.slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Proje bulunamadı.
            </div>
        );
    }

    return (
        <main className="min-h-screen p-8 md:p-24 relative">
            <div className="max-w-4xl mx-auto z-10 relative">
                <Link
                    href={`/${category}`}
                    className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kategoriye Dön
                </Link>

                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                        {project.title}
                    </h1>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-orbitron prose-headings:text-blue-300 prose-a:text-blue-400 prose-img:rounded-xl prose-img:border prose-img:border-white/10">
                    <Markdown>{project.content}</Markdown>
                </div>
            </div>
        </main>
    );
}
