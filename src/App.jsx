import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Mini Ülke Veritabanı (Demo) ---
const ULKELER = [
  { code: "TUR", adTR: "Türkiye", lat: 39.0, lon: 35.0, kitas: "Asya/Avrupa" },
  { code: "USA", adTR: "Amerika Birleşik Devletleri", lat: 39.8, lon: -98.6, kitas: "Kuzey Amerika" },
  { code: "CAN", adTR: "Kanada", lat: 56.1, lon: -106.3, kitas: "Kuzey Amerika" },
  { code: "MEX", adTR: "Meksika", lat: 23.6, lon: -102.5, kitas: "Kuzey Amerika" },
  { code: "BRA", adTR: "Brezilya", lat: -14.2, lon: -51.9, kitas: "Güney Amerika" },
  { code: "ARG", adTR: "Arjantin", lat: -38.4, lon: -63.6, kitas: "Güney Amerika" },
  { code: "CHL", adTR: "Şili", lat: -35.7, lon: -71.5, kitas: "Güney Amerika" },
  { code: "COL", adTR: "Kolombiya", lat: 4.6, lon: -74.1, kitas: "Güney Amerika" },
  { code: "PER", adTR: "Peru", lat: -9.2, lon: -75.0, kitas: "Güney Amerika" },
  { code: "URU", adTR: "Uruguay", lat: -32.5, lon: -55.8, kitas: "Güney Amerika" },
  { code: "BOL", adTR: "Bolivya", lat: -16.3, lon: -63.6, kitas: "Güney Amerika" },
  { code: "VEN", adTR: "Venezuela", lat: 6.4, lon: -66.6, kitas: "Güney Amerika" },
  { code: "GBR", adTR: "Birleşik Krallık", lat: 55.4, lon: -3.4, kitas: "Avrupa" },
  { code: "FRA", adTR: "Fransa", lat: 46.2, lon: 2.2, kitas: "Avrupa" },
  { code: "DEU", adTR: "Almanya", lat: 51.2, lon: 10.4, kitas: "Avrupa" },
  { code: "ITA", adTR: "İtalya", lat: 41.9, lon: 12.6, kitas: "Avrupa" },
  { code: "ESP", adTR: "İspanya", lat: 40.5, lon: -3.7, kitas: "Avrupa" },
  { code: "PRT", adTR: "Portekiz", lat: 39.4, lon: -8.2, kitas: "Avrupa" },
  { code: "NLD", adTR: "Hollanda", lat: 52.1, lon: 5.3, kitas: "Avrupa" },
  { code: "BEL", adTR: "Belçika", lat: 50.8, lon: 4.5, kitas: "Avrupa" },
  { code: "CHE", adTR: "İsviçre", lat: 46.8, lon: 8.2, kitas: "Avrupa" },
  { code: "AUT", adTR: "Avusturya", lat: 47.5, lon: 14.5, kitas: "Avrupa" },
  { code: "POL", adTR: "Polonya", lat: 52.1, lon: 19.1, kitas: "Avrupa" },
  { code: "GRC", adTR: "Yunanistan", lat: 39.1, lon: 22.9, kitas: "Avrupa" },
  { code: "SWE", adTR: "İsveç", lat: 60.1, lon: 18.6, kitas: "Avrupa" },
  { code: "NOR", adTR: "Norveç", lat: 60.5, lon: 8.5, kitas: "Avrupa" },
  { code: "FIN", adTR: "Finlandiya", lat: 64.0, lon: 26.0, kitas: "Avrupa" },
  { code: "DNK", adTR: "Danimarka", lat: 56.2, lon: 9.5, kitas: "Avrupa" },
  { code: "IRL", adTR: "İrlanda", lat: 53.1, lon: -8.2, kitas: "Avrupa" },
  { code: "ISL", adTR: "İzlanda", lat: 64.9, lon: -19.0, kitas: "Avrupa" },
  { code: "PRY", adTR: "Paraguay", lat: -23.4, lon: -58.4, kitas: "Güney Amerika" },
  { code: "ECU", adTR: "Ekvador", lat: -1.8, lon: -78.2, kitas: "Güney Amerika" },
  { code: "MAR", adTR: "Fas", lat: 31.8, lon: -7.1, kitas: "Afrika" },
  { code: "DZA", adTR: "Cezayir", lat: 28.0, lon: 1.6, kitas: "Afrika" },
  { code: "EGY", adTR: "Mısır", lat: 26.8, lon: 30.8, kitas: "Afrika" },
  { code: "ZAF", adTR: "Güney Afrika", lat: -30.6, lon: 22.9, kitas: "Afrika" },
  { code: "ETH", adTR: "Etiyopya", lat: 9.1, lon: 40.5, kitas: "Afrika" },
  { code: "NGA", adTR: "Nijerya", lat: 9.1, lon: 8.7, kitas: "Afrika" },
  { code: "KEN", adTR: "Kenya", lat: -0.0, lon: 37.9, kitas: "Afrika" },
  { code: "TZA", adTR: "Tanzanya", lat: -6.4, lon: 35.0, kitas: "Afrika" },
  { code: "SDN", adTR: "Sudan", lat: 15.6, lon: 29.5, kitas: "Afrika" },
  { code: "SAU", adTR: "Suudi Arabistan", lat: 23.9, lon: 45.1, kitas: "Asya" },
  { code: "IRN", adTR: "İran", lat: 32.4, lon: 53.7, kitas: "Asya" },
  { code: "IRQ", adTR: "Irak", lat: 33.2, lon: 43.7, kitas: "Asya" },
  { code: "SYR", adTR: "Suriye", lat: 35.0, lon: 38.5, kitas: "Asya" },
  { code: "JOR", adTR: "Ürdün", lat: 31.3, lon: 36.5, kitas: "Asya" },
  { code: "LBN", adTR: "Lübnan", lat: 33.9, lon: 35.9, kitas: "Asya" },
  { code: "ISR", adTR: "İsrail", lat: 31.0, lon: 35.0, kitas: "Asya" },
  { code: "RUS", adTR: "Rusya", lat: 61.5, lon: 105.3, kitas: "Avrupa/Asya" },
  { code: "CHN", adTR: "Çin", lat: 35.9, lon: 104.2, kitas: "Asya" },
  { code: "JPN", adTR: "Japonya", lat: 36.2, lon: 138.3, kitas: "Asya" },
  { code: "KOR", adTR: "Güney Kore", lat: 36.6, lon: 127.9, kitas: "Asya" },
  { code: "PRK", adTR: "Kuzey Kore", lat: 40.3, lon: 127.5, kitas: "Asya" },
  { code: "IND", adTR: "Hindistan", lat: 20.6, lon: 78.9, kitas: "Asya" },
  { code: "PAK", adTR: "Pakistan", lat: 29.4, lon: 69.3, kitas: "Asya" },
  { code: "AFG", adTR: "Afganistan", lat: 33.9, lon: 67.7, kitas: "Asya" },
  { code: "KAZ", adTR: "Kazakistan", lat: 48.0, lon: 67.0, kitas: "Asya" },
  { code: "MNG", adTR: "Moğolistan", lat: 46.9, lon: 103.8, kitas: "Asya" },
  { code: "IDN", adTR: "Endonezya", lat: -2.5, lon: 118.0, kitas: "Asya" },
  { code: "AUS", adTR: "Avustralya", lat: -25.3, lon: 133.8, kitas: "Okyanusya" },
  { code: "NZL", adTR: "Yeni Zelanda", lat: -41.3, lon: 174.8, kitas: "Okyanusya" },
  { code: "UKR", adTR: "Ukrayna", lat: 48.4, lon: 31.2, kitas: "Avrupa" },
  { code: "ROU", adTR: "Romanya", lat: 45.9, lon: 24.9, kitas: "Avrupa" },
  { code: "BGR", adTR: "Bulgaristan", lat: 42.7, lon: 25.5, kitas: "Avrupa" },
  { code: "SRB", adTR: "Sırbistan", lat: 44.0, lon: 20.8, kitas: "Avrupa" },
  { code: "HUN", adTR: "Macaristan", lat: 47.2, lon: 19.5, kitas: "Avrupa" },
  { code: "CZE", adTR: "Çekya", lat: 49.8, lon: 15.5, kitas: "Avrupa" },
];

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const renkSkalasi = (mesafeKm) => {
  if (mesafeKm === 0) return "bg-green-500 text-white";
  if (mesafeKm < 500) return "bg-red-600 text-white";
  if (mesafeKm < 1500) return "bg-orange-500 text-white";
  if (mesafeKm < 3000) return "bg-amber-400 text-black";
  if (mesafeKm < 6000) return "bg-yellow-300 text-black";
  return "bg-blue-200 text-black";
};

const normalise = (s) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-zçğıöşü\s-]/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const uIndex = ULKELER.reduce((acc, u) => {
  acc[normalise(u.adTR)] = u;
  return acc;
}, {});

function useOdaKanal(pin) {
  const kanalRef = useRef(null);
  useEffect(() => {
    if (!pin) return;
    const ch = new BroadcastChannel(`geomut-${pin}`);
    kanalRef.current = ch;
    return () => ch.close();
  }, [pin]);
  return kanalRef;
}

function randomPIN() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl md:text-3xl font-bold">
        GEOMUT <span className="font-light">— Coğrafya Yarışı</span>
      </h1>
      <div className="text-sm opacity-70">Prototip • Türkçe • Sınıf içi</div>
    </div>
  );
}

export default function App() {
  const [rol, setRol] = useState(""); // "ogretmen" | "ogrenci"
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <Header />
        {!rol && <RolSec onSelect={setRol} />}
        {rol === "ogretmen" && <OgretmenEkrani />}
        {rol === "ogrenci" && <OgrenciEkrani />}
      </div>
    </div>
  );
}

function RolSec({ onSelect }) {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-4">
      <div className="p-6 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Öğretmen</h2>
        <p className="text-sm opacity-80 mb-4">
          Odayı başlat, PIN paylaş, hedef ülkeyi seç ve oyunu yönet.
        </p>
        <button onClick={() => onSelect("ogretmen")} className="px-4 py-2 rounded-xl bg-black text-white">
          Öğretmen olarak devam et
        </button>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Öğrenci</h2>
        <p className="text-sm opacity-80 mb-4">
          PIN ile katıl, rumuzunu yaz, tahminlerini gönder.
        </p>
        <button onClick={() => onSelect("ogrenci")} className="px-4 py-2 rounded-xl bg-black text-white">
          Öğrenci olarak devam et
        </button>
      </div>
    </div>
  );
}

function OgretmenEkrani() {
  const [pin, setPin] = useState(randomPIN());
  const kanalRef = useOdaKanal(pin);
  const [durum, setDurum] = useState("bekleme"); // bekleme | basladi | bitti
  const [sure, setSure] = useState(90);
  const [kalan, setKalan] = useState(0);
  const [hedefKod, setHedefKod] = useState("TUR");
  const hedef = useMemo(() => ULKELER.find(u => u.code === hedefKod), [hedefKod]);
  const [oyuncular, setOyuncular] = useState({}); // id -> {ad, puan, sonTahmin, dogru}

  // Mesajları dinle
  useEffect(() => {
    if (!kanalRef.current) return;
    const ch = kanalRef.current;
    const onMsg = (e) => {
      const { tip, payload } = e.data || {};
      if (tip === "JOIN") {
        setOyuncular((prev) => ({
          ...prev,
          [payload.id]: { ad: payload.ad, puan: 0, sonTahmin: null, dogru: false },
        }));
        ch.postMessage({ tip: "STATE", payload: { durum, kalan, hedefVar: !!hedef } });
      }
      if (tip === "GUESS" && durum === "basladi" && hedef) {
        const guess = payload.tahmin;
        const u = uIndex[normalise(guess)];
        let mesafe = null;
        let isCorrect = false;
        let ipucu = null;
        if (u) {
          mesafe = haversineKm(u.lat, u.lon, hedef.lat, hedef.lon);
          isCorrect = u.code === hedef.code;
          if (!isCorrect) {
            ipucu = u.kitas === hedef.kitas ? "Aynı kıta!" : `Hedef kıta: ${hedef.kitas}`;
          }
        } else {
          ipucu = "Geçersiz ülke adı (TR).";
        }
        // Hız puanı: kalan saniyeye göre bonus
        let kazanilan = 0;
        if (isCorrect) {
          kazanilan = 1000 + Math.max(0, Math.floor(kalan) * 5);
        } else if (mesafe != null) {
          // yakınsa küçük puan
          kazanilan = Math.max(0, 300 - Math.min(300, mesafe / 20));
        }
        setOyuncular((prev) => {
          const o = prev[payload.id];
          if (!o) return prev;
          const yeni = {
            ...prev,
            [payload.id]: {
              ...o,
              puan: o.puan + Math.floor(kazanilan),
              sonTahmin: { yazi: guess, mesafe, isCorrect, zaman: Date.now() },
              dogru: o.dogru || isCorrect,
            },
          };
          return yeni;
        });
        ch.postMessage({ tip: "FEEDBACK", payload: { id: payload.id, mesafe, isCorrect, ipucu, puan: Math.floor(kazanilan) } });
      }
    };
    ch.addEventListener("message", onMsg);
    return () => ch.removeEventListener("message", onMsg);
  }, [kanalRef, durum, hedef, kalan]);

  // Sayaç
  useEffect(() => {
    if (durum !== "basladi") return;
    const t0 = Date.now();
    const end = t0 + sure * 1000;
    const id = setInterval(() => {
      const now = Date.now();
      const k = Math.max(0, (end - now) / 1000);
      setKalan(k);
      if (k <= 0) setDurum("bitti");
    }, 200);
    return () => clearInterval(id);
  }, [durum, sure]);

  useEffect(() => {
    if (!kanalRef.current) return;
    kanalRef.current.postMessage({ tip: "STATE", payload: { durum, kalan, hedefVar: !!hedef } });
    if (durum === "bitti") kanalRef.current.postMessage({ tip: "END", payload: { hedef } });
  }, [durum, kalan, hedef]);

  const baslat = () => {
    setOyuncular({});
    setDurum("basladi");
  };

  const yeniden = () => {
    setDurum("bekleme");
    setKalan(0);
    setOyuncular({});
    setPin(randomPIN());
  };

  const siralama = Object.entries(oyuncular)
    .map(([id, o]) => ({ id, ...o }))
    .sort((a, b) => b.puan - a.puan);

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 p-6 bg-white rounded-2xl shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm uppercase tracking-wide opacity-60">Oda PIN</div>
            <div className="text-3xl font-extrabold">{pin}</div>
          </div>
          <div className="text-right">
            <div className="text-sm uppercase tracking-wide opacity-60">Durum</div>
            <div className="text-xl font-bold">
              {durum === "bekleme" ? "Bekleme" : durum === "basladi" ? "Oyun Başladı" : "Süre Bitti"}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50">
            <label className="text-sm font-medium">Hedef Ülke</label>
            <select
              disabled={durum !== "bekleme"}
              value={hedefKod}
              onChange={(e) => setHedefKod(e.target.value)}
              className="mt-2 w-full p-3 rounded-xl border"
            >
              {ULKELER.map((u) => (
                <option key={u.code} value={u.code}>{u.adTR}</option>
              ))}
            </select>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <label className="text-sm font-medium">Süre (saniye)</label>
            <input
              type="number"
              min={30}
              max={300}
              step={10}
              disabled={durum !== "bekleme"}
              value={sure}
              onChange={(e) => setSure(parseInt(e.target.value || "90", 10))}
              className="mt-2 w-full p-3 rounded-xl border"
            />
            {durum === "basladi" && (
              <div className="mt-2 text-2xl font-bold">Kalan: {Math.ceil(kalan)} sn</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {durum === "bekleme" && (
            <button onClick={baslat} className="px-4 py-3 rounded-xl bg-black text-white">Oyunu Başlat</button>
          )}
          {durum !== "bekleme" && (
            <button onClick={yeniden} className="px-4 py-3 rounded-xl bg-gray-200">Yeni Oda</button>
          )}
        </div>

        {durum === "basladi" && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Canlı Akış</h3>
            <div className="grid gap-2 max-h-64 overflow-auto">
              {siralama.map((o) => (
                <div key={o.id} className={`p-3 rounded-xl flex items-center justify-between ${o.sonTahmin ? renkSkalasi(o.sonTahmin.mesafe ?? 99999) : "bg-gray-100"}`}>
                  <div className="font-medium">{o.ad}</div>
                  <div className="text-sm">
                    {o.sonTahmin ? (o.sonTahmin.isCorrect ? "DOĞRU!" : (o.sonTahmin.mesafe != null ? `${o.sonTahmin.mesafe} km` : "—")) : "—"}
                  </div>
                  <div className="font-bold">{o.puan} puan</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {durum === "bitti" && (
          <div className="mt-6 p-4 rounded-xl bg-green-50">
            <div className="text-lg">Süre bitti. Hedef ülke: <span className="font-semibold">{hedef?.adTR}</span></div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white rounded-2xl shadow">
        <h3 className="font-semibold mb-3">Katılan Oyuncular</h3>
        <ol className="space-y-2 list-decimal list-inside">
          {siralama.map((o) => (
            <li key={o.id} className="flex items-center justify-between">
              <span className="truncate mr-2">{o.ad}</span>
              <span className="font-bold">{o.puan}</span>
            </li>
          ))}
          {siralama.length === 0 && <div className="text-sm opacity-60">Henüz kimse katılmadı.</div>}
        </ol>
        <div className="mt-6 text-sm opacity-70">
          <p>Not: Bu prototip aynı alan adındaki farklı cihaz/sekmeler arasında <code>BroadcastChannel</code> ile gerçek zamanlı çalışır. Okulda sunucuya kurulduğunda tüm öğrenciler katılabilir.</p>
        </div>
      </div>
    </div>
  );
}

function OgrenciEkrani() {
  const [pin, setPin] = useState("");
  const [rumuz, setRumuz] = useState("");
  const [id] = useState(() => Math.random().toString(36).slice(2));
  const kanalRef = useOdaKanal(pin);
  const [durum, setDurum] = useState("giris"); // giris | bekleme | oyun | bitti
  const [kalan, setKalan] = useState(0);
  const [puan, setPuan] = useState(0);
  const [geri, setGeri] = useState(null); // {mesafe, isCorrect, ipucu, puan}

  useEffect(() => {
    if (!kanalRef.current) return;
    const ch = kanalRef.current;
    const onMsg = (e) => {
      const { tip, payload } = e.data || {};
      if (tip === "STATE") {
        setDurum(payload.durum === "basladi" ? "oyun" : payload.durum === "bitti" ? "bitti" : "bekleme");
        setKalan(payload.kalan || 0);
      }
      if (tip === "FEEDBACK" && payload.id === id) {
        setGeri(payload);
        setPuan((p) => p + (payload.puan || 0));
      }
      if (tip === "END") {
        setDurum("bitti");
      }
    };
    ch.addEventListener("message", onMsg);
    return () => ch.removeEventListener("message", onMsg);
  }, [kanalRef, id]);

  const katil = () => {
    if (!pin || !rumuz) return;
    if (!kanalRef.current) return;
    kanalRef.current.postMessage({ tip: "JOIN", payload: { id, ad: rumuz } });
    setDurum("bekleme");
  };

  const tahminGonder = (tahmin) => {
    if (!kanalRef.current || durum !== "oyun") return;
    kanalRef.current.postMessage({ tip: "GUESS", payload: { id, tahmin } });
  };

  return (
    <div className="mt-8 max-w-xl mx-auto">
      {durum === "giris" && (
        <div className="p-6 bg-white rounded-2xl shadow space-y-3">
          <div>
            <label className="text-sm font-medium">Oda PIN</label>
            <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="4 haneli PIN"
                   className="mt-1 w-full p-3 rounded-xl border" />
          </div>
          <div>
            <label className="text-sm font-medium">Rumuz</label>
            <input value={rumuz} onChange={(e) => setRumuz(e.target.value)} placeholder="Adını yaz"
                   className="mt-1 w-full p-3 rounded-xl border" />
          </div>
          <button onClick={katil} className="w-full px-4 py-3 rounded-xl bg-black text-white">Katıl</button>
        </div>
      )}

      {durum === "bekleme" && (
        <div className="p-6 bg-white rounded-2xl shadow">
          <div className="text-lg">Öğretmen oyunu başlatana kadar bekleyin…</div>
        </div>
      )}

      {durum === "oyun" && (
        <OyunFormu kalan={kalan} onGonder={tahminGonder} geri={geri} puan={puan} />
      )}

      {durum === "bitti" && (
        <div className="p-6 bg-white rounded-2xl shadow">
          <div className="text-lg font-semibold mb-2">Oyun bitti!</div>
          <div className="mb-2">Toplam puanın: <span className="font-bold">{puan}</span></div>
          <div className="text-sm opacity-70">Öğretmen yeni oda açtığında tekrar katılabilirsiniz.</div>
        </div>
      )}
    </div>
  );
}

function OyunFormu({ kalan, onGonder, geri, puan }) {
  const [tahmin, setTahmin] = useState("");
  const [listeAcik, setListeAcik] = useState(false);
  const uygunlar = useMemo(() => {
    const q = normalise(tahmin);
    if (!q) return [];
    return ULKELER.filter(u => normalise(u.adTR).includes(q)).slice(0, 10);
  }, [tahmin]);

  const submit = (e) => {
    e.preventDefault();
    if (!tahmin.trim()) return;
    onGonder(tahmin.trim());
    setTahmin("");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm opacity-70">Kalan süre</div>
        <div className="text-2xl font-bold">{Math.ceil(kalan)} sn</div>
      </div>
      <form onSubmit={submit} className="relative">
        <input
          value={tahmin}
          onChange={(e) => setTahmin(e.target.value)}
          onFocus={() => setListeAcik(true)}
          placeholder="Ülke adı yaz (Türkçe)"
          className="w-full p-4 rounded-2xl border"
        />
        {listeAcik && uygunlar.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow z-10 max-h-60 overflow-auto">
            {uygunlar.map(u => (
              <button type="button" key={u.code}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
                onClick={() => { setTahmin(u.adTR); setListeAcik(false); }}>
                {u.adTR}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button className="px-4 py-3 rounded-xl bg-black text-white" type="submit">Tahmin Gönder</button>
          <button type="button" className="px-4 py-3 rounded-xl bg-gray-100" onClick={() => setListeAcik(v => !v)}>Liste</button>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="opacity-70">Puan:</span>
            <span className="font-bold">{puan}</span>
          </div>
        </div>
      </form>

      {geri && (
        <div className={`mt-4 p-4 rounded-xl ${geri.isCorrect ? "bg-green-100" : "bg-gray-50"}`}>
          <div className="font-medium mb-1">Geri Bildirim</div>
          {typeof geri.mesafe === "number" && (
            <div className="mb-1">Hedefe uzaklık: <span className="font-semibold">{geri.mesafe} km</span></div>
          )}
          {geri.ipucu && <div className="text-sm opacity-80">İpucu: {geri.ipucu}</div>}
          <div className="mt-2 text-sm">Bu tahmin puanı: <span className="font-bold">{geri.puan}</span></div>
          {geri.isCorrect && <div className="mt-2 font-semibold">Tebrikler, doğru bildin! Devam edebilirsin; ek puan toplayabilirsin.</div>}
        </div>
      )}

      <div className="mt-4 text-xs opacity-60">
        * Yakınlık puanları mesafeye göre, doğru yanıtlar hız bonusuyla hesaplanır.
      </div>
    </div>
  );
}
