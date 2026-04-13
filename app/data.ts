/* ================= TYPES ================= */

type OpeningData = {
  salam: string;
  text: string;
  titleFull: string;
  detail: {
    hari: string;
    tanggal: string[];
    tempat: string;
  };
  closing: string;
  salamPenutup: string;
  signatures: {
    role: string;
    name: string;
    image: string;
  }[];
};

type EventItem = {
  time: string;
  title: string;
  details?: string[];
};

type EventData = {
  date: string;
  items: EventItem[];
};

type LocationData = {
  mapsEmbed: string;
  qr: string;
  address: string;
};

type Scene =
  | { id: number; type: "bismillah" }
  | { id: number; type: "opening-premium"; data: OpeningData }
  | { id: number; type: "events"; data: EventData[] }
  | { id: number; type: "location"; data: LocationData };

/* ================= MAIN DATA ================= */

export const invitationData: {
  title: string;
  subtitle: string;
  location: string;
  arabic: string;
  bismillah: string;
  logo: string;

  audio: {
    src: string;
    volume: number;
  };

  guest: {
    defaultName: string;
  };

  scenes: Scene[];

  settings: {
    autoPlay: boolean;
    autoSceneDuration: number;
    enableScroll: boolean;
    enableMusic: boolean;
  };
} = {
  /* ================= BASIC ================= */
  title: "Haflah Attasyakur",
  subtitle: "Pondok Pesantren Al-Falah Assholihaat",
  location: "Sampangan, Bumirejo, Kaliangkrik",

  arabic: "حفلة التشكر لختم القرآن والكتب",
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",

  logo: "/logo.png",

  /* ================= AUDIO ================= */
  audio: {
    src: "/audio/nashed.mp3",
    volume: 0.4,
  },

  /* ================= TAMU ================= */
  guest: {
    defaultName: "Tamu Undangan",
  },

  /* ================= SCENES ================= */
  scenes: [
    /* ===== SCENE 1 ===== */
    {
      id: 1,
      type: "bismillah",
    },

    /* ===== SCENE 2 ===== */
    {
      id: 2,
      type: "opening-premium",
      data: {
        salam: "السلام عليكم ورحمة الله وبركاته",

        text: `Dengan mengharap limpahan rahmat dan ridho Allah SWT serta syafaat Nabi Muhammad SAW,
kami mengharap kehadiran Bapak/Ibu/Saudara/i untuk memberikan doa restu kepada para santri dalam acara`,

        titleFull:
          "Haflah Attasyakur Liikhotmil Qur’an Wal Kutub Pondok Pesantren Al-Falah Assholihaat",

        detail: {
          hari: "Sabtu Pahing & Ahad Pon",
          tanggal: [
            "25 April 2026 - 19.30 WIB",
            "26 April 2026 - 07.30 WIB",
          ],
          tempat:
            "Ponpes Al-Falah Assholihaat, Sampangan, Bumirejo, Kaliangkrik",
        },

        closing:
          "Atas kehadiran Bapak/Ibu/Saudara/i kami ucapkan terimakasih",

        salamPenutup: "والسلام عليكم ورحمة الله وبركاته",

        signatures: [
          {
            role: "Ketua Panitia",
            name: "AYAT ULINNUHA",
            image: "/ttd1.png",
          },
          {
            role: "Sekretaris",
            name: "M. ZAENUN NASIR",
            image: "/ttd2.png",
          },
        ],
      },
    },

    /* ===== SCENE 3 ===== */
    {
      id: 3,
      type: "events",
      data: [
        {
          date: "Jum’at, 24 April 2026",
          items: [
            {
              time: "14.00",
              title: "Ziarah Masyayikh Santri Putra",
            },
            {
              time: "16.00",
              title: "Ziarah Masyayikh Santri Putri",
            },
          ],
        },

        {
          date: "Sabtu, 25 April 2026",
          items: [
            {
              time: "19.30",
              title: "Khataman Ponpes Al-Falah",
            },
            {
              time: "21.30",
              title: "Pengajian Umum",
              details: [
                "Pembukaan",
                "Lantunan ayat suci Al-Qur’an",
                "Sambutan-sambutan",
                "Mauidhoh Hasanah oleh",
                "Dr. KH. Marzuqi Mustamar, M.Ag.",
                "(Pengasuh Ponpes Sabilurrosyad Malang)",
              ],
            },
          ],
        },

        {
          date: "Ahad, 26 April 2026",
          items: [
            {
              time: "07.30",
              title: "Khataman Ponpes Assholihaat",
            },
            {
              time: "10.00",
              title: "Pengajian Umum",
              details: [
                "Pembukaan",
                "Lantunan ayat suci Al-Qur’an",
                "Sambutan-sambutan",
                "Mauidhoh Hasanah oleh",
                "Ibu Nyai Hj. Nurul Abidah",
                "(Pasuruan, Jawa Timur)",
              ],
            },
            {
              time: "19.30",
              title: "Al-Falah Assholihaat bersholawat",
            },
          ],
        },
      ],
    },

    /* ===== SCENE 4 ===== */
    {
      id: 4,
      type: "location",
      data: {
        mapsEmbed:
          "https://www.google.com/maps?q=ponpes+alfalah&output=embed",
        qr: "https://maps.google.com/?q=ponpes+alfalah",
        address:
          "Ponpes Al-Falah Assholihaat, Sampangan, Bumirejo, Kaliangkrik",
      },
    },
  ],

  /* ================= SETTINGS ================= */
  settings: {
    autoPlay: true,
    autoSceneDuration: 5000,
    enableScroll: true,
    enableMusic: true,
  },
};