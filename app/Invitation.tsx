"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const params = useSearchParams();

  const nama = params.get("to") || "Tamu Undangan";

  // 🎵 AUDIO FADE IN
  const playMusic = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        await audioRef.current.play();

        let vol = 0;
        const fade = setInterval(() => {
          if (!audioRef.current) return;
          if (vol < 0.4) {
            vol += 0.02;
            audioRef.current.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 200);
      }
    } catch {}
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  // 🎬 SCENE FLOW CINEMATIC
  useEffect(() => {
    if (open) {
      const timers = [
        setTimeout(() => setScene(1), 1000),
        setTimeout(() => setScene(2), 4000),
        setTimeout(() => setScene(3), 7000),
        setTimeout(() => setScene(4), 10000),
        setTimeout(() => setScene(5), 13000),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [open]);

  return (
    <>
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source
          src="/audio/nastelbom-islamic-islamic-music-489179.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* ================= COVER ================= */}
      {!open ? (
        <div className="h-screen flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-green-50 to-white">

          <div className="card animate-zoom">

            <p className="text-green-600 tracking-[4px] text-sm">
              UNDANGAN
            </p>

            <h1 className="text-4xl font-bold mt-4 text-green-900">
              Haflah Attasyakur
            </h1>

            <div className="divider" />

            <p className="text-sm text-gray-500 mt-4">
              Kepada Yth:
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-1">
              {nama}
            </h2>

            <button
              onClick={() => {
                setOpen(true);
                playMusic();
              }}
              className="btn-primary mt-6"
            >
              Buka Undangan
            </button>

          </div>
        </div>
      ) : (
        /* ================= SCENE SYSTEM ================= */
        <main className="h-screen w-full overflow-hidden relative">

          {/* 🎬 SCENE 1 - BISMILLAH */}
          {scene === 1 && (
            <div className="h-screen flex items-center justify-center text-center animate-open">
              <p className="arabic text-3xl text-green-800">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>
            </div>
          )}

          {/* 🎬 SCENE 2 - OPENING */}
          {scene === 2 && (
            <div className="h-screen flex items-center justify-center p-6">
              <div className="card animate-fade-up max-w-md text-center">

                <p className="italic text-lg text-green-800">
                  Assalamu’alaikum Warahmatullahi Wabarakatuh
                </p>

                <p className="mt-4 text-gray-700">
                  Dengan memohon rahmat dan ridho Allah SWT,
                  kami mengundang Bapak/Ibu/Saudara/i untuk hadir
                  dalam acara Haflah Attasyakur Likhotmil Qur’an Wal Kutub.
                </p>

                <p className="mt-4 text-sm italic text-gray-500">
                  "Dan Allah menjadikan bagi kamu pasangan hidup..."
                </p>

              </div>
            </div>
          )}

          {/* 🎬 SCENE 3 - DETAIL */}
          {scene === 3 && (
            <div className="h-screen flex items-center justify-center p-6">
              <div className="card animate-fade-up text-center">

                <p className="font-bold text-lg text-green-800">
                  Hari & Tanggal
                </p>

                <div className="divider" />

                <p className="mt-2">
                  Sabtu Pahing & Ahad Pon
                </p>

                <p className="mt-3 font-semibold text-green-700 text-lg">
                  25 April 2026 - 19:30 WIB
                </p>

                <p>
                  26 April 2026 - 07:30 WIB
                </p>

              </div>
            </div>
          )}

          {/* 🎬 SCENE 4 - RANGKAIAN */}
          {scene === 4 && (
            <div className="h-screen flex items-center justify-center p-6">
              <div className="space-y-4">

                <p className="font-bold text-green-800 text-lg text-center">
                  Rangkaian Acara
                </p>

                {[
                  ["Jumat, 24 April", "Ziarah"],
                  ["Sabtu, 25 April", "Khataman & Pengajian"],
                  ["Ahad, 26 April", "Sholawat"],
                ].map((item, i) => (
                  <div key={i} className="card text-center">
                    <p className="font-semibold text-green-800">
                      {item[0]}
                    </p>
                    <p className="text-gray-600">
                      {item[1]}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* 🎬 SCENE 5 - GALERI + MAP */}
          {scene === 5 && (
            <div className="h-screen flex flex-col items-center justify-center p-6 space-y-6">

              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/300/200?random=${i}`}
                    className="rounded-xl shadow"
                  />
                ))}
              </div>

              <QRCodeCanvas
                value="https://maps.google.com/?q=ponpes+alfalah"
                size={120}
              />

              <iframe
                src="https://www.google.com/maps?q=ponpes+alfalah&output=embed"
                className="w-full h-40 rounded-xl"
              />

            </div>
          )}

        </main>
      )}

      {/* 🎵 BUTTON MUSIC */}
      {open && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg"
        >
          🎵
        </button>
      )}
    </>
  );
}