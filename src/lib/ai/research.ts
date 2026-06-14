import type { Locale } from "@/types";
import type { WorkspaceContextData } from "./WorkspaceAIContext";
import { lookupKnowledge, genericAnswer } from "./knowledge";

const pick = (loc: Locale, en: string, zh: string) => (loc === "zh" ? zh : en);
const list = (xs: string[], n = 3) => xs.slice(0, n).join(", ");

/**
 * Workspace-aware research-partner reply. Uses the open workspace as memory so
 * the user never has to repeat context. This is the offline engine; with an
 * OpenAI key wired through lib/ai/provider these intents become live generation.
 */
export function researchReply(input: string, locale: Locale, ws: WorkspaceContextData | null): string {
  const q = input.toLowerCase();
  const t = ws?.title ?? (locale === "zh" ? "这个主题" : "this topic");

  // No workspace open → fall back to the concept knowledge base.
  if (!ws) return lookupKnowledge(input, locale) ?? genericAnswer(locale);

  // ---- intent: expand a section ----
  if (/expand|elaborate|more detail|深入|展开|详细/.test(q)) {
    const sec = detectSection(q, locale);
    return pick(locale,
      `For "${t}", to deepen the ${sec.en}: (1) add one concrete statistic from the Data Needed section, (2) name the exact mechanism your theory (${list(ws.theories, 1)}) predicts, (3) connect it to a stakeholder who gains and one who loses, and (4) end with a testable implication. Want me to draft that paragraph?`,
      `就「${t}」，要深化${sec.zh}：(1) 从“数据需求”补一个具体数字，(2) 点明你的理论（${list(ws.theories, 1)}）所预测的确切机制，(3) 关联一个获益方与一个受损方，(4) 以一个可检验的含义收尾。要我来起草这段吗？`);
  }
  // ---- intent: stronger / better evidence ----
  if (/stronger evidence|better evidence|more evidence|更强.*证据|更多.*证据|证据/.test(q)) {
    return pick(locale,
      `To strengthen the evidence for "${t}": prefer primary statistics (official agencies) over commentary, and pair each claim with a causal estimate. Check the Data Needed datasets (${list(ws.datasets)}) and the Literature papers (${list(ws.papers, 2)}). The strongest move is a difference-in-differences result around the event date.`,
      `要强化「${t}」的证据：优先用一手统计（官方机构）而非评论，并为每个主张配一个因果估计。查看“数据需求”中的数据集（${list(ws.datasets)}）与文献（${list(ws.papers, 2)}）。最有力的做法是围绕事件时点的双重差分结果。`);
  }
  // ---- intent: Chinese sources ----
  if (/chinese source|china source|中文.*来源|国内.*来源|中国.*数据/.test(q)) {
    return pick(locale,
      `For Chinese-language sources on "${t}", search: 国家统计局 (NBS), 国务院发展研究中心 (DRC), the relevant ministry, CNKI (cnki.net) for academic papers, and 北大法宝 for policy documents. Pair each with the English-language equivalent for triangulation.`,
      `就「${t}」的中文来源，建议检索：国家统计局、国务院发展研究中心、相关主管部委、CNKI（cnki.net）查学术论文、北大法宝查政策文件。每个再配一个英文对应来源以三角互证。`);
  }
  // ---- intent: replace a theory ----
  if (/replace.*theor|swap.*theor|换.*理论|替换.*理论|改用/.test(q)) {
    const newTheory = extractTheory(q) ?? pick(locale, "the new theory", "新理论");
    return pick(locale,
      `Swapping in ${newTheory} for "${t}": I'd update (a) Theory Mapping — its mechanism, strengths/limits and whether it needs a diagram; (b) the matching Integrated Argument's logic chain; and (c) the essay thesis if the new theory changes the predicted direction. Your current lead theory is ${list(ws.theories, 1)} — shall I rewrite the argument chain around ${newTheory}?`,
      `为「${t}」改用${newTheory}：我会更新 (a) 理论映射——其机制、优劣与是否需要图示；(b) 对应整合论证的逻辑链；(c) 若新理论改变预测方向，则更新论文论点。你当前的主理论是 ${list(ws.theories, 1)}——要我围绕${newTheory}重写论证链吗？`);
  }
  // ---- intent: more counterarguments ----
  if (/counter.?argument|counter|rebuttal|反驳|反论|反方/.test(q)) {
    return pick(locale,
      `Three counterarguments to test "${ws.thesis || t}": (1) the competitive-market view — costs pass to the weakest party, not rents; (2) government-failure — the intervention is captured or mis-targeted; (3) dynamic offset — agents adapt and erode the intended effect. For each, state what evidence would confirm it, then rebut with your strongest finding.`,
      `检验「${ws.thesis || t}」的三个反论：(1) 竞争市场观——成本转嫁给最弱方而非租金；(2) 政府失灵——干预被俘获或错配；(3) 动态抵消——主体适应并侵蚀预期效应。对每条说明何种证据能证实它，再用你最有力的发现加以反驳。`);
  }
  // ---- intent: challenge / act as critic ----
  if (/challenge|critic|devil.?s advocate|poke holes|挑战|批判|找问题|质疑/.test(q)) {
    return pick(locale,
      `As a critic of "${t}": Where is your causal identification weakest? You lean on ${list(ws.theories, 1)} — but does its key assumption actually hold here? Your thesis ("${ws.thesis || "—"}") may overstate magnitude; what elasticity would overturn it? And have you priced the strongest counterargument, or just the convenient one?`,
      `作为「${t}」的批评者：你的因果识别最薄弱在哪？你依赖 ${list(ws.theories, 1)}——但其关键假设在此真的成立吗？你的论点（“${ws.thesis || "—"}”）可能高估了量级；什么样的弹性会推翻它？你是否正视了最强的反论，还是只挑了方便回应的那个？`);
  }
  // ---- intent: alternative essay structures ----
  if (/alternative.*structure|essay structure|restructure|three structure|结构|另一种.*结构|不同.*结构/.test(q)) {
    return pick(locale,
      `Three essay structures for "${t}": (A) Efficiency→Equity→Long-run (welfare-first, best for exams); (B) Stakeholder-by-stakeholder (who gains/loses, best for policy mode); (C) Theory-led — one theory per body paragraph with its own evidence (best for NEC/academic). Each maps onto the Integrated Arguments already generated. Which fits your goal?`,
      `「${t}」的三种论文结构：(A) 效率→公平→长期（福利优先，适合考试）；(B) 逐一相关者（谁获益／受损，适合政策模式）；(C) 理论主导——每段一个理论配自有证据（适合 NEC／学术）。每种都能对应已生成的整合论证。你的目标更适合哪种？`);
  }
  // ---- intent: thesis ----
  if (/thesis|research question|论点|研究问题|题目/.test(q)) {
    return pick(locale,
      `A stronger, conditional thesis for "${t}": "${t} improves net welfare only where ${list(ws.theories, 1)} holds and the cost falls on rents rather than the most vulnerable group — an empirical question hinging on the relevant elasticity." Conditional theses score higher because they signal evaluation.`,
      `为「${t}」给出更强的有条件论点：“唯有当 ${list(ws.theories, 1)} 成立、且成本落在租金而非最弱势群体时，「${t}」才提升净福利——这是取决于相关弹性的实证问题。” 有条件论点得分更高，因为它体现了评估。`);
  }
  // ---- concept question fallback (definitions etc.) ----
  const known = lookupKnowledge(input, locale);
  if (known) return known;

  // ---- generic workspace-aware answer ----
  return pick(locale,
    `On "${t}": I have this workspace in context — theories (${list(ws.theories)}), methods (${list(ws.methods)}), and your thesis. Tell me what to do: "expand the theory", "find stronger evidence", "give me Chinese sources", "add counterarguments", "challenge my argument", or "suggest a stronger thesis".`,
    `关于「${t}」：我已掌握该工作台的上下文——理论（${list(ws.theories)}）、方法（${list(ws.methods)}）与你的论点。告诉我要做什么：“深化理论”“找更强证据”“给我中文来源”“补充反论”“挑战我的论证”或“给出更强论点”。`);
}

function detectSection(q: string, _loc: Locale) {
  if (/theor|理论/.test(q)) return { en: "Economic Theory section", zh: "经济理论部分" };
  if (/stakeholder|相关者/.test(q)) return { en: "Stakeholder analysis", zh: "利益相关者分析" };
  if (/evidence|data|证据|数据/.test(q)) return { en: "Evidence / Data section", zh: "证据／数据部分" };
  if (/proposal|policy|方案|政策/.test(q)) return { en: "Proposal section", zh: "方案部分" };
  if (/background|历史|背景/.test(q)) return { en: "Background analysis", zh: "背景分析" };
  if (/labour|labor|劳动/.test(q)) return { en: "labour-market analysis", zh: "劳动力市场分析" };
  return { en: "selected section", zh: "所选部分" };
}

function extractTheory(q: string): string | null {
  const known = ["behavioural economics", "behavioral economics", "human capital", "monopsony", "externalit", "principal-agent", "game theory", "keynesian", "comparative advantage", "市场失灵", "行为经济学", "人力资本", "买方垄断"];
  for (const k of known) if (q.includes(k)) return k;
  return null;
}
