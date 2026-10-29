export async function getAnswer(message: string): Promise<string>{

    const response = await fetch("http://localhost:8080/api/gemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: message,
        }),
    });

    if (!response.ok) {
        throw new Error("Gemini could not answer your question");
    }

    const data = await response.text();

    return data;

}

