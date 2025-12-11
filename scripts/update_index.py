import os
import re

# Paths
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
README_PATH = os.path.join(REPO_ROOT, "README.md")
TR_DIR = os.path.join(REPO_ROOT, "Türkiye")
WORLD_DIR = os.path.join(REPO_ROOT, "Dünya")

def get_projects(directory):
    """Scans a directory for subdirectories and returns a formatted markdown list."""
    if not os.path.exists(directory):
        return []
    
    projects = []
    for item in sorted(os.listdir(directory)):
        path = os.path.join(directory, item)
        if os.path.isdir(path):
            # Try to read README for description
            description = ""
            readme_file = os.path.join(path, "README.md")
            if os.path.exists(readme_file):
                content = None
                for encoding in ['utf-8', 'utf-16', 'cp1254', 'latin-1']:
                    try:
                        with open(readme_file, 'r', encoding=encoding) as f:
                            content = f.read()
                        break
                    except UnicodeDecodeError:
                        continue
                
                if content:
                    lines = content.splitlines()
                    for line in lines:
                        clean_line = line.strip()
                        if clean_line and not clean_line.startswith('#'):
                            description = f" - {clean_line[:100]}..." if len(clean_line) > 100 else f" - {clean_line}"
                            break
            
            # Format: - [Folder Name](path/to/folder) - Description
            rel_path = os.path.relpath(path, REPO_ROOT).replace("\\", "/")
            projects.append(f"- **[{item}]({rel_path})**{description}")
    return projects

def update_readme():
    """Updates the README.md file with the dynamic project lists."""
    tr_projects = get_projects(TR_DIR)
    world_projects = get_projects(WORLD_DIR)

    print("Reading main README...")
    try:
        with open(README_PATH, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading README: {e}")
        return

    # Regex to find the sections and replace them
    # We look for the header and then everything until the next header or end of section
    
    print("Updating Türkiye Section...")
    # Update Türkiye Section
    tr_header = "### 🇹🇷 Türkiye"
    tr_replacement = f"{tr_header}\nTürkiye'nin milli uzay ve havacılık hamlesi kapsamında geliştirilen projeler:\n" + "\n".join(tr_projects) + "\n"
    
    # Uses regex to replace from ### 🇹🇷 Türkiye until the next ### header
    content = re.sub(r'### 🇹🇷 Türkiye.*?(?=### 🌍)', tr_replacement, content, flags=re.DOTALL)

    print("Updating World Section...")
    # Update Dünya Section
    world_header = "### 🌍 Dünya"
    world_replacement = f"{world_header}\nKüresel ölçekte uzay çalışmaları yürüten ajanslar ve projeler:\n" + "\n".join(world_projects) + "\n"
    
    # Uses regex to replace from ### 🌍 Dünya until the next ## header
    content = re.sub(r'### 🌍 Dünya.*?(?=## 🔗)', world_replacement, content, flags=re.DOTALL)

    print("Writing README...")
    with open(README_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"README.md updated with {len(tr_projects)} TR projects and {len(world_projects)} World projects.")

if __name__ == "__main__":
    update_readme()
