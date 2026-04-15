import { useState, useEffect, useMemo, useCallback } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// ============================================================
// 🔧 CONFIG: Replace with your Supabase credentials
// ============================================================
const SUPABASE_URL = "https://qtkojajqgxpnzplgkphi.supabase.co";
const SUPABASE_KEY = "sb_publishable_sbf-h8vkP4CRlRpl3tPfhw_XYQkW-bh";
const USE_MOCK = false;
// ============================================================

const ANIMALS = {
  otter:    { name: "水獭", em: "🦦", c: "#5B8FB9", lang: "身体接触" },
  cat:      { name: "猫咪", em: "🐱", c: "#9B72AA", lang: "优质时间" },
  golden:   { name: "金毛", em: "🐕", c: "#D4915D", lang: "肯定言辞" },
  deer:     { name: "小鹿", em: "🦌", c: "#7BAE7F", lang: "服务行动" },
  hedgehog: { name: "刺猬", em: "🦔", c: "#C2855A", lang: "接受礼物" },
};

const F = "'DM Sans', sans-serif";

// Generate realistic mock data
function generateMockData() {
  const now = new Date();
  const results = [];
  const events = [];
  const types = ["otter", "cat", "golden", "deer", "hedgehog"];
  const sources = ["xiaohongshu", "wechat", "direct", "douyin"];
  const weights = [0.22, 0.25, 0.2, 0.18, 0.15]; // type distribution

  for (let d = 29; d >= 0; d--) {
    const date = new Date(now); date.setDate(date.getDate() - d);
    const base = d < 5 ? 40 + Math.random() * 30 : d < 15 ? 20 + Math.random() * 25 : 5 + Math.random() * 15;
    const count = Math.round(base);

    // page views (more than completions)
    const pvCount = Math.round(count * (1.8 + Math.random() * 0.5));
    const startCount = Math.round(count * (1.3 + Math.random() * 0.3));

    for (let i = 0; i < pvCount; i++) {
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const t = new Date(date); t.setHours(h, m);
      const sid = `s_${d}_${i}`;
      const src = sources[Math.floor(Math.random() * sources.length)];
      events.push({ created_at: t.toISOString(), event_type: "page_view", session_id: sid, source: src });
    }
    for (let i = 0; i < startCount; i++) {
      const h = Math.floor(Math.random() * 24);
      const t = new Date(date); t.setHours(h);
      events.push({ created_at: t.toISOString(), event_type: "start_quiz", session_id: `s_${d}_${i}`, source: sources[Math.floor(Math.random() * sources.length)] });
    }

    for (let i = 0; i < count; i++) {
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const t = new Date(date); t.setHours(h, m);
      const r = Math.random();
      let cum = 0, typeIdx = 0;
      for (let j = 0; j < weights.length; j++) { cum += weights[j]; if (r < cum) { typeIdx = j; break; } }
      const type = types[typeIdx];
      const scores = {};
      types.forEach(tp => { scores[tp] = tp === type ? 4 + Math.floor(Math.random() * 4) : Math.floor(Math.random() * 4); });
      const src = sources[Math.floor(Math.random() * sources.length)];
      const shared = Math.random() < 0.35;
      results.push({ created_at: t.toISOString(), result_type: type, scores, shared, source: src, paid: Math.random() < 0.08 });
      events.push({ created_at: t.toISOString(), event_type: "complete_quiz", session_id: `s_${d}_${i}`, source: src });
      if (shared) events.push({ created_at: t.toISOString(), event_type: "share", session_id: `s_${d}_${i}`, source: src });
      if (Math.random() < 0.15) events.push({ created_at: t.toISOString(), event_type: "pay_click", session_id: `s_${d}_${i}`, source: src });
      if (Math.random() < 0.06) events.push({ created_at: t.toISOString(), event_type: "pay_success", session_id: `s_${d}_${i}`, source: src });
    }
  }
  return { results, events };
}

async function fetchFromSupabase(table, select = "*") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  return res.json();
}

// Stat card component
function Stat({ label, value, sub, icon, color = "#FF6B8A", delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), delay); }, [delay]);
  return (
    <div style={{ background: "#FFF", borderRadius: 16, padding: "20px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)", transition: "all 0.5s ease", flex: "1 1 140px", minWidth: 140 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "#8A7A8A", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <p style={{ fontSize: 28, fontWeight: 700, color: "#2D2035", margin: "0 0 2px", letterSpacing: "-0.5px" }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color, fontWeight: 600 }}>{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState(7); // 7 or 30 days
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (USE_MOCK) {
      const mock = generateMockData();
      setData(mock);
    } else {
      const [results, events] = await Promise.all([
        fetchFromSupabase("quiz_results"),
        fetchFromSupabase("quiz_events")
      ]);
      setData({ results, events });
    }
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const processed = useMemo(() => {
    if (!data) return null;
    const now = new Date();
    const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - range);

    const results = data.results.filter(r => new Date(r.created_at) >= cutoff);
    const events = data.events.filter(e => new Date(e.created_at) >= cutoff);
    const allResults = data.results;

    // total stats
    const totalComplete = results.length;
    const totalPV = events.filter(e => e.event_type === "page_view").length;
    const totalStart = events.filter(e => e.event_type === "start_quiz").length;
    const totalShare = results.filter(r => r.shared).length;
    const totalPayClick = events.filter(e => e.event_type === "pay_click").length;
    const totalPaySuccess = events.filter(e => e.event_type === "pay_success").length;
    const shareRate = totalComplete > 0 ? Math.round(totalShare / totalComplete * 100) : 0;
    const completeRate = totalStart > 0 ? Math.round(totalComplete / totalStart * 100) : 0;
    const payConvRate = totalPayClick > 0 ? Math.round(totalPaySuccess / totalPayClick * 100) : 0;

    // type distribution
    const typeDist = {};
    Object.keys(ANIMALS).forEach(k => typeDist[k] = 0);
    results.forEach(r => { if (typeDist[r.result_type] !== undefined) typeDist[r.result_type]++; });
    const pieData = Object.entries(typeDist).map(([k, v]) => ({ name: ANIMALS[k].em + " " + ANIMALS[k].name, value: v, key: k }));

    // source distribution
    const srcDist = {};
    results.forEach(r => { srcDist[r.source] = (srcDist[r.source] || 0) + 1; });
    const srcLabels = { xiaohongshu: "小红书", wechat: "微信", direct: "直接访问", douyin: "抖音", other: "其他" };
    const srcData = Object.entries(srcDist).map(([k, v]) => ({ name: srcLabels[k] || k, value: v })).sort((a, b) => b.value - a.value);

    // daily trend
    const dayMap = {};
    for (let d = range - 1; d >= 0; d--) {
      const dt = new Date(now); dt.setDate(dt.getDate() - d);
      const key = `${dt.getMonth() + 1}/${dt.getDate()}`;
      dayMap[key] = { date: key, pv: 0, start: 0, complete: 0, share: 0 };
    }
    events.forEach(e => {
      const d = new Date(e.created_at);
      const key = `${d.getMonth() + 1}/${d.getDate()}`;
      if (dayMap[key]) {
        if (e.event_type === "page_view") dayMap[key].pv++;
        if (e.event_type === "start_quiz") dayMap[key].start++;
        if (e.event_type === "complete_quiz") dayMap[key].complete++;
        if (e.event_type === "share") dayMap[key].share++;
      }
    });
    const trendData = Object.values(dayMap);

    // hourly distribution
    const hourDist = Array(24).fill(0);
    results.forEach(r => { const h = new Date(r.created_at).getHours(); hourDist[h]++; });
    const hourData = hourDist.map((v, i) => ({ hour: `${i}时`, count: v }));

    // funnel
    const funnel = [
      { name: "访问页面", value: totalPV, rate: "100%" },
      { name: "开始答题", value: totalStart, rate: totalPV > 0 ? Math.round(totalStart / totalPV * 100) + "%" : "-" },
      { name: "完成测试", value: totalComplete, rate: totalPV > 0 ? Math.round(totalComplete / totalPV * 100) + "%" : "-" },
      { name: "生成分享", value: totalShare, rate: totalPV > 0 ? Math.round(totalShare / totalPV * 100) + "%" : "-" },
      { name: "点击付费", value: totalPayClick, rate: totalPV > 0 ? Math.round(totalPayClick / totalPV * 100) + "%" : "-" },
      { name: "付费成功", value: totalPaySuccess, rate: totalPV > 0 ? Math.round(totalPaySuccess / totalPV * 100) + "%" : "-" },
    ];

    return { totalComplete, totalPV, totalStart, totalShare, shareRate, completeRate, payConvRate, totalPaySuccess, pieData, srcData, trendData, hourData, funnel, allTotal: allResults.length };
  }, [data, range]);

  if (loading || !processed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7FC", fontFamily: F }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10, animation: "spin 2s linear infinite" }}>🦦</div>
        <p style={{ color: "#8A7A8A", fontSize: 15 }}>加载数据中...</p>
        <style>{`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  const PIE_COLORS = Object.values(ANIMALS).map(a => a.c);
  const SRC_COLORS = ["#FF6B8A", "#5B8FB9", "#7BAE7F", "#D4915D", "#9B72AA"];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7FC", fontFamily: F, padding: "24px 16px 60px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#2D2035", margin: "0 0 4px" }}>🦦 恋爱动物测试 · 数据面板</h1>
          <p style={{ fontSize: 13, color: "#8A7A8A", margin: 0 }}>
            {USE_MOCK && <span style={{ background: "#FFF0E0", color: "#D4915D", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, marginRight: 6 }}>DEMO</span>}
            累计完成 {processed.allTotal} 次测试
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[7, 30].map(d => (
            <button key={d} onClick={() => setRange(d)} style={{
              fontFamily: F, fontSize: 13, fontWeight: 600,
              color: range === d ? "#FFF" : "#8A7A8A",
              background: range === d ? "#FF6B8A" : "#FFF",
              border: range === d ? "none" : "1px solid #E8E0E8",
              borderRadius: 10, padding: "8px 16px", cursor: "pointer", transition: "all 0.2s"
            }}>近{d}天</button>
          ))}
          <button onClick={loadData} disabled={loading} style={{
            fontFamily: F, fontSize: 13, fontWeight: 600,
            color: "#FFF", background: loading ? "#CCC" : "#7BAE7F",
            border: "none", borderRadius: 10, padding: "8px 14px",
            cursor: loading ? "default" : "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 4
          }}>{loading ? "刷新中..." : "🔄 刷新"}</button>
          {lastRefresh && <span style={{ fontSize: 11, color: "#B8A8B8" }}>{lastRefresh.toLocaleTimeString()}</span>}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <Stat label="页面访问" value={processed.totalPV.toLocaleString()} icon="👀" color="#5B8FB9" delay={0} />
          <Stat label="完成测试" value={processed.totalComplete.toLocaleString()} sub={`完成率 ${processed.completeRate}%`} icon="✅" color="#7BAE7F" delay={80} />
          <Stat label="生成分享" value={processed.totalShare.toLocaleString()} sub={`分享率 ${processed.shareRate}%`} icon="📸" color="#FF6B8A" delay={160} />
          <Stat label="付费成功" value={processed.totalPaySuccess.toLocaleString()} sub={`转化率 ${processed.payConvRate}%`} icon="💰" color="#D4915D" delay={240} />
        </div>

        {/* Trend Chart */}
        <div style={{ background: "#FFF", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0", marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D2035", marginBottom: 16 }}>📈 每日趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={processed.trendData}>
              <defs>
                <linearGradient id="gPV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#5B8FB9" stopOpacity={0.15}/><stop offset="95%" stopColor="#5B8FB9" stopOpacity={0}/></linearGradient>
                <linearGradient id="gComp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF6B8A" stopOpacity={0.2}/><stop offset="95%" stopColor="#FF6B8A" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0ECF0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#AAA" }} />
              <YAxis tick={{ fontSize: 11, fill: "#AAA" }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13, border: "1px solid #F0ECF0" }} />
              <Area type="monotone" dataKey="pv" stroke="#5B8FB9" fill="url(#gPV)" strokeWidth={2} name="访问" />
              <Area type="monotone" dataKey="complete" stroke="#FF6B8A" fill="url(#gComp)" strokeWidth={2} name="完成" />
              <Line type="monotone" dataKey="share" stroke="#7BAE7F" strokeWidth={2} dot={false} name="分享" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two column: Pie + Source */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          {/* Type Distribution */}
          <div style={{ flex: "1 1 280px", background: "#FFF", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D2035", marginBottom: 12 }}>🐾 动物类型分布</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={processed.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {processed.pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {processed.pieData.map((d, i) => (
                <span key={i} style={{ fontSize: 12, color: PIE_COLORS[i], fontWeight: 600 }}>{d.name} {d.value}</span>
              ))}
            </div>
          </div>

          {/* Source Distribution */}
          <div style={{ flex: "1 1 280px", background: "#FFF", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D2035", marginBottom: 12 }}>🔗 流量来源</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={processed.srcData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECF0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#AAA" }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "#666" }} width={65} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="人数">
                  {processed.srcData.map((_, i) => <Cell key={i} fill={SRC_COLORS[i % SRC_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel */}
        <div style={{ background: "#FFF", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0", marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D2035", marginBottom: 16 }}>🔻 转化漏斗</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {processed.funnel.map((step, i) => {
              const maxVal = processed.funnel[0].value || 1;
              const pct = Math.max((step.value / maxVal) * 100, 2);
              const colors = ["#5B8FB9", "#9B72AA", "#FF6B8A", "#7BAE7F", "#D4915D", "#C2855A"];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#666", width: 65, textAlign: "right", flexShrink: 0 }}>{step.name}</span>
                  <div style={{ flex: 1, height: 28, background: "#F8F4FA", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: colors[i], borderRadius: 8, transition: "width 0.8s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, minWidth: 50 }}>
                      <span style={{ fontSize: 12, color: "#FFF", fontWeight: 700 }}>{step.value}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "#999", width: 36, flexShrink: 0 }}>{step.rate}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hourly distribution */}
        <div style={{ background: "#FFF", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #F0ECF0", marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D2035", marginBottom: 16 }}>🕐 活跃时段分布</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={processed.hourData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0ECF0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#AAA" }} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: "#AAA" }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
              <Bar dataKey="count" fill="#FF6B8A" radius={[4, 4, 0, 0]} name="完成数" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer hint */}
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <p style={{ fontSize: 12, color: "#B8A8B8" }}>
            {USE_MOCK ? "当前显示的是模拟数据 · 连接 Supabase 后将显示真实数据" : "数据每次打开页面时刷新"}
          </p>
        </div>
      </div>
    </div>
  );
}
