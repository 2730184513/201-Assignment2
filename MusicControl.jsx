import React, {useState, useEffect, useRef} from 'react';
import '../styles/MusicControl.css';
import backgroundMusic from '../music/background_music.mp3';

const MusicControl = () => {
    const [isMuted, setIsMuted] = useState(true); // 默认静音
    const [isInitialized, setIsInitialized] = useState(false); // 标志是否完成初始化
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(backgroundMusic);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;
            audioRef.current.muted = true; // 默认静音播放
        }

        const playAudio = () => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio playback blocked:", error);
                });
            }
        };

        // 用户首次交互触发播放
        const handleUserInteraction = () => {
            audioRef.current.muted = false; // 取消静音
            playAudio();
            setIsMuted(false); // 同步按钮状态
            setIsInitialized(true); // 标记初始化完成
            document.removeEventListener('click', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const toggleMute = () => {
        if (!isInitialized) return; // 防止未初始化时操作
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
    };

    return (
        <button
            className={`music-control ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            title={isMuted ? 'Click to play music' : 'Click to pause music'}
        >
            <i className={`fas fa-volume-${isMuted ? 'mute' : 'up'}`}></i>
        </button>
    );
};

export default MusicControl;
