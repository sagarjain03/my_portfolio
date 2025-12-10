import React, { useState, useEffect, useRef } from 'react';

export default function Terminal({ onCommand }: { onCommand?: (cmd: string) => void }) {
    // Initial welcome message with ASCII art
    const initialLines = [
        "   _____  __  __   _____  _____  ___  ___  ",
        "  / ___/  \\ \\/ /  / ___/ |_   _| |  \\/  | ",
        "  \\___ \\   \\  /   \\___ \\   | |   | |\\/| | ",
        " ____) |   |  |   ____) |  | |   | |  | | ",
        "|_____/    |_|   |_____/   |_|   |_|  |_| ",
        "                                           ",
        "System Initialized... [Version 1.0.4]",
        "Connected to: PORTFOLIO_OS",
        "Type 'help' to see available commands.",
        "----------------------------------------"
    ];

    const [history, setHistory] = useState<{ text: string; type: 'input' | 'output' | 'error' | 'system' }[]>(
        initialLines.map(line => ({ text: line, type: 'system' }))
    );
    const [input, setInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // Keep focus on input
    const handleClick = () => {
        inputRef.current?.focus();
    };

    const processCommand = (cmd: string) => {
        const lowerCmd = cmd.trim().toLowerCase();
        const response: string[] = [];
        let type: 'output' | 'error' | 'system' = 'output';

        switch (lowerCmd) {
            case 'help':
                response.push(
                    "Available Commands:",
                    "  whoami       - Display user profile info",
                    "  skills       - List technical skills",
                    "  projects     - View project directory",
                    "  contact      - Display contact channels",
                    "  clear        - Clear terminal screen",
                    "  arise        - [LOCKED] Shadow Extraction",
                    "  sudo         - Execute command as Super User"
                );
                break;
            case 'list-skills':
            case 'skills':
                response.push(
                    "--- TECHNICAL ARSENAL ---",
                    "[Languages]  : C++, Python, Java, TypeScript, JavaScript",
                    "[Frontend]   : Next.js, React, Tailwind CSS, GSAP",
                    "[Backend]    : Node.js, Express, MongoDB, Postgres",
                    "[Tools]      : Git, Docker, Linux, Figma"
                );
                break;
            case 'whoami':
                response.push(
                    "User: Sagar Jain",
                    "Class: Full Stack Developer (Level 22)",
                    "Guild: Maharaja Agrasen Institute of Technology",
                    "Status: Looking for Internship/Full-time roles"
                );
                break;
            case 'projects':
                response.push(
                    "--- PROJECT LOGS ---",
                    "1. Portfolio OS   - [Next.js, Tailwind] - You are here.",
                    "2. DevConnector   - [MERN Stack]        - Social network for devs.",
                    "3. Algo Visualizer- [JS, Canvas]        - Pathfinding visualizer."
                );
                break;
            case 'contact':
                response.push(
                    "--- TRANSMISSION CHANNELS ---",
                    "GitHub   : https://github.com/sagarjain03",
                    "LinkedIn : https://www.linkedin.com/in/sagar-jain-a68aa927b/",
                    "Email    : thesagarjain8@gmail.com"
                );
                break;
            case 'arise':
                type = 'system';
                response.push(
                    "ACCESS DENIED.",
                    "You do not possess the required mana level.",
                    "Try again later, Hunter."
                );
                break;
            case 'sudo':
                type = 'error';
                response.push("User is not in the sudoers file. This incident will be reported.");
                break;
            case '':
                break;
            default:
                type = 'error';
                response.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
        }

        return { response, type };
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            if (!cmd) return;

            // Add command to history logs
            const newEntry = { text: `hunter@sagar-pc:~$ ${cmd}`, type: 'input' as const };
            
            // Handle Clear special case
            if (cmd.toLowerCase() === 'clear') {
                setHistory([]);
                setInput("");
                return;
            }

            // Process command
            const { response, type } = processCommand(cmd);
            const outputEntries = response.map(line => ({ text: line, type }));

            setHistory(prev => [...prev, newEntry, ...outputEntries]);
            setCmdHistory(prev => [...prev, cmd]);
            setHistoryIndex(-1);
            setInput("");

            if (onCommand) onCommand(cmd);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= cmdHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(cmdHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div 
            className="h-full w-full bg-black/90 text-blue-400 p-4 font-mono text-sm overflow-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent" 
            onClick={handleClick}
        >
            {/* Output History */}
            {history.map((line, i) => (
                <div 
                    key={i} 
                    className={`mb-1 whitespace-pre-wrap ${
                        line.type === 'input' ? 'text-white font-semibold mt-2' : 
                        line.type === 'error' ? 'text-red-500' : 
                        line.type === 'system' ? 'text-blue-300 opacity-80' : 
                        'text-blue-400'
                    }`}
                >
                    {line.text}
                </div>
            ))}

            {/* Input Line */}
            <div className="flex gap-2 mt-2">
                <span className="text-green-500 font-bold">hunter@sagar-pc:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none flex-1 text-white caret-blue-500"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div ref={endRef} />
        </div>
    );
}