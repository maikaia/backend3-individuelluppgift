import "../App.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Home() {
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()

    function handleClick(name:string) {
        localStorage.setItem("userName", name)
        navigate("/chat")
    }

    return (
        <div>
            <header className="App-header">
                My Chat App
            </header>
            <div>
                <p className="App-header">Choose your Username!</p>
                <div className='inputForm'>
                    <input
                        className='textInput'
                        placeholder="Your desired Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='sendButton' onClick={(e) => handleClick(name)}>
                        Choose
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;