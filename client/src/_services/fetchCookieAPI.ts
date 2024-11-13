export const fetchCookieAPI = async () => {
    const apiUrl =
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api/get-cookie"
            : `${import.meta.env.VITE_API_URL}/api/get-cookie`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to retrieve cookie." };
        }

        return { message: data.message, user: data.user };
    } catch (error) {
        return { message: `Failed to retrieve cookies: ${error}`, user: null };
    }
};