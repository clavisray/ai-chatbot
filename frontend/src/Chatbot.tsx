import { getAnswer } from "./api/geminiApi"
import { useState, type SubmitEvent } from 'react'




function Chatbot() {
    const [content, setContent] = useState("")
    const [answer, setAnswer] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await getAnswer(content);

        setAnswer(response);

    }

    console.log(content);

  return (
    <>
        <div className="">
            <main className="h-screen flex items-center justify-center">
                
                {/* Komunikacja z chatem*/}
                <section className="flex flex-col h-[80vh] w-[70%] gap-4">

                    {/* Response - 2/3 */}
                    <div className="flex-[2] min-h-0 bg-zinc-300 rounded-xl p-4 overflow-y-auto">
                        <p>
                            {answer}
                        </p>
                    </div>

                    {/* Request - 1/3 */}
                    <form 
                        className="flex-1 min-h-0 border border-sky-400 rounded-xl"
                        onSubmit={handleSubmit}>

                        <textarea 
                            className="w-full h-full bg-white rounded-xl p-4 resize-none" 
                            placeholder="Zadaj pytanie" 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <button 
                            className="cursor-pointer rounded-xl bg-gradient-to-r from-lime-200 via-sky-100 to-indigo-200 py-1 font-bold opacity-50 transition hover:text-sky-700 hover:opacity-100"
                            type="submit"
                            >
                                Zatwierdź
                        </button>

                    </form>
                    

                </section>
            
            </main>
        </div>
      
    </>
  )
}

export default Chatbot;
