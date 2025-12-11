import { getProjects } from "@/lib/projects";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";

// Use 'generateStaticParams' to pre-build these pages
export async function generateStaticParams() {
    return [{ category: "turkiye" }, { category: "dunya" }];
}

export default function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    const category = params.category as "turkiye" | "dunya";
    const projects = getProjects(category);

    const title = category === "turkiye" ? "Türkiye Projeleri" : "Dünya Projeleri";
    const subtitle =
        category === "turkiye"
            ? "Milli Teknoloji Hamlesi ve Gurur Kaynaklarımız"
            : "Küresel Uzay Yarışı ve İnsanlığın Ortak Mirası";

    return (
        <main className="min-h-screen p-8 md:p-24 relative">
            <div className="max-w-7xl mx-auto z-10 relative">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Ana Sayfaya Dön
                </Link>

                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-300">{subtitle}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/${category}/${project.slug}`}
                                className="group relative block h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                                <div className="relative h-full bg-space-light/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:text-white transition-colors">
                                        <Rocket className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-orbitron mb-2 group-hover:text-blue-300 transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-400 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-2xl text-gray-400">
                                Bu kategoride henüz proje bulunmuyor.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
