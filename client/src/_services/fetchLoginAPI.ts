export async function fetchLoginAPI(username: string, password:string) {
    const apiUrl =
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api/login"
            : `${import.meta.env.VITE_API_URL}/api/login`;

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to login."};
        }
        
        return { message: "Login successfully."};
    } catch (error) {
        return { message: `Failed to login: ${error}`};
    }
}
