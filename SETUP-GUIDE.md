# 恋爱动物测试 — 数据统计部署指南

## 第一步：Supabase 建表

登录你的 Supabase 项目（https://supabase.com/dashboard），
进入 SQL Editor，执行以下 SQL：

```sql
-- 测试结果记录表
CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  result_type TEXT NOT NULL,          -- otter/cat/golden/deer/hedgehog
  scores JSONB NOT NULL,              -- {"otter":3,"cat":5,"golden":2,"deer":3,"hedgehog":2}
  shared BOOLEAN DEFAULT FALSE,       -- 是否生成了分享图
  source TEXT DEFAULT 'direct',       -- 来源：xiaohongshu/wechat/direct/other
  user_agent TEXT,                    -- 浏览器信息（判断设备类型）
  paid BOOLEAN DEFAULT FALSE          -- 是否付费（预留字段）
);

-- 页面访问记录表（统计漏斗）
CREATE TABLE quiz_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event_type TEXT NOT NULL,           -- page_view / start_quiz / complete_quiz / share / pay_click / pay_success
  session_id TEXT,                    -- 会话ID（同一用户同一次访问）
  source TEXT DEFAULT 'direct',
  meta JSONB                          -- 额外信息
);

-- 开启 RLS（行级安全）但允许匿名插入
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_events ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户插入（前端上报用）
CREATE POLICY "Allow anonymous insert" ON quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON quiz_events FOR INSERT WITH CHECK (true);

-- 允许已认证用户查询（后台面板用）
CREATE POLICY "Allow authenticated select" ON quiz_results FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated select" ON quiz_events FOR SELECT USING (auth.role() = 'authenticated');

-- 索引优化查询
CREATE INDEX idx_quiz_results_created ON quiz_results(created_at);
CREATE INDEX idx_quiz_results_type ON quiz_results(result_type);
CREATE INDEX idx_quiz_events_type ON quiz_events(event_type);
CREATE INDEX idx_quiz_events_created ON quiz_events(created_at);
```

## 第二步：获取 Supabase 凭证

在 Supabase 项目设置 → API 中找到：
- **Project URL**：形如 `https://xxxxx.supabase.co`
- **anon public key**：形如 `eyJhbGci...`（这个可以安全地放在前端）

## 第三步：在测试页面中加入埋点

在你的恋爱测试 HTML/React 页面中，加入 Supabase SDK 并上报数据。
具体代码见 `love-animal-quiz.jsx` 中的 `// ANALYTICS` 注释部分。

## 第四步：部署统计面板

统计面板是一个独立的页面（`quiz-dashboard.jsx`），
部署时需要将 Supabase URL 和 KEY 替换为你的真实凭证。

⚠️ 注意：统计面板使用 anon key 查询数据，
如果你的 RLS 策略设置为仅 authenticated 可读，
则需要在面板中使用 service_role key（不要暴露给用户）
或者将查询策略改为允许 anon SELECT。

简单做法：把统计面板的 RLS 查询策略改为：
```sql
-- 如果你希望面板也用 anon key 访问（面板URL自己知道就好）
DROP POLICY "Allow authenticated select" ON quiz_results;
DROP POLICY "Allow authenticated select" ON quiz_events;
CREATE POLICY "Allow all select" ON quiz_results FOR SELECT USING (true);
CREATE POLICY "Allow all select" ON quiz_events FOR SELECT USING (true);
```
