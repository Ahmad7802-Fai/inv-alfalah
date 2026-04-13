"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { invitationData } from "./data";

export default function Invitation() {
  const [open, setOpen] = useState(false);
  const [scene, setScene] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const params = useSearchParams();

  const nama =
    params.get("to") || invitationData.guest.defaultName;

  const maxScene = invitationData.scenes.length;

  /* ================= AUDIO ================= */
  const playMusic = async () => {
    try {
      if (!audioRef.current) return;

      audioRef.current.volume = 0;
      await audioRef.current.play();

      let vol = 0;
      const fade = setInterval(() => {
        if (!audioRef.current) return;

        if (vol < invitationData.audio.volume) {
          vol += 0.02;
          audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    } catch {}
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  /* ================= AUTO SCENE ================= */
  useEffect(() => {
    if (!open || !invitationData.settings.autoPlay) return;

    let current = 1;

    const interval = setInterval(() => {
      current++;
      if (current <= maxScene) setScene(current);
      else clearInterval(interval);
    }, invitationData.settings.autoSceneDuration);

    return () => clearInterval(interval);
  }, [open]);

  /* ================= SCROLL ================= */
  useEffect(() => {
    if (!invitationData.settings.enableScroll) return;

    const handleScroll = (e: WheelEvent) => {
      if (!open) return;

      setScene((prev) =>
        e.deltaY > 0
          ? Math.min(prev + 1, maxScene)
          : Math.max(prev - 1, 1)
      );
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [open]);

  return (
    <>
      {/* AUDIO */}
      {invitationData.settings.enableMusic && (
        <audio ref={audioRef} loop>
          <source src={invitationData.audio.src} />
        </audio>
      )}

      {/* ================= COVER ================= */}
      {!open ? (
        <div className="h-screen flex items-center justify-center bg-[#f5f2eb] relative px-4">

          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]" />
          <div className="absolute inset-3 border border-[#d4af37]/40 rounded-2xl" />

          <div className="relative w-full max-w-sm text-center space-y-4">

            <p className="tracking-[3px] text-xs text-gray-500">
              UNDANGAN
            </p>

            <p className="arabic text-[#b6892d] text-lg">
              {invitationData.arabic}
            </p>

            <h1 className="text-xl font-bold text-green-900 leading-snug">
              {invitationData.subtitle}
            </h1>

            <div className="bg-[#d4af37] text-white px-3 py-1 rounded-full text-xs inline-block">
              {invitationData.location}
            </div>

            <img
              src={invitationData.logo}
              className="w-20 mx-auto opacity-90"
            />

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">Kepada Yth:</p>
              <p className="font-semibold">{nama}</p>
            </div>

            <button
              onClick={() => {
                setOpen(true);
                playMusic();
              }}
              className="btn-primary w-full"
            >
              Buka Undangan
            </button>

          </div>
        </div>
      ) : (
        <main className="h-screen w-full overflow-hidden relative px-4">

          {invitationData.scenes.map((s) => {
            if (scene !== s.id) return null;

            switch (s.type) {
              /* ===== SCENE 1 ===== */
              case "bismillah":
                return (
                  <div key={s.id} className="h-screen flex items-center justify-center text-center">
                    <p className="arabic text-2xl text-green-800">
                      {invitationData.bismillah}
                    </p>
                  </div>
                );

              /* ===== SCENE 2 ===== */
              case "opening-premium":
                return (
                  <div key={s.id} className="h-screen overflow-y-auto flex items-center justify-center">

                    <div className="w-full max-w-sm text-center space-y-4">

                      <p className="arabic text-lg">
                        {s.data.salam}
                      </p>

                      <p className="text-sm leading-relaxed">
                        {s.data.text}
                      </p>

                      <p className="font-semibold text-green-800 text-sm">
                        {s.data.titleFull}
                      </p>

                      <div className="bg-[#c79a5c] text-white p-4 rounded-xl text-left text-xs space-y-1">

                        <p>📅 {s.data.detail.hari}</p>

                        {s.data.detail.tanggal.map((t, i) => (
                          <p key={i}>⏰ {t}</p>
                        ))}

                        <p>📍 {s.data.detail.tempat}</p>
                      </div>

                      <p className="text-sm">{s.data.closing}</p>

                      <p className="arabic text-sm">
                        {s.data.salamPenutup}
                      </p>

                      <div className="flex justify-between text-xs mt-4">
                        {s.data.signatures.map((sig, i) => (
                          <div key={i} className="text-center">
                            <p>{sig.role}</p>
                            <img src={sig.image} className="h-10 mx-auto my-1" />
                            <p className="font-semibold">{sig.name}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                );

              /* ===== SCENE 3 ===== */
              case "events":
                return (
                  <div key={s.id} className="h-screen overflow-y-auto py-6">

                    <div className="max-w-sm mx-auto space-y-5">

                      <h2 className="text-center text-base font-bold text-[#2c4a5a]">
                        RANGKAIAN ACARA
                      </h2>

                      {s.data.map((event, i) => (
                        <div
                          key={i}
                          className="border border-[#2c4a5a]/40 rounded-xl p-4 text-xs bg-white/70"
                        >

                          <p className="text-center font-semibold mb-3">
                            {event.date}
                          </p>

                          {event.items.map((item, idx) => (
                            <div key={idx} className="mb-2">

                              <p className="flex">
                                <span className="font-semibold w-24">
                                  {item.time}
                                </span>
                                <span>{item.title}</span>
                              </p>

                              {item.details && (
                                <ul className="ml-24 mt-1 list-disc space-y-0.5">
                                  {item.details.map((d, i2) => (
                                    <li key={i2}>{d}</li>
                                  ))}
                                </ul>
                              )}

                            </div>
                          ))}

                        </div>
                      ))}

                    </div>
                  </div>
                );

              /* ===== SCENE 4 ===== */
              case "location":
                return (
                  <div key={s.id} className="h-screen flex flex-col items-center justify-center space-y-4">

                    <QRCodeCanvas value={s.data.qr} size={110} />

                    <iframe
                      src={s.data.mapsEmbed}
                      className="w-full h-36 rounded-lg"
                    />

                    <p className="text-xs text-center px-4">
                      {s.data.address}
                    </p>

                  </div>
                );

              default:
                return null;
            }
          })}
        </main>
      )}

      {/* MUSIC BUTTON */}
      {open && invitationData.settings.enableMusic && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 bg-green-700 text-white px-3 py-2 rounded-full shadow"
        >
          🎵
        </button>
      )}
    </>
  );
}