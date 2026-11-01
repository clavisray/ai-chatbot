import { getAnswer } from "./api/geminiApi"
import { useState, type SubmitEvent } from 'react'
import { ArrowUp } from 'lucide-react';

type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
};



function Chatbot() {
    const [content, setContent] = useState("")
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setContent("");

        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role:"user",
                content: content
            }
        ]);
        
        setLoading(true);
        const response = await getAnswer(content);
        
        
        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "ai",
                content: response
            }
        ]);
        setLoading(false);

    }

    console.log(content);

  return (
    <>
        <div className="">
            <main className="h-screen flex items-center justify-center bg-linear-to-r from-lime-200 via-sky-100 to-indigo-200">
                
                {/* Komunikacja z chatem*/}
                <section className="flex flex-col h-[80vh] w-[70%] gap-4">
                    <h1 className="flex justify-center items-center text-xl font-bold">Gemini Chatbot</h1>

                    {/* Response - 2/3 */}
                    <div className="flex-[2] min-h-0 overflow-y-auto flex flex-col gap-3 p-4">

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`w-fit wrap-break-word whitespace-pre-wrap ${
                                        message.role === "user"
                                            ? "max-w-[75%] rounded-2xl bg-white px-4 py-3 shadow-sm"
                                            : "max-w-[85%] px-2 py-3"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="px-2 py-3 text-gray-500">
                                Thinking...
                            </div>
                        )}

                    </div>


                    {/* Request - 1/3 */}
                    <form 
                        className="flex-1 min-h-0"
                        onSubmit={handleSubmit}>
                        <div className="relative w-full rounded-3xl bg-white border-1 border-sky-100 shadow-md overflow-hidden focus-within:border-sky-300 focus-within:shadow-lg transition-colors">
                            <textarea 
                                className="block w-full bg-transparent rounded-3xl p-4 pr-14 pb-14 resize-none outline-none focus:outline-none" 
                                placeholder="Zapytaj Gemini" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <button 
                                className="absolute bottom-4 right-4 flex items-center justify-center cursor-pointer rounded-3xl bg-gradient-to-r from-lime-200 via-sky-100 to-indigo-200 px-2 py-2 font-bold opacity-50 transition hover:text-sky-700 hover:opacity-100"
                                type="submit"
                                >
                                    <ArrowUp  />
                            </button>
                        </div>
                        

                    </form>
                    

                </section>
            
            </main>
        </div>
      
    </>
  )
}

export default Chatbot;
