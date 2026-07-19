import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Video, Tv, Sparkles, Play, Square } from "lucide-react";
import { type Portfolio } from "./types";

export function SharePanel({ portfolio }: { portfolio: Portfolio }) {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState("");
  const [aiVideo, setAiVideo] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  const handleStartRecording = () => {
    setRecordedVideo(null);
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setRecordedVideo("mock-user-recording");
  };

  const handleGenerateAIVideo = () => {
    setAiVideo(null);
    setAiGenerating(true);
    setAiProgress(0);
    
    const statuses = [
      { p: 15, m: "Initializing virtual page viewport..." },
      { p: 40, m: "Analyzing layouts, contrast, and projects content..." },
      { p: 70, m: "Synthesizing dynamic AI audio voiceover pitch..." },
      { p: 90, m: "Assembling final video frames & timeline transitions..." },
      { p: 100, m: "Video successfully rendered!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < statuses.length) {
        setAiProgress(statuses[currentStep].p);
        setAiStatus(statuses[currentStep].m);
        currentStep++;
      } else {
        clearInterval(interval);
        setAiGenerating(false);
        setAiVideo("mock-ai-video");
      }
    }, 900);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record Walkthrough */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Tv className="h-5 w-5" />
              <h3 className="text-base font-bold font-display">Record Screen Walkthrough</h3>
            </div>
            <p className="text-xs text-ink-soft mb-4">
              Pitch your skills! Record your screen and camera to explain your portfolio directly to recruiters.
            </p>

            {/* Video container screen */}
            <div className="aspect-video w-full bg-zinc-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-border shadow-inner">
              {recording ? (
                <div className="text-center space-y-3 z-10">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-white text-xs font-mono font-bold uppercase tracking-wider">
                      Recording ({formatTime(recordingTime)})
                    </span>
                  </div>
                  {/* Decorative soundwaves mock */}
                  <div className="flex items-center justify-center gap-0.5 h-6">
                    {[1, 2, 3, 4, 3, 2, 4, 5, 2, 3, 4, 2].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["4px", `${h * 4}px`, "4px"] }}
                        transition={{ repeat: Infinity, duration: 0.6 + i * 0.05 }}
                        className="w-0.5 bg-red-500 rounded"
                      />
                    ))}
                  </div>
                  <div className="text-zinc-500 text-[10px]">capturing tab: {portfolio.url}</div>
                </div>
              ) : recordedVideo ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-950/80 flex items-center justify-center">
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lift hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-5 w-5 fill-black ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur font-semibold">
                    Recording Ready · 0:42
                  </span>
                </div>
              ) : (
                <div className="text-center text-zinc-650 text-xs px-4">
                  <Video className="h-8 w-8 mx-auto mb-2 stroke-1 text-zinc-700" />
                  <span>No recording captured</span>
                </div>
              )}

              {/* simulated lens overlay */}
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-zinc-800 border border-zinc-700" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            {recording ? (
              <button
                onClick={handleStopRecording}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white py-2.5 text-xs font-semibold shadow-soft hover:bg-red-700 transition-colors cursor-pointer"
              >
                <Square className="h-3.5 w-3.5 fill-white" />
                Stop Recording
              </button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-2.5 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer"
              >
                <Video className="h-3.5 w-3.5" />
                {recordedVideo ? "Record New Walkthrough" : "Record Walkthrough"}
              </button>
            )}
          </div>
        </div>

        {/* Generate AI Pitch Video */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-base font-bold font-display">AI Automated Video Pitch</h3>
            </div>
            <p className="text-xs text-ink-soft mb-4">
              Let AI generate a simulated animated video walkthrough showing off your portfolio layout & details.
            </p>

            {/* Video container screen */}
            <div className="aspect-video w-full bg-zinc-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-border shadow-inner">
              {aiGenerating ? (
                <div className="w-full px-6 space-y-3 z-10">
                  <div className="flex items-center justify-between text-[11px] text-white font-semibold">
                    <span className="truncate pr-4">{aiStatus}</span>
                    <span className="font-mono">{aiProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${aiProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                </div>
              ) : aiVideo ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-amber-950/80 flex items-center justify-center">
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lift hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-5 w-5 fill-black ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur font-semibold">
                    AI Auto Preview · 0:30
                  </span>
                </div>
              ) : (
                <div className="text-center text-zinc-650 text-xs px-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 stroke-1 text-zinc-700" />
                  <span>AI Pitch Video is not generated</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGenerateAIVideo}
              disabled={aiGenerating}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:bg-secondary py-2.5 text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {aiVideo ? "Regenerate AI Video" : "Generate AI Video Pitch"}
            </button>
          </div>
        </div>
      </div>

      {/* Share / Copy section */}
      {(recordedVideo || aiVideo) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-surface-elevated p-5 shadow-soft space-y-4"
        >
          <h4 className="text-sm font-bold">Share Walkthrough Link</h4>
          <p className="text-xs text-ink-soft">
            Include this pitch video directly on your portfolio header or send it as a shareable link.
          </p>

          <div className="flex gap-2.5">
            <div className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-mono text-ink truncate flex items-center">
              https://video.portfoliohub.app/v/{portfolio.id}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://video.portfoliohub.app/v/${portfolio.id}`);
                alert("Walkthrough link copied!");
              }}
              className="rounded-xl bg-foreground text-background px-5 py-3 text-xs font-bold hover:shadow-soft cursor-pointer shrink-0"
            >
              Copy Link
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
