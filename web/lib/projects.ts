import fs from "fs";
import path from "path";
import matter from "gray-matter";

const REPO_ROOT = path.join(process.cwd(), "../"); // Root of the repo (one level up from 'web/')
const TR_DIR = path.join(REPO_ROOT, "Türkiye");
const WORLD_DIR = path.join(REPO_ROOT, "Dünya");

export interface Project {
    slug: string;
    title: string;
    category: "turkiye" | "dunya";
    description: string;
    content: string;
    image?: string;
}

function getDirectories(source: string) {
    if (!fs.existsSync(source)) return [];
    return fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
}

// Function to clean potential formatting issues in description
function cleanText(text: string) {
    return text.replace(/#+\s/g, "").trim();
}

export function getProjects(category: "turkiye" | "dunya"): Project[] {
    const dir = category === "turkiye" ? TR_DIR : WORLD_DIR;
    const folders = getDirectories(dir);

    const projects: Project[] = folders.map((folder) => {
        const readmePath = path.join(dir, folder, "README.md");
        let content = "";
        let title = folder.replace(/_/g, " "); // Default title from folder name
        let description = "Henüz açıklama eklenmemiş.";

        if (fs.existsSync(readmePath)) {
            try {
                // Read raw file
                const rawContent = fs.readFileSync(readmePath, "utf-8");
                // Use gray-matter to separate frontmatter if it exists (it probably doesn't in this repo, but good practice)
                const { content: mdContent } = matter(rawContent);

                content = mdContent;

                // Simple heuristic to extract title and description from Markdown if no frontmatter
                const lines = mdContent.split("\n").filter(l => l.trim() !== "");
                if (lines.length > 0 && lines[0].startsWith("#")) {
                    title = lines[0].replace(/^#+\s*/, "").trim();
                    // Look for first paragraph as description
                    for (let i = 1; i < lines.length; i++) {
                        if (!lines[i].startsWith("#") && !lines[i].startsWith("![")) {
                            description = lines[i].slice(0, 150) + (lines[i].length > 150 ? "..." : "");
                            break;
                        }
                    }
                }

            } catch (e) {
                console.error(`Error reading README for ${folder}`, e);
            }
        }

        return {
            slug: folder,
            title,
            category,
            description: cleanText(description),
            content,
            // For now, checking if there is an image in the folder could be added, 
            // but let's assume a placeholder or extract from markdown later.
            image: `/assets/placeholder-${category}.png`,
        };
    });

    return projects;
}

export function getProject(category: "turkiye" | "dunya", slug: string): Project | null {
    const projects = getProjects(category);
    return projects.find(p => p.slug === slug) || null;
}
