import { useEffect, useState } from "react";
import "../progressbar/progressbar.css";    

interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
    const intervalid = setInterval(() => {
        setDisplayProgress(prev => {
            if (prev >= progress) return prev;
            return Math.min(prev + 1, progress);
        });
    }, 16);
    return () => clearInterval(intervalid);
    }, [progress]);

    return (
        <div className="progressbar">
            <div className="progress" style={{ width: ((displayProgress) + "%")}}>
            </div>
        </div>
    );
}