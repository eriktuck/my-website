import re
from pathlib import Path
from urllib.parse import quote
import frontmatter

from obsidiantools.api import Vault

def slugify_header(header: str) -> str:
    """Convert Markdown header to Hugo-compatible anchor slug."""
    # Remove leading '#'
    header = header.lstrip('#')

    # Lowercase
    header = header.lower()

    # Replace spaces with hyphens
    header = header.replace(' ', '-')

    # Remove characters Hugo strips
    header = re.sub(r'[^a-z0-9\-]', '', header)

    return header


def copy_and_convert_guides(
        vault_dir, 
        target_dir,
        base_url, 
        same_folder_base_url, 
        overwrite=False
    ):
    """
    Copies the contents of the 'guides' folder in the vault to the target directory,
    converting wiki-style links to URL links. Skips files that already exist in the target directory.

    Args:
        vault_dir (Path): Path to the root of the Obsidian vault.
        target_dir (Path): Path to the target directory where files will be copied.
        base_url (str): Base URL to use for converting wiki-style links to URL links.
        same_folder_base_url (str): Base URL to use for links pointing to files in the same folder.
        overwrite (bool): Whether to overwrite existing files
    """
    subdirs = ['base', 'guides', 'hubs', 'lit']
    vault = Vault(VAULT_DIR, include_subdirs=subdirs, include_root=True).connect()
    df = vault.get_note_metadata()
    filt = df['note_exists']
    path_dict = df.loc[filt, 'rel_filepath'].to_dict()

    guides_dir = vault_dir / 'guides'
    if not guides_dir.exists():
        print(f"Source folder '{guides_dir}' does not exist.")
        return

    target_dir = Path(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    # Process all markdown files in directory
    for file in guides_dir.glob('**/*.md'):  
        # Determine the target file path
        relative_path = file.relative_to(guides_dir)
        target_file = target_dir / relative_path

        # Skip if the file already exists (except if overwrite=True)
        if not overwrite and target_file.exists():
            print(f"Skipping existing file: {target_file}")
            continue

        post = frontmatter.load(file)
        draft = post.metadata.get('draft', None)

        if draft:
            print(f"Skipping draft file: {target_file}")
            continue

        # Remove markdown comments (%%...%%)
        post.content = re.sub(r'%%.*?%%', '', post.content, flags=re.DOTALL)

        # Convert wiki-style links [[Note Name]] to URL links
        def convert_wiki_links(match):
            raw = match.group(1)

            # Split alias: [[target|alias]]
            if "|" in raw:
                target, alias = raw.split("|", 1)
            else:
                target, alias = raw, raw

            # CASE A — Header in same note: [[#header]]
            if target.startswith("#"):
                header = target[1:]
                anchor = slugify_header(header)
                return f"[{alias}](#{anchor})"

            # Split target into note and optional header: note#header
            if "#" in target:
                note_name, header = target.split("#", 1)
            else:
                note_name, header = target, None

            # CASE B — Link to another note in same folder
            note_path = guides_dir / f"{note_name}.md"
            if note_path.exists():
                # Build base URL to note
                note_slug = quote(note_name.replace(" ", "-")).lower()
                url = f"{same_folder_base_url}{note_slug}"

                # If linking to a header inside that note
                if header:
                    anchor = slugify_header(header)
                    url += f"#{anchor}"

                return f"[{alias}]({url})"

            # CASE C — Link to a note in another folder (Obsidian Publish paths)
            node_path = path_dict.get(note_name)
            if node_path:
                encoded_path = quote(Path(node_path).with_suffix("").as_posix()).replace('%20', '+')
                url = base_url + encoded_path

                if header:
                    anchor = slugify_header(header)
                    url += f"#{anchor}"

                return f"[{alias}]({url})"

            # CASE D — Fallback
            return f"[{alias}]({base_url})"
                
        post.content = re.sub(r'\[\[([^\]]+)\]\]', convert_wiki_links, post.content)

        # Write the converted content to the target directory
        target_file.parent.mkdir(parents=True, exist_ok=True)
        text = frontmatter.dumps(post)
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(text)

        print(f"Copied and converted {target_file}' to '{target_dir}'.")

if __name__ == "__main__":
    VAULT_DIR = Path.home() / 'Obsidian' / 'dev_notes'
    TARGET_DIR = Path("content/blog")
    BASE_URL = "https://io.eriktuck.com/"
    SAME_FOLDER_BASE_URL = "https://eriktuck.com/blog/"

    copy_and_convert_guides(VAULT_DIR, TARGET_DIR, BASE_URL, SAME_FOLDER_BASE_URL, overwrite=False)