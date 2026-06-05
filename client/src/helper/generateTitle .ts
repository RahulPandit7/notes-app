const generateTitle = (title?: string, content?: string) => {
    // If user entered title, use it
    if (title?.trim()) return title.trim();

    // Extract plain text from HTML content
    const plainText = content
        ?.replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // Take first 3 words from content
    if (plainText) {
        const words = plainText.split(" ").slice(0, 3);
        return words.join(" ");
    }

    // If both title and content are empty
    return "Untitled Note";
};

export default generateTitle;
