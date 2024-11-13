export async function fetchBooksAPI() {
    const apiUrl =
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api/my-books"
            : `${import.meta.env.VITE_API_URL}/api/my-books`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to retrieve books.", data: null };
        }
        
        return { message: "Books retrieved successfully.", data };
    } catch (error) {
        return { message: `Failed to retrieve books: ${error}`, data: null };
    }
}
