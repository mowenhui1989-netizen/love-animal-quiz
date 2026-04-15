import { useState, useEffect, useCallback } from "react";

// ===== DATA =====
const A = {
  otter: { name: "水獭型恋人", em: "🦦", lang: "身体接触", c: "#5B8FB9", bg: "linear-gradient(135deg,#E8F4FD,#89C4E1)", cb: "#D4EDFC", tag: "牵着你的手 才是完整的我",
    desc: "你就像一只可爱的水獭，总是想和爱的人手牵手。一个温暖的拥抱胜过千言万语，你用拥抱表达思念，用牵手传递安全感。",
    traits: ["天生的拥抱爱好者","牵手是默认模式","喜欢和伴侣腻在一起","用身体语言表达一切"],
    style: "你的爱是有温度的——突然的拥抱、不经意的牵手、靠在肩膀上的瞬间。你需要的很简单：一个随时可以抱抱的人。",
    tip: "记住不是所有人都享受身体接触，学会观察伴侣的舒适边界~",
    deep: {
      comm: "你在沟通中倾向于用肢体语言代替文字表达。开心时会抱抱，难过时需要被拥抱，生气时会用沉默和身体距离来传递信号。这种方式很直觉，但可能让不擅长读取身体语言的伴侣感到困惑。",
      conflict: "冲突发生时，你的第一反应是想通过身体接触来缓和——一个拥抱、握住对方的手。如果对方在生气时拒绝身体接触，你会感到加倍的受伤和不安。",
      security: "你的安全感很大程度来自于身体上的亲近。长时间不见面、没有肢体接触会让你焦虑。你需要的不是24小时黏在一起，而是知道\"我随时可以抱到你\"。",
      intimacy: "你对亲密关系的需求排在所有类型的前列。你享受每一次身体接触带来的连接感，从牵手到拥抱到一起窝在沙发上，这些是你充电的方式。",
      longterm: "长期关系中，你需要持续的身体亲密来维持安全感。随着关系变得日常化，身体接触的减少可能让你误以为爱在消退。建议和伴侣建立\"拥抱仪式\"，比如每天出门前和睡前各一个拥抱。"
    },
    blind: "你最容易忽视的爱语是「肯定的言辞」。你太习惯用行动表达爱，可能忘了对方也需要听到一句\"我爱你\"。试着每天至少说一次真心的赞美~",
    manual: "📋 水獭型恋人使用说明书\n\n✅ 正确打开方式：\n• 多给ta拥抱，出门前、睡觉前、难过时\n• 走路时主动牵手\n• 看电影时靠近一点\n• 分开时发一些拥抱的表情包\n\n❌ 请勿：\n• 生气时推开ta（这比任何话都伤人）\n• 长时间不主动身体接触\n• 在ta想抱抱时说\"别闹了\"\n\n🔋 充电方式：一个长长的拥抱\n⚡ 耗电方式：身体距离 = 心理距离"
    },
  cat: { name: "猫咪型恋人", em: "🐱", lang: "优质时间", c: "#9B72AA", bg: "linear-gradient(135deg,#F5EEFB,#C9A0DC)", cb: "#EEE0F5", tag: "我选择陪在你身边 就是最大的告白",
    desc: "你像一只优雅的猫咪，不轻易付出时间，但一旦选定一个人，就会安静地蜷缩在ta身边。你的爱不张扬却无比珍贵。",
    traits: ["约会时手机永远朝下","在乎陪伴质量而非数量","讨厌被人敷衍","最浪漫是安静待在一起"],
    style: "你的爱是专注的——当你和一个人在一起时，眼里只有ta。平凡日常因为你的全情投入而闪闪发光。",
    tip: "不是所有人都能读懂\"安静陪伴\"的深意，有时候也需要主动把爱说出来~",
    deep: {
      comm: "你的沟通方式是\"在场\"——你觉得最好的交流不一定需要说话，而是两个人安静地待在一起。你会注意到对方的状态变化，但未必会主动开口询问，更多是用陪伴来表达关心。",
      conflict: "发生冲突时，你需要先独处消化情绪，然后再面对面地认真聊。你讨厌在愤怒中说出伤人的话，也讨厌被逼着\"立刻解决\"。给你一点时间和空间，你会带着更清晰的思路回来。",
      security: "你的安全感来自于\"被选择\"的确定性。你不需要对方24小时秒回消息，但你需要知道当ta和你在一起时，注意力完完全全在你身上。",
      intimacy: "你追求的是深度而非频率。比起每天随便聊两句，你更想要每周几次真正有质量的相处。一次深入的对话、一起安静看完一部电影，对你来说比一百条微信更有价值。",
      longterm: "长期关系中，你需要警惕\"各忙各的\"变成\"各过各的\"。你太擅长独处，可能在不知不觉中让关系变得太有距离感。建议每周设定一个固定的\"约会时间\"，哪怕只是一起散步半小时。"
    },
    blind: "你最容易忽视的爱语是「接受礼物」。你觉得陪伴已经足够，可能不太注重仪式感和小惊喜。但偶尔一份小礼物能让关系增添很多乐趣~",
    manual: "📋 猫咪型恋人使用说明书\n\n✅ 正确打开方式：\n• 约会时手机静音，给ta全部注意力\n• 一起做些安静的事：拼图、散步、做饭\n• 认真听ta说话，记住ta分享的细节\n• 给ta独处的空间，然后温柔地回来\n\n❌ 请勿：\n• 陪ta时一直刷手机\n• 用\"随便\"敷衍ta精心安排的计划\n• 在ta需要安静时制造太多噪音\n\n🔋 充电方式：一段不被打扰的二人时光\n⚡ 耗电方式：心不在焉的假性陪伴"
  },
  golden: { name: "金毛型恋人", em: "🐕", lang: "肯定的言辞", c: "#D4915D", bg: "linear-gradient(135deg,#FFF3E8,#F7C28B)", cb: "#FDE8CD", tag: "你是最棒的！说一百遍也不够",
    desc: "你就是恋爱中的金毛犬——热情真诚、毫不吝啬地表达爱意。\"你好好看\"\"我好喜欢你\"每天说一百遍还不够。",
    traits: ["夸夸机器本机","情话张口就来","最爱说你好棒","用文字表达爱无障碍"],
    style: "你的爱是大声说出来的——早安晚安我想你。你相信语言有力量，一句温暖的话能治愈一切。",
    tip: "你的热情是宝贵的！但也要学会\"听\"——对方有时需要的不只是赞美，还有被倾听~",
    deep: {
      comm: "你是最活跃的沟通者——消息秒回、每天说早安晚安、随时分享看到的有趣内容。你觉得表达爱意是理所当然的事，也真心希望对方能同样回应。沉默和冷淡是你最大的敌人。",
      conflict: "冲突中你倾向于\"说出来\"。你需要对方明确表态——一句\"我还是爱你的\"就能让你瞬间放下大半情绪。你最怕冷战，几个小时不说话会让你坐立不安。",
      security: "你的安全感直接来源于语言确认。\"我爱你\"\"你是我最重要的人\"——这些话你永远不会听腻。不是你不自信，而是语言就是你接收爱的频道。",
      intimacy: "你的亲密感建立在频繁的言语互动上。你喜欢和伴侣分享一切——工作的烦恼、路上看到的花、突然想到的一个笑话。对你来说，聊天本身就是一种亲密。",
      longterm: "长期关系中，你需要注意不要让\"夸赞\"变成\"敷衍\"。当\"你好棒\"变成口头禅时，它就失去了力量。试着说出更具体的赞美：\"你今天处理那个问题的方式真的很聪明\"比\"你好棒\"更打动人。"
    },
    blind: "你最容易忽视的爱语是「服务的行动」。你太擅长用嘴表达爱了，有时候忘了对方可能更希望你少说多做。偶尔用行动代替语言，效果可能出乎你意料~",
    manual: "📋 金毛型恋人使用说明书\n\n✅ 正确打开方式：\n• 多说\"我爱你\"\"你好棒\"\"想你了\"\n• 认真夸ta——具体的、真诚的夸\n• 在别人面前表达对ta的欣赏\n• 吵架后第一时间说\"我还是很爱你\"\n\n❌ 请勿：\n• 冷战（这是对金毛最残忍的惩罚）\n• 吝啬表达感情\n• 对ta的热情泼冷水\n\n🔋 充电方式：一句走心的\"我爱你\"\n⚡ 耗电方式：沉默和冷淡"
  },
  deer: { name: "小鹿型恋人", em: "🦌", lang: "服务的行动", c: "#7BAE7F", bg: "linear-gradient(135deg,#EFF8EF,#96D09B)", cb: "#D8F0DA", tag: "我做的一切 都是因为心里有你",
    desc: "你像一只温柔的小鹿，用行动默默守护爱的人。帮ta热早餐、记住ta的喜好——爱都藏在这些细节里。",
    traits: ["记得对方所有小习惯","擅长照顾人","行动派选手","做了比说了重要"],
    style: "你的爱是润物细无声的——ta说随便吃什么你已经订好了ta提过的那家店。你用一千个小行动写着无声情书。",
    tip: "你的付出值得被看见！别忘了告诉对方你的需要，不要一直默默奉献却忘了自己~",
    deep: {
      comm: "你的沟通方式是\"行动大于语言\"。比起说\"我爱你\"，你更喜欢帮ta把水杯续满、外套备好、行程安排妥当。你觉得嘴上说的不算什么，做到了才是真的。这是你的优点，但也可能让对方觉得你\"不善于表达\"。",
      conflict: "冲突时你倾向于用行动来弥补——默默做一顿好吃的、把ta想要的东西买回来。你不太擅长在言语上道歉或解释，更希望对方能\"看到\"你的改变和努力。",
      security: "你的安全感来自于\"被需要\"。当伴侣说\"多亏有你\"\"没有你我怎么办\"时，你会觉得自己在这段关系中是有价值的。但要小心这不要变成一种依赖模式。",
      intimacy: "你通过\"为对方做事\"来建立亲密感。你记得ta的每一个小习惯和偏好，并默默地把生活安排到最舒适的状态。你的爱是一种守护。",
      longterm: "长期关系中，你最大的风险是\"过度付出导致失衡\"。你太擅长照顾别人，可能忘了表达自己的需求。久而久之容易积累委屈。建议每个月和伴侣做一次\"需求对齐\"：说出你希望对方为你做的事。"
    },
    blind: "你最容易忽视的爱语是「肯定的言辞」。你觉得做到了就够了，不需要说出来。但对方可能需要你偶尔把爱说出口——\"我爱你\"三个字有时比做一桌菜更有力量~",
    manual: "📋 小鹿型恋人使用说明书\n\n✅ 正确打开方式：\n• 让ta帮你做事，并且真诚地感谢\n• 注意ta默默为你做的每一件小事\n• 说出\"你为我做了好多，我都看到了\"\n• 主动分担ta的负担，别让ta一个人扛\n\n❌ 请勿：\n• 对ta的付出视若无睹\n• 只动嘴不动手\n• 觉得ta的照顾\"理所当然\"\n\n🔋 充电方式：一句\"多亏有你\"\n⚡ 耗电方式：付出被忽视"
  },
  hedgehog: { name: "刺猬型恋人", em: "🦔", lang: "接受礼物", c: "#C2855A", bg: "linear-gradient(135deg,#FDF5EE,#E0C5A8)", cb: "#F2E4D5", tag: "这个小东西让我想到你",
    desc: "你像一只外刺内柔的小刺猬，对仪式感和小惊喜有特别的执念。不是贪图贵重，而是在乎那份心意。",
    traits: ["仪式感忠实守护者","送礼总能送到心坎","保存有意义的物件","在意被惦记的感觉"],
    style: "你的爱是有形状的——精心挑选的礼物、用心准备的惊喜、记住每个纪念日。你把爱变成可以触摸的美好。",
    tip: "不是所有人都擅长制造惊喜，学会感受那些不那么\"有形\"的爱意~",
    deep: {
      comm: "你的沟通方式很有\"仪式感\"。你会在特别的日子发精心编辑的长消息，送出经过深思熟虑的礼物，用这些有形的东西来表达无形的情感。你觉得爱应该是\"看得见摸得着\"的。",
      conflict: "冲突后你期待一个有仪式感的和好过程——不是简单说声\"对不起\"就完了，而是需要对方用某种方式\"证明\"ta在乎这段关系。可能是一份小礼物、一次精心安排的约会。",
      security: "你的安全感来自于\"被惦记\"。当对方记住了你随口提过的一件小事并付诸行动时，你会觉得被深深地爱着。反之，忘记重要日子会让你非常受伤。",
      intimacy: "你通过交换有意义的\"信物\"来建立亲密感。你珍藏着关系中的每一个纪念品——第一次约会的电影票、对方送的第一件礼物。你的爱情故事是有\"实物档案\"的。",
      longterm: "长期关系中，你需要警惕\"仪式感疲劳\"。不是每个人都能持续制造惊喜，你也需要学会欣赏日常中没有包装的平淡之爱。建议放低期待的门槛——一杯奶茶和一个钻戒一样代表着\"我想到了你\"。"
    },
    blind: "你最容易忽视的爱语是「优质时间」。你太注重\"有形的证据\"，可能忽略了对方安安静静陪你待着这件事本身就是最好的礼物~",
    manual: "📋 刺猬型恋人使用说明书\n\n✅ 正确打开方式：\n• 记住每一个重要的日子\n• 不用贵，但要用心——\"我看到就想到你\"\n• 偶尔制造小惊喜\n• 珍惜ta送你的每一件东西\n\n❌ 请勿：\n• 忘记纪念日（致命伤害）\n• 送敷衍的礼物（比不送更糟）\n• 说\"不就是个节日吗\"\n\n🔋 充电方式：一份\"我看到就想到你\"的小礼物\n⚡ 耗电方式：重要日子被遗忘"
  }
};

const Q = [
  { s: "🌸 周末早晨，你希望和恋人一起度过的方式是？", o: [{ t: "相拥而眠到自然醒，醒来继续抱抱", k: "otter" }, { t: "关掉手机，安安静静一起做早餐", k: "cat" }, { t: "被一句\"早安，今天也好爱你\"叫醒", k: "golden" }, { t: "醒来发现ta做好了最爱的早餐", k: "deer" }] },
  { s: "🌙 加班到很晚回家，最希望恋人怎么做？", o: [{ t: "一进门就给你一个大大的拥抱", k: "otter" }, { t: "准备了热水和夜宵等你回来", k: "deer" }, { t: "安静地坐在你旁边陪你放空", k: "cat" }, { t: "桌上放着写满鼓励的小卡片", k: "hedgehog" }] },
  { s: "☀️ 恋人做了什么让你觉得最被爱？", o: [{ t: "在朋友面前毫不犹豫地夸你", k: "golden" }, { t: "记住你随口提过的东西并买回来", k: "hedgehog" }, { t: "放下所有事专心陪你一个下午", k: "cat" }, { t: "走路时自然地牵起你的手", k: "otter" }] },
  { s: "🌈 发生小矛盾，最期待的和好方式？", o: [{ t: "一个什么都不说的拥抱", k: "otter" }, { t: "ta认真说\"对不起，我不该那样\"", k: "golden" }, { t: "ta默默把之前答应的事做好了", k: "deer" }, { t: "在你桌上放一杯你爱喝的奶茶", k: "hedgehog" }] },
  { s: "🦋 纪念日你最看重什么？", o: [{ t: "一份用心挑选的礼物", k: "hedgehog" }, { t: "一整天不被打扰的二人世界", k: "cat" }, { t: "一封写满甜言蜜语的信", k: "golden" }, { t: "ta主动策划好了所有安排", k: "deer" }] },
  { s: "💫 人多的聚会上，最希望恋人？", o: [{ t: "在别人看不到的地方偷偷握你的手", k: "otter" }, { t: "跟朋友们说\"ta真的超厉害\"", k: "golden" }, { t: "找安静的角落和你聊天", k: "cat" }, { t: "帮你倒水拿吃的把你照顾好", k: "deer" }] },
  { s: "🍰 恋人要出差一周，你最怕？", o: [{ t: "不能抱抱了太难受", k: "otter" }, { t: "视频都没空打感觉被忽略", k: "cat" }, { t: "连\"想你\"都不说一句", k: "golden" }, { t: "走之前连个小礼物都没有", k: "hedgehog" }] },
  { s: "🎠 你觉得最浪漫的约会是？", o: [{ t: "在沙发上窝在一起看电影", k: "otter" }, { t: "ta提前踩点带你去喜欢的店", k: "deer" }, { t: "散步时ta说了好多心里话", k: "golden" }, { t: "ta送了你看很久没舍得买的东西", k: "hedgehog" }] },
  { s: "🪴 下班心情不好时最想要？", o: [{ t: "被抱着不说话就很治愈", k: "otter" }, { t: "ta陪你去走走散心", k: "cat" }, { t: "ta说\"辛苦了，你已经很棒了\"", k: "golden" }, { t: "回家发现ta做了一桌好菜", k: "deer" }] },
  { s: "✨ 哪种行为让你觉得\"不被在意\"？", o: [{ t: "约会时对方一直看手机", k: "cat" }, { t: "过节什么表示都没有", k: "hedgehog" }, { t: "从来不主动说\"爱你\"", k: "golden" }, { t: "生病了只说\"多喝水\"", k: "deer" }] },
  { s: "🎀 恋人给你惊喜，你最期待？", o: [{ t: "一个从背后紧紧的抱抱", k: "otter" }, { t: "偷偷请了假陪你一整天", k: "cat" }, { t: "手写了一封超长的情书", k: "golden" }, { t: "你提过一次就记住了的小东西", k: "hedgehog" }] },
  { s: "🌷 异地恋时最受不了什么？", o: [{ t: "摸不到碰不着太折磨了", k: "otter" }, { t: "各忙各的连交集都没有", k: "cat" }, { t: "对方变得越来越惜字如金", k: "golden" }, { t: "记不住重要的日子和约定", k: "hedgehog" }] },
  { s: "🧸 理想中的日常相处状态？", o: [{ t: "走到哪都牵手搂肩", k: "otter" }, { t: "各做各的事但待在同一空间", k: "cat" }, { t: "每天互相分享日常和感受", k: "golden" }, { t: "ta把你的生活安排得妥妥的", k: "deer" }] },
  { s: "🎵 恋人哪个特质最打动你？", o: [{ t: "温暖的让人想靠近的气场", k: "otter" }, { t: "和你在一起时全神贯注", k: "cat" }, { t: "总能准确说出你想听的话", k: "golden" }, { t: "默默记住你说过的每件小事", k: "hedgehog" }] },
  { s: "💝 只能保留一种恋爱体验？", o: [{ t: "每天睡前一个长长的拥抱", k: "otter" }, { t: "每周一次完全属于两人的约会", k: "cat" }, { t: "每天听到一句真心的\"我爱你\"", k: "golden" }, { t: "每个纪念日都有用心的安排", k: "hedgehog" }] }
];

const MT = { otter: { otter: 85, cat: 55, golden: 95, deer: 75, hedgehog: 65 }, cat: { otter: 55, cat: 80, golden: 70, deer: 90, hedgehog: 75 }, golden: { otter: 95, cat: 70, golden: 85, deer: 65, hedgehog: 90 }, deer: { otter: 75, cat: 90, golden: 65, deer: 80, hedgehog: 70 }, hedgehog: { otter: 65, cat: 75, golden: 90, deer: 70, hedgehog: 80 } };
const F = "'Quicksand',sans-serif";
const MD = {
  otter: {
    otter: { sm:"两只水獭手牵手——最甜蜜的黏人组合！", st:["天然亲密同频，不需要教对方表达爱","身体语言高度一致，一个眼神就知道需要拥抱","安全感互相充电，在一起就是最好的治愈"], rk:["都依赖身体接触，分开时可能双倍焦虑","容易陷入甜蜜泡泡忽略其他沟通方式","需要各自保留独处空间"], dy:"你们的日常充满牵手和依偎。建议享受甜蜜的同时每周留独处时间，也练习用语言表达更深层的想法。", cf:"都想用拥抱解决，很好！但有些问题需要说出来。试着拥抱之后平静地聊聊到底发生了什么。", ri:"增加\"谈心时间\"——每周一个晚上，面对面聊聊内心想法，不只是抱着。"},
    cat: { sm:"水獭想抱抱，猫咪想安静——最大课题是亲密和空间的平衡。", st:["互补性强：水獭教猫咪打开界限，猫咪教水獭享受安静","猫咪主动靠近时那份亲密格外珍贵","帮对方发展不擅长的爱语"], rk:["水獭的亲密需求可能让猫咪窒息","猫咪需要独处可能让水獭觉得被拒绝","想靠近vs想独处容易产生误解"], dy:"建立\"信号系统\"——猫咪说\"我需要30分钟安静，之后来找你抱抱\"，水獭不会觉得被拒绝，猫咪也有了空间。", cf:"水獭想拥抱和好，猫咪需要先冷静。给猫咪20分钟，然后猫咪主动回来用短暂身体接触说\"我准备好了\"。", ri:"\"猫咪主动日\"——每周一天由猫咪发起身体接触，水獭会特别幸福，猫咪也练习了表达亲密。"},
    golden: { sm:"金毛的甜言蜜语+水獭的温暖拥抱=最治愈的恋爱！所有组合中幸福感最高。", st:["金毛说我爱你时水獭抱得更紧，正向循环","都是高表达型，不怕对方猜不到","一个用嘴一个用抱，双重治愈"], rk:["可能太沉浸在甜蜜中忽略实际问题","都渴望高频互动，一方忙碌时另一方双倍落差","需要发展服务和礼物等其他爱语"], dy:"你们会是朋友圈最甜的一对。建议偶尔也为对方做实际的事（做饭、整理），让爱不只停留在甜蜜层面。", cf:"金毛先道歉，水獭一个拥抱化解。但注意不要和好太快导致问题没真正解决。先解决问题，再拥抱庆祝。", ri:"\"每日三件套\"：早上拥抱+中午一条想你消息+晚上一句最想说的话。简单但保鲜。"},
    deer: { sm:"小鹿默默做了很多，但水獭最想要的是一个抱抱——需要学会翻译对方的爱。", st:["小鹿的行动力+水獭的温暖=很有安全感","小鹿照顾生活，水獭给温暖和亲密","一个管心理温度一个管生活温度"], rk:["小鹿忙着照顾可能忘了给拥抱","水獭可能忽视小鹿做的小事背后的爱","小鹿付出感得不到认可会积累委屈"], dy:"小鹿做了一桌饭时，水獭先给一个感谢拥抱再动筷子。水獭想抱时也可以换方式——帮小鹿揉肩，这是小鹿理解的爱。", cf:"小鹿通过不帮忙表达生气，水獭因距离而焦虑。水獭先用轻触说\"我在\"，然后帮小鹿做一件事表示歉意。", ri:"\"交换爱语日\"：每周一天水獭用小鹿的方式爱ta（帮做事），小鹿用水獭的方式爱ta（给拥抱）。"},
    hedgehog: { sm:"刺猬在意仪式感，水獭在意身体温度——爱在不同频道上，需要调频。", st:["纪念日拥抱+小礼物，幸福感翻倍","刺猬精心礼物让水獭感到被惦记","都在乎爱的证据，只是形式不同"], rk:["水獭想拥抱时刺猬在想今天是什么日子","刺猬在乎纪念日，水獭觉得每天都一样甜","仪式感需求被忽视会很受伤"], dy:"水獭学会记日子，哪怕带朵花；刺猬学会拥抱也是礼物。可以把身体接触和仪式感结合——每个纪念日创造专属拥抱仪式。", cf:"刺猬想看到表示，水獭想抱一下。结合：水獭写小卡片然后拥抱着递给刺猬，同时满足两人。", ri:"\"每月惊喜日\"：轮流准备，可以是水獭式的（特别的拥抱/按摩）或刺猬式的（用心小礼物）。"}
  },
  cat: {
    cat: { sm:"两只猫咪安静在一起——最有品质的沉默，但小心沉默变疏远。", st:["彼此尊重独处需求，不觉得对方冷漠","注意力高度集中，相处质量极高","享受深度对话，不需要无效社交"], rk:["都不主动，可能陷入平行生活","缺少外向表达，感情温水煮青蛙","都不开口导致问题积压"], dy:"安静相处很舒服，但需要刻意增加互动。每天至少主动分享一次，不要让各做各的变成默认。", cf:"都倾向冷处理，小矛盾可能拖成冷战。规则：24小时内开始对话，哪怕只说\"我还在消化但没走开\"。", ri:"每周\"深度约会\"：放下手机面对面聊一个半小时，用问题卡牌引导。"},
    golden: { sm:"猫咪安静+金毛热情=有趣互补。金毛活跃气氛，猫咪提供深度。", st:["金毛的热情能融化猫咪的矜持","猫咪的专注让金毛觉得被真正看到","互相拓展舒适区"], rk:["金毛觉得猫咪不够热情，猫咪觉得金毛太吵","金毛要频繁互动，猫咪要安静空间","节奏不同产生摩擦"], dy:"金毛要学会享受沉默的甜蜜——猫咪在你身边就是在说我爱你。猫咪偶尔回应热情——一句你也很棒够让金毛开心一天。", cf:"金毛想马上说清楚，猫咪想先安静。方案：给猫咪半小时，猫咪承诺半小时后回来聊。金毛不觉得被忽略，猫咪有缓冲。", ri:"每晚睡前互说一件今天对方让你感到被爱的事。帮金毛看到非语言的爱，帮猫咪练习表达。"},
    deer: { sm:"小鹿贴心服务+猫咪优质陪伴=最温柔的岁月静好组合！", st:["小鹿照顾生活，猫咪给全心陪伴","相处不吵不闹非常舒服","互相用对方需要的方式表达爱"], rk:["都不擅长说感受，情绪可能积压","太安静可能缺少激情","小鹿总付出，猫咪可能习以为常"], dy:"猫咪经常告诉小鹿\"你做的每件事我都看到了谢谢\"。小鹿也接受猫咪的陪伴就是最好的回报。", cf:"小鹿默默做事补偿，猫咪安静消化。设立每周check-in：有没有不开心的？想要的？", ri:"每周一起完成一个项目：做饭、拼图、园艺。小鹿享受为你服务，猫咪享受和你在一起。"},
    hedgehog: { sm:"猫咪用时间表达爱，刺猬用礼物——学会欣赏不同的爱的包装方式。", st:["刺猬精心礼物让猫咪感到被在乎","猫咪全神贯注让刺猬觉得自己特别","都在乎质量而非数量"], rk:["猫咪可能不太注重纪念日让刺猬失望","刺猬仪式感可能打断猫咪的安静节奏","爱语不被理解会觉得对方不在乎"], dy:"猫咪记得重要日子，哪怕安安静静过也要有仪式。刺猬理解猫咪给你的安静时光就等于一份礼物。", cf:"刺猬想要和好表示，猫咪觉得陪着就是诚意。折中：猫咪准备小东西递给刺猬，然后安静陪着。", ri:"每月纪念日由刺猬备礼物，然后两人度过不被打扰的时光。满足双方核心需求。"}
  },
  golden: {
    golden: { sm:"两只金毛——全世界最甜蜜最外放的组合！朋友圈齁甜到让人想屏蔽。", st:["互相夸赞不停歇，正能量爆棚","沟通零障碍什么都说出来","吵架也和好最快——都憋不住"], rk:["可能说得多做得少","都需要被夸，一方疲惫可能断供","沉浸在语言甜蜜里忽略实际行动"], dy:"你们最不缺甜蜜。建议每天除了我爱你之外，也为对方做一件实事——行动+语言才是最牢固的爱。", cf:"吵架时都很能说，注意不要说伤人的话。规则：可以说\"我很不开心\"但不攻击对方人格。", ri:"\"具体夸赞\"挑战：每天的我爱你改成一句具体赞美。\"你今天方案写得好有逻辑\"比\"你好棒\"更有营养。"},
    deer: { sm:"金毛说你好棒，小鹿默默做好——爱在不同频道上，需要互相调频。", st:["金毛的赞美是小鹿最需要的被看到","小鹿的行动给金毛安全感","金毛看到小鹿付出并说出来，关系会非常稳固"], rk:["金毛觉得小鹿不会说情话，小鹿觉得金毛只说不做","小鹿付出得不到言语肯定会委屈","节奏差异：金毛要即时反馈，小鹿是长期型"], dy:"金毛每天至少说一次\"你做的XX让我好感动\"——小鹿的充电方式。小鹿偶尔发条\"想你了\"——金毛需要听到。", cf:"金毛想听道歉，小鹿想用行动弥补。小鹿先说一句简单对不起，然后用行动证明。金毛要学会看到行动背后的歉意。", ri:"每天晚上互说一件注意到对方为自己做的事。帮金毛看到行动，帮小鹿听到被认可。"},
    hedgehog: { sm:"金毛甜言蜜语+刺猬仪式感=浪漫电影般的恋爱！恋爱氛围最强组合。", st:["金毛写情书刺猬备礼物——浪漫值拉满","都在乎爱的表达，形式不同而已","纪念日对两人都是大事"], rk:["都在乎表达形式，可能忽略过日子能力","金毛只说不送会让刺猬失望","需要在浪漫之余也关注实际"], dy:"你们的日常很有内容——情话+礼物+惊喜。在浪漫之余也分配精力在家务分工和财务规划上。", cf:"金毛道歉靠说，刺猬想看行动证据。最佳：金毛写道歉卡片（有形物品满足刺猬）附上真心话（满足金毛表达欲）。", ri:"每月\"双重浪漫日\"：一人写信/录语音，一人备礼物/安排惊喜，然后交换。"}
  },
  deer: {
    deer: { sm:"两只小鹿默默为对方做一切——最务实组合，但小心爱变成互相照顾少了心动。", st:["生活上默契配合照顾妥当","都是行动派遇到问题直接解决","安全感很强——知道对方会用行动证明"], rk:["都不善表达，做了但不说","可能更像室友而非恋人","双方付出方向可能不是对方最需要的"], dy:"你们的日常有序舒适但缺心动感。每天至少一次把爱说出来——\"有你在真好\"\"今天饭好好吃谢谢\"。", cf:"都用做事弥补过错，可能都在默默做事没人开口说问题。规则：先用5分钟说清楚，再用行动解决。", ri:"每月\"偷懒日\"：不做家务不做饭叫外卖窝沙发，让关系不只有照顾还有放松。"},
    hedgehog: { sm:"小鹿用行动爱人，刺猬在意仪式——小鹿做了很多但可能没有仪式包装。", st:["小鹿行动力能把纪念日安排妥当","刺猬教会小鹿爱需要仪式感","结合得好就是又实在又浪漫"], rk:["小鹿做了一桌饭没蜡烛，刺猬觉得少氛围","刺猬送礼但没帮分担家务，小鹿觉得中看不中用","爱的表达差异需要大量沟通"], dy:"小鹿做事时加包装——做饭点蜡烛、整理东西附便利贴。刺猬也帮做实际的事——双方都觉得被在乎。", cf:"小鹿想做事弥补，刺猬想看到表示。折中：小鹿做弥补事+附小东西（哪怕路边的花）。", ri:"\"包装升级日\"：小鹿每件事加包装（便利贴/卡片），刺猬每份礼物配一张\"帮你做XX\"承诺券。"}
  },
  hedgehog: {
    hedgehog: { sm:"两只刺猬——仪式感拉满！纪念日清单比谁都长，浪漫但别让期待变压力。", st:["关系永远不缺仪式感和惊喜","两人都重视纪念日不会有被遗忘的失落","互送礼物是甜蜜又有趣的爱的竞赛"], rk:["双方期待都很高，达不到加倍失望","形式上花太多精力忽略日常相处质量","送礼变成压力而非快乐"], dy:"你们最不缺浪漫。在礼物惊喜之外也发展不花钱的爱——拥抱、对话、帮对方做事。让表达更多元。", cf:"都在等对方表示可能陷入僵局。规则：24小时内不管谁对谁错，各准备一个小东西表示在乎。", ri:"每月一次\"无礼物约会\"：不准带任何礼物，只能用其他方式表达爱——言语、陪伴、行动、接触。"}
  }
};
Object.keys(MD).forEach(x=>Object.keys(MD[x]).forEach(y=>{if(!MD[y])MD[y]={};if(!MD[y][x])MD[y][x]=MD[x][y];}));
const PRICE = "9.9"; const COUPLE_PRICE = "19.9";

// ===== Locked overlay =====
function Locked({ onUnlock, label = "解锁完整报告" }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none", opacity: 0.5 }}>
        <div style={{ padding: "16px", background: "rgba(255,255,255,0.4)", borderRadius: 14 }}>
          <p style={{ fontSize: 13, color: "#999", lineHeight: 2 }}>
            你在沟通中倾向于用独特的方式表达情感。在冲突中你有自己的处理模式，需要特定的方式来获得安全感。你的亲密需求和长期关系中的表现都有独特的模式值得深入了解...
          </p>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.3)", borderRadius: 14, backdropFilter: "blur(2px)" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: "#4A3040", marginBottom: 10 }}>{label}</p>
        <button onClick={onUnlock} style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#FFF", background: "linear-gradient(135deg,#FF8FAB,#FF6B8A)", border: "none", borderRadius: 50, padding: "10px 28px", cursor: "pointer", boxShadow: "0 3px 12px rgba(255,107,138,0.3)" }}>
          ¥{PRICE} 立即解锁
        </button>
      </div>
    </div>
  );
}

// ===== Payment Modal =====
function PayModal({ onClose, onPay, type = "single" }) {
  const isSingle = type === "single";
  const price = isSingle ? PRICE : COUPLE_PRICE;
  const items = isSingle
    ? ["五维深度性格分析", "爱语盲区诊断", "情侣匹配详细报告", "恋爱使用说明书（可转发给ta）"]
    : ["两人各自的完整深度报告", "双人爱语契合度详细分析", "专属相处建议与冲突预警", "两份恋爱使用说明书"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 18 }} onClick={onClose}>
      <div style={{ background: "#FFF", borderRadius: 24, padding: "28px 22px", maxWidth: 360, width: "100%", textAlign: "center", fontFamily: F }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 40, marginBottom: 4 }}>✨</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#4A3040", marginBottom: 4 }}>
          {isSingle ? "解锁你的完整恋爱报告" : "解锁情侣深度报告"}
        </h3>
        <p style={{ fontSize: 13, color: "#8A7080", marginBottom: 16 }}>
          {isSingle ? "比免费版深入 5 倍的自我认知" : "深入了解你们的爱语匹配"}
        </p>
        <div style={{ background: "#FFF5F7", borderRadius: 14, padding: "14px 16px", textAlign: "left", marginBottom: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < items.length - 1 ? 8 : 0 }}>
              <span style={{ color: "#FF6B8A", fontSize: 14 }}>✓</span>
              <span style={{ fontSize: 13, color: "#4A3040" }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: "#B8A0B0", textDecoration: "line-through", marginRight: 8 }}>¥{isSingle ? "29.9" : "49.9"}</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#FF6B8A" }}>¥{price}</span>
          <span style={{ fontSize: 12, color: "#FF6B8A", marginLeft: 4 }}>限时优惠</span>
        </div>

        <button onClick={onPay} style={{ width: "100%", fontFamily: F, fontSize: 17, fontWeight: 700, color: "#FFF", background: "linear-gradient(135deg,#FF8FAB,#FF6B8A)", border: "none", borderRadius: 50, padding: "14px 0", cursor: "pointer", boxShadow: "0 4px 16px rgba(255,107,138,0.35)", marginBottom: 10 }}>
          立即解锁 ¥{price}
        </button>
        <p style={{ fontSize: 11, color: "#CCC" }}>
          安全支付 · 购买后永久查看
        </p>
      </div>
    </div>
  );
}

// ===== Deep Report (unlocked) =====
function DeepReport({ a, animal }) {
  const labels = { comm: "💬 沟通方式", conflict: "⚡ 冲突处理", security: "🛡️ 安全感来源", intimacy: "💕 亲密需求", longterm: "🔮 长期关系" };
  return (
    <div>
      {Object.entries(labels).map(([k, label]) => (
        <div key={k} style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: animal.c, marginBottom: 4 }}>{label}</p>
          <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.85 }}>{a.deep[k]}</p>
        </div>
      ))}
      <div style={{ background: "#FFF5F7", borderRadius: 12, padding: 14, marginBottom: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#FF6B8A", marginBottom: 4 }}>🎯 你的爱语盲区</p>
        <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.85 }}>{a.blind}</p>
      </div>
      <div style={{ background: animal.cb + "60", borderRadius: 12, padding: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: animal.c, marginBottom: 6 }}>📋 恋爱使用说明书</p>
        <pre style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: F, margin: 0 }}>{a.manual}</pre>
      </div>
    </div>
  );
}

// ===== ANALYTICS =====
// 🔧 Replace with your Supabase credentials to enable tracking
const SB_URL = "https://qsafjrwbduuipupudfve.supabase.co";
const SB_KEY = "sb_publishable_yvZqcbFMGJuHJ4zPZBEcXA_VFjk6x7U";
const TRACKING_ENABLED = true; // Set true after configuring Supabase

const sessionId = "s_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const getSource = () => {
  try {
    const u = new URL(window.location.href);
    return u.searchParams.get("src") || u.searchParams.get("utm_source") || "direct";
  } catch { return "direct"; }
};

function track(eventType, meta = {}) {
  if (!TRACKING_ENABLED) return;
  fetch(`${SB_URL}/rest/v1/quiz_events`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    body: JSON.stringify({ event_type: eventType, session_id: sessionId, source: getSource(), meta })
  }).catch(() => {});
}

function trackResult(resultType, scores, shared = false) {
  if (!TRACKING_ENABLED) return;
  fetch(`${SB_URL}/rest/v1/quiz_results`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    body: JSON.stringify({ result_type: resultType, scores, shared, source: getSource(), user_agent: navigator.userAgent })
  }).catch(() => {});
}

// ===== MAIN APP =====
export default function App() {
  const [scr, setScr] = useState("start");
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState({});
  const [res, setRes] = useState(null);
  const [scores, setScores] = useState(null);
  const [anim, setAnim] = useState(false);
  const [show, setShow] = useState(false);
  const [partner, setPartner] = useState(null);
  const [mr, setMr] = useState(null);
  const [sImg, setSImg] = useState(null);
  const [paid, setPaid] = useState(false);
  const [payModal, setPayModal] = useState(null); // "single" | "couple" | null

  useEffect(() => { setTimeout(() => setShow(true), 150); }, [scr]);
  useEffect(() => { track("page_view"); }, []); // Track page view on mount

  const restart = () => { setScr("start"); setQi(0); setAns({}); setRes(null); setScores(null); setShow(false); setPartner(null); setMr(null); setSImg(null); setPaid(false); setPayModal(null); };
  const startQ = () => { track("start_quiz"); setScr("quiz"); setQi(0); setAns({}); setShow(false); };

  const pick = (k) => {
    if (anim) return;
    setAnim(true);
    const na = { ...ans, [qi]: k };
    setAns(na);
    setTimeout(() => {
      if (qi < Q.length - 1) { setQi(qi + 1); }
      else {
        const sc = { otter: 0, cat: 0, golden: 0, deer: 0, hedgehog: 0 };
        Object.values(na).forEach(t => sc[t]++);
        setRes(Object.entries(sc).sort((a, b) => b[1] - a[1])[0][0]);
        setScores(sc); setScr("result"); setShow(false);
        // Track completion
        const resultType = Object.entries(sc).sort((a, b) => b[1] - a[1])[0][0];
        track("complete_quiz", { result_type: resultType });
        trackResult(resultType, sc);
      }
      setAnim(false);
    }, 300);
  };

  const doMatch = (pk) => {
    if (!paid) { track("pay_click"); setPayModal("couple"); return; }
    setPartner(pk);
    const sc = MT[res][pk];
    const lv = sc >= 90 ? "天生一对 💕" : sc >= 80 ? "甜蜜搭档 💗" : sc >= 70 ? "有趣组合 💛" : sc >= 60 ? "需要磨合 🧡" : "挑战模式 💪";
    const cm = sc >= 90 ? "爱语完美互补，令人羡慕！" : sc >= 80 ? "契合度很高，相处很舒服~" : sc >= 70 ? "有差异也有互补，越来越好！" : sc >= 60 ? "表达爱的方式不同，多沟通~" : "差异大，但理解爱语后有惊喜！";
    const deep = MD[res] && MD[res][pk] ? MD[res][pk] : null;
    setMr({ sc, lv, cm, deep });
  };

  const handlePay = () => {
    // TODO: 接入真实支付（微信支付/支付宝）
    // 这里模拟支付成功
    track("pay_success");
    setPaid(true);
    setPayModal(null);
  };

  const genShare = useCallback(() => {
    if (!res) return;
    track("share", { paid, has_match: !!mr });
    const a = A[res], W = 640, PAD = 40, INN = 50;
    const colMap = { otter: ["#E8F4FD", "#B6DCF0"], cat: ["#F5EEFB", "#DFC5EE"], golden: ["#FFF3E8", "#FDDCB5"], deer: ["#EFF8EF", "#C5E6C8"], hedgehog: ["#FDF5EE", "#F0DCC9"] };

    // Helper: wrap text and return lines
    const wrapT = (cx, text, mw) => { let lines = [], cur = ""; for (const ch of text) { if (cx.measureText(cur + ch).width > mw) { lines.push(cur); cur = ch; } else cur += ch; } if (cur) lines.push(cur); return lines; };

    // Helper: draw gradient bg on a canvas
    const drawBg = (cx, w, h) => { const g = cx.createLinearGradient(0, 0, w, h); g.addColorStop(0, colMap[res][0]); g.addColorStop(1, colMap[res][1]); cx.fillStyle = g; cx.beginPath(); cx.roundRect(0, 0, w, h, 24); cx.fill(); cx.fillStyle = "rgba(255,255,255,0.15)"; cx.beginPath(); cx.arc(w - 80, 60, 80, 0, Math.PI * 2); cx.fill(); cx.beginPath(); cx.arc(70, h - 60, 50, 0, Math.PI * 2); cx.fill(); };

    // Helper: draw section box, returns new y
    const drawBox = (cx, y, title, titleColor, content, w) => {
      const cLines = wrapT(cx, content, w - PAD * 2 - 30);
      const boxH = 36 + cLines.length * 26 + 16;
      cx.fillStyle = "rgba(255,255,255,0.5)"; cx.beginPath(); cx.roundRect(PAD, y, w - PAD * 2, boxH, 14); cx.fill();
      cx.fillStyle = titleColor; cx.font = "bold 18px sans-serif"; cx.textAlign = "left";
      cx.fillText(title, PAD + 16, y + 28);
      cx.fillStyle = "#4A3040"; cx.font = "15px sans-serif";
      cLines.forEach((l, i) => cx.fillText(l, PAD + 16, y + 54 + i * 26));
      return y + boxH + 12;
    };

    // Helper: draw list box
    const drawListBox = (cx, y, title, titleColor, items, icon, w) => {
      let totalH = 36;
      const allLines = items.map(item => { const ls = wrapT(cx, item, w - PAD * 2 - 46); totalH += ls.length * 24 + 6; return ls; });
      totalH += 10;
      cx.fillStyle = "rgba(255,255,255,0.5)"; cx.beginPath(); cx.roundRect(PAD, y, w - PAD * 2, totalH, 14); cx.fill();
      cx.fillStyle = titleColor; cx.font = "bold 18px sans-serif"; cx.textAlign = "left";
      cx.fillText(title, PAD + 16, y + 28);
      let ly = y + 50;
      allLines.forEach(ls => { cx.fillStyle = titleColor; cx.font = "14px sans-serif"; cx.fillText(icon, PAD + 16, ly); cx.fillStyle = "#4A3040"; cx.font = "15px sans-serif"; ls.forEach((l, i) => { cx.fillText(l, PAD + 32, ly + i * 24); }); ly += ls.length * 24 + 6; });
      return y + totalH + 12;
    };

    const pages = [];

    // ===== PAGE 1: Basic Result (same as before) =====
    const cv1 = document.createElement("canvas"); cv1.width = W; cv1.height = 860;
    const c1 = cv1.getContext("2d"); drawBg(c1, W, 860);
    c1.textAlign = "center"; c1.fillStyle = "#4A3040"; c1.font = "bold 28px sans-serif";
    c1.fillText("我的恋爱动物人格", W / 2, 50);
    c1.font = "60px serif"; c1.fillText(a.em, W / 2, 135);
    c1.fillStyle = a.c; c1.font = "bold 34px sans-serif"; c1.fillText(a.name, W / 2, 190);
    c1.fillStyle = "#8A7080"; c1.font = "18px sans-serif"; c1.fillText("「" + a.tag + "」", W / 2, 225);
    c1.fillStyle = a.c; c1.font = "bold 19px sans-serif"; c1.fillText("核心爱语：" + a.lang, W / 2, 262);
    // desc box
    c1.fillStyle = "rgba(255,255,255,0.5)"; c1.beginPath(); c1.roundRect(PAD, 285, W - PAD * 2, 160, 14); c1.fill();
    c1.fillStyle = "#4A3040"; c1.font = "16px sans-serif"; c1.textAlign = "left";
    const dLines = wrapT(c1, a.desc, W - PAD * 2 - 30);
    dLines.forEach((l, i) => c1.fillText(l, INN, 315 + i * 26));
    // traits box
    c1.fillStyle = "rgba(255,255,255,0.5)"; c1.beginPath(); c1.roundRect(PAD, 465, W - PAD * 2, 145, 14); c1.fill();
    c1.fillStyle = "#4A3040"; c1.font = "bold 19px sans-serif"; c1.textAlign = "center";
    c1.fillText("恋爱特征", W / 2, 498); c1.font = "15px sans-serif";
    a.traits.forEach((t, i) => c1.fillText("✦ " + t, W / 2, 528 + i * 26));
    // love style
    c1.fillStyle = "rgba(255,255,255,0.5)"; c1.beginPath(); c1.roundRect(PAD, 630, W - PAD * 2, 100, 14); c1.fill();
    c1.fillStyle = a.c; c1.font = "bold 17px sans-serif"; c1.textAlign = "left"; c1.fillText("💕 你的恋爱方式", INN, 658);
    c1.fillStyle = "#4A3040"; c1.font = "14px sans-serif";
    wrapT(c1, a.style, W - PAD * 2 - 30).forEach((l, i) => c1.fillText(l, INN, 682 + i * 22));
    // footer
    c1.fillStyle = paid ? "#FF6B8A" : "#B8A0B0"; c1.font = "bold 15px sans-serif"; c1.textAlign = "center";
    c1.fillText(paid ? "👑 完整报告 · 向左滑动查看更多" : "扫码测测你是哪种恋爱动物", W / 2, 800);
    c1.fillStyle = "#B8A0B0"; c1.font = "14px sans-serif";
    c1.fillText("恋爱动物人格测试 ♡", W / 2, 828);
    pages.push(cv1);

    // ===== PAGE 2: Deep Report (paid only) =====
    if (paid) {
      const labels = [["💬 沟通方式", "#5B8FB9", a.deep.comm], ["⚡ 冲突处理", "#E07050", a.deep.conflict], ["🛡️ 安全感来源", "#7BAE7F", a.deep.security], ["💕 亲密需求", "#9B72AA", a.deep.intimacy], ["🔮 长期关系", "#D4915D", a.deep.longterm]];
      // calculate height
      const tempCv = document.createElement("canvas"); tempCv.width = W; const tempCx = tempCv.getContext("2d"); tempCx.font = "15px sans-serif";
      let estH = 90;
      labels.forEach(([, , txt]) => { const ls = wrapT(tempCx, txt, W - PAD * 2 - 30); estH += 36 + ls.length * 26 + 28; });
      // blind spot
      const blindLines = wrapT(tempCx, a.blind, W - PAD * 2 - 30);
      estH += 36 + blindLines.length * 26 + 28 + 60;

      const cv2 = document.createElement("canvas"); cv2.width = W; cv2.height = Math.max(estH, 600);
      const c2 = cv2.getContext("2d"); drawBg(c2, W, cv2.height);
      c2.textAlign = "center"; c2.fillStyle = "#4A3040"; c2.font = "bold 26px sans-serif";
      c2.fillText("👑 五维深度性格分析", W / 2, 45);
      c2.fillStyle = "#8A7080"; c2.font = "15px sans-serif";
      c2.fillText(a.name + " · " + a.lang, W / 2, 72);

      let y2 = 95;
      labels.forEach(([title, color, txt]) => { c2.font = "15px sans-serif"; y2 = drawBox(c2, y2, title, color, txt, W); });

      // blind spot
      c2.font = "15px sans-serif";
      y2 = drawBox(c2, y2, "🎯 你的爱语盲区", "#FF6B8A", a.blind, W);

      c2.fillStyle = "#B8A0B0"; c2.font = "14px sans-serif"; c2.textAlign = "center";
      c2.fillText("恋爱动物人格测试 · 完整报告 ♡", W / 2, cv2.height - 20);
      pages.push(cv2);
    }

    // ===== PAGE 3: Couple Match (paid + has match) =====
    if (paid && mr && mr.deep && partner) {
      const pa = A[partner], md = mr.deep;
      const tempCv = document.createElement("canvas"); tempCv.width = W; const tempCx = tempCv.getContext("2d"); tempCx.font = "15px sans-serif";
      let estH = 200;
      [md.sm, md.dy, md.cf, md.ri].forEach(txt => { estH += 36 + wrapT(tempCx, txt, W - PAD * 2 - 30).length * 26 + 28; });
      md.st.forEach(s => estH += wrapT(tempCx, s, W - PAD * 2 - 46).length * 24 + 6);
      md.rk.forEach(r => estH += wrapT(tempCx, r, W - PAD * 2 - 46).length * 24 + 6);
      estH += 160;

      const cv3 = document.createElement("canvas"); cv3.width = W; cv3.height = Math.max(estH, 700);
      const c3 = cv3.getContext("2d");
      // mixed gradient
      const g3 = c3.createLinearGradient(0, 0, W, cv3.height); g3.addColorStop(0, colMap[res][0]); g3.addColorStop(1, colMap[partner] ? colMap[partner][1] : colMap[res][1]);
      c3.fillStyle = g3; c3.beginPath(); c3.roundRect(0, 0, W, cv3.height, 24); c3.fill();
      c3.fillStyle = "rgba(255,255,255,0.12)"; c3.beginPath(); c3.arc(W - 70, 50, 70, 0, Math.PI * 2); c3.fill();

      c3.textAlign = "center"; c3.fillStyle = "#4A3040"; c3.font = "bold 24px sans-serif";
      c3.fillText("💑 情侣匹配深度报告", W / 2, 42);
      c3.font = "40px serif"; c3.fillText(a.em + " × " + pa.em, W / 2, 95);
      c3.fillStyle = a.c; c3.font = "bold 18px sans-serif"; c3.fillText(a.name.replace("型恋人",""), W / 2 - 60, 125);
      c3.fillStyle = pa.c; c3.fillText(pa.name.replace("型恋人",""), W / 2 + 60, 125);
      // score
      c3.fillStyle = "rgba(255,255,255,0.6)"; c3.beginPath(); c3.roundRect(W / 2 - 80, 140, 160, 50, 12); c3.fill();
      c3.fillStyle = "#FF6B8A"; c3.font = "bold 28px sans-serif"; c3.fillText(mr.sc + "%", W / 2 - 15, 173);
      c3.fillStyle = "#4A3040"; c3.font = "bold 15px sans-serif"; c3.fillText(mr.lv.replace(/\s*[💕💗💛🧡💪]/g, ""), W / 2 + 40, 173);

      let y3 = 210;
      c3.font = "15px sans-serif";
      y3 = drawBox(c3, y3, "📖 你们的故事", "#4A3040", md.sm, W);
      y3 = drawListBox(c3, y3, "💚 你们的优势", "#5A9E5A", md.st, "✓", W);
      y3 = drawListBox(c3, y3, "⚠️ 潜在冲突预警", "#E07050", md.rk, "!", W);
      y3 = drawBox(c3, y3, "🏠 日常相处建议", "#D4915D", md.dy, W);
      y3 = drawBox(c3, y3, "⚡ 吵架和好指南", "#9B72AA", md.cf, W);
      y3 = drawBox(c3, y3, "💡 专属恋爱仪式", "#FF6B8A", md.ri, W);

      c3.fillStyle = "#B8A0B0"; c3.font = "14px sans-serif"; c3.textAlign = "center";
      c3.fillText("恋爱动物人格测试 · 情侣匹配报告 ♡", W / 2, cv3.height - 20);
      pages.push(cv3);
    }

    // Combine all pages vertically into one image
    const totalH = pages.reduce((s, c) => s + c.height + 20, -20);
    const finalCv = document.createElement("canvas"); finalCv.width = W; finalCv.height = totalH;
    const fc = finalCv.getContext("2d");
    fc.fillStyle = "#F8F0F4"; fc.fillRect(0, 0, W, totalH);
    let offsetY = 0;
    pages.forEach((p, i) => { fc.drawImage(p, 0, offsetY); offsetY += p.height + 20; });

    setSImg(finalCv.toDataURL("image/png"));
  }, [res, paid, mr, partner, scores]);

  const bg0 = "linear-gradient(160deg,#FFF5F7,#FFE8ED 40%,#F5E6FF 70%,#E8F4FD)";
  const wrap = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" };

  // ===== START =====
  if (scr === "start") return (
    <div style={{ ...wrap, background: bg0, justifyContent: "center", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center", fontFamily: F, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(25px)", transition: "all 0.6s ease", zIndex: 1 }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🦦🐱🐕🦌🦔</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#4A3040", marginBottom: 8 }}>你是哪种恋爱动物？</h1>
        <p style={{ fontSize: 15, color: "#8A7080", lineHeight: 1.6, marginBottom: 6 }}>基于「爱的五种语言」理论<br />15 道情景题，找到你的恋爱人格</p>
        <p style={{ fontSize: 13, color: "#B8A0B0", marginBottom: 10 }}>约需 2-3 分钟</p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {["基础结果免费", "深度报告¥9.9", "情侣套餐¥19.9"].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: "#FF6B8A", background: "#FFF0F3", borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <button onClick={startQ} style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#FFF", background: "linear-gradient(135deg,#FF8FAB,#FF6B8A)", border: "none", borderRadius: 50, padding: "14px 48px", cursor: "pointer", boxShadow: "0 5px 20px rgba(255,107,138,0.35)" }}>
          开始测试 ✨
        </button>
      </div>
    </div>
  );

  // ===== QUIZ =====
  if (scr === "quiz") {
    const q = Q[qi], pct = Math.round((qi + 1) / Q.length * 100);
    return (
      <div style={{ ...wrap, background: bg0, padding: "28px 16px" }}>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ width: "100%", maxWidth: 400, zIndex: 1, fontFamily: F }}>
          <div style={{ maxWidth: 340, margin: "0 auto 18px", padding: "0 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#999", marginBottom: 5 }}>
              <span>第 {qi + 1}/{Q.length} 题</span><span>{pct}%</span>
            </div>
            <div style={{ height: 7, background: "#F0E6F0", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg,#FFB6C1,#FF8FAB)", borderRadius: 8, transition: "width 0.4s ease" }} />
            </div>
          </div>
          <div style={{ opacity: anim ? 0 : 1, transform: anim ? "translateX(-30px)" : "none", transition: "all 0.25s ease" }}>
            <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 20, padding: "22px 18px", boxShadow: "0 4px 20px rgba(180,140,180,0.08)", marginBottom: 12, textAlign: "center" }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#4A3040", lineHeight: 1.6 }}>{q.s}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.o.map((o, i) => (
                <button key={i} onClick={() => pick(o.k)} style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: "#4A3040", background: "rgba(255,255,255,0.8)", border: "2px solid transparent", borderRadius: 13, padding: "12px 15px", textAlign: "left", cursor: "pointer", transition: "all 0.2s ease", lineHeight: 1.5 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFB6C1"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; }}>
                  {["A", "B", "C", "D"][i]}. {o.t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULT =====
  const a = A[res], tot = Object.values(scores).reduce((x, y) => x + y, 0);
  const sorted = Object.entries(scores).sort((x, y) => y[1] - x[1]).filter(([, v]) => v > 0);

  return (
    <div style={{ ...wrap, background: a.bg, padding: "28px 16px 50px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: 400, zIndex: 1, fontFamily: F, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(25px)", transition: "all 0.6s ease" }}>

        {/* ===== FREE: Basic Result ===== */}
        <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 24, padding: "26px 20px", boxShadow: `0 8px 30px ${a.c}18`, textAlign: "center", marginBottom: 16 }}>
          <div style={{ display: "inline-block", background: "#E8FFE8", borderRadius: 20, padding: "3px 14px", fontSize: 11, color: "#5A9E5A", fontWeight: 600, marginBottom: 10 }}>🆓 免费结果</div>
          <div style={{ fontSize: 64, marginBottom: 4 }}>{a.em}</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: a.c, margin: "2px 0" }}>{a.name}</h2>
          <p style={{ fontSize: 13, color: a.c, opacity: 0.8 }}>核心爱语：{a.lang}</p>
          <p style={{ fontSize: 14, color: "#8A7080", fontStyle: "italic", margin: "6px 0 12px" }}>「{a.tag}」</p>

          <div style={{ background: a.cb + "80", borderRadius: 13, padding: 13, textAlign: "left", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "#4A3040", lineHeight: 1.8 }}>{a.desc}</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 12 }}>
            {a.traits.map((t, i) => <span key={i} style={{ fontSize: 11, color: a.c, background: a.cb, borderRadius: 16, padding: "4px 11px", fontWeight: 600 }}>✦ {t}</span>)}
          </div>

          <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 11, padding: "10px 12px", marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#4A3040", marginBottom: 7, textAlign: "left" }}>你的爱语分布</p>
            {sorted.map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", marginBottom: 4, gap: 6 }}>
                <span style={{ fontSize: 11, color: "#666", width: 68, textAlign: "right", flexShrink: 0 }}>{A[k].em} {A[k].lang}</span>
                <div style={{ flex: 1, height: 6, background: "#F0E6F0", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: (v / tot * 100) + "%", height: "100%", background: A[k].c, borderRadius: 6, transition: "width 0.6s ease" }} />
                </div>
                <span style={{ fontSize: 11, color: "#999", width: 28 }}>{Math.round(v / tot * 100)}%</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: a.c, marginBottom: 4 }}>💕 你的恋爱方式</p>
            <p style={{ fontSize: 12, color: "#5A4A50", lineHeight: 1.8, marginBottom: 10 }}>{a.style}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: a.c, marginBottom: 4 }}>💡 小建议</p>
            <p style={{ fontSize: 12, color: "#5A4A50", lineHeight: 1.8 }}>{a.tip}</p>
          </div>
        </div>

        {/* ===== PAID: Deep Report ===== */}
        <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 24, padding: "22px 18px", boxShadow: `0 6px 24px ${a.c}12`, marginBottom: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg,#FFF0F3,#FFE0E8)", borderRadius: 20, padding: "3px 14px", fontSize: 11, color: "#FF6B8A", fontWeight: 600, marginBottom: 6 }}>👑 深度报告</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#4A3040", marginBottom: 2 }}>五维深度性格分析</h3>
            <p style={{ fontSize: 12, color: "#8A7080" }}>沟通 · 冲突 · 安全感 · 亲密 · 长期关系</p>
          </div>
          {paid ? <DeepReport a={A[res]} animal={a} /> : <Locked onUnlock={() => setPayModal("single")} />}
        </div>

        {/* ===== Couple Match ===== */}
        <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 24, padding: 20, boxShadow: `0 5px 20px ${a.c}10`, textAlign: "center", marginBottom: 16 }}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg,#FFF0F3,#FFE0E8)", borderRadius: 20, padding: "3px 14px", fontSize: 11, color: "#FF6B8A", fontWeight: 600, marginBottom: 6 }}>💑 情侣套餐</div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#4A3040", marginBottom: 3 }}>情侣匹配深度报告</h3>
          <p style={{ fontSize: 12, color: "#8A7080", marginBottom: 12 }}>
            {paid ? "选择ta的恋爱动物，看匹配度" : "¥19.9 解锁详细匹配分析"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 12 }}>
            {Object.entries(A).map(([k, v]) => (
              <button key={k} onClick={() => doMatch(k)} style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: partner === k ? "#FFF" : v.c, background: partner === k ? v.c : v.cb, border: `2px solid ${v.c}25`, borderRadius: 11, padding: "8px 11px", cursor: "pointer", transition: "all 0.2s ease" }}>
                {v.em} {v.name.replace("型恋人", "")}
              </button>
            ))}
          </div>
          {paid && mr && (
            <div style={{ background: `linear-gradient(135deg,${a.cb},${A[partner].cb})`, borderRadius: 14, padding: 16, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 10, textAlign: "center" }}>
                <div><span style={{ fontSize: 32 }}>{a.em}</span><p style={{ fontSize: 10, color: "#666" }}>你</p></div>
                <span style={{ fontSize: 22 }}>💕</span>
                <div><span style={{ fontSize: 32 }}>{A[partner].em}</span><p style={{ fontSize: 10, color: "#666" }}>ta</p></div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: 12, textAlign: "center", marginBottom: 14 }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: "#FF6B8A" }}>{mr.sc}%</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#4A3040", marginBottom: 3 }}>{mr.lv}</p>
                <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{mr.cm}</p>
              </div>

              {mr.deep && (<>
                {/* Summary */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#4A3040", marginBottom: 4 }}>📖 你们的故事</p>
                  <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.8 }}>{mr.deep.sm}</p>
                </div>

                {/* Strengths */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#5A9E5A", marginBottom: 6 }}>💚 你们的优势</p>
                  {mr.deep.st.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, marginBottom: i < mr.deep.st.length - 1 ? 5 : 0 }}>
                      <span style={{ color: "#5A9E5A", fontSize: 12, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.7, margin: 0 }}>{s}</p>
                    </div>
                  ))}
                </div>

                {/* Risks */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#E07050", marginBottom: 6 }}>⚠️ 潜在冲突预警</p>
                  {mr.deep.rk.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, marginBottom: i < mr.deep.rk.length - 1 ? 5 : 0 }}>
                      <span style={{ color: "#E07050", fontSize: 12, flexShrink: 0 }}>!</span>
                      <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.7, margin: 0 }}>{r}</p>
                    </div>
                  ))}
                </div>

                {/* Daily advice */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#D4915D", marginBottom: 4 }}>🏠 日常相处建议</p>
                  <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.8 }}>{mr.deep.dy}</p>
                </div>

                {/* Conflict resolution */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#9B72AA", marginBottom: 4 }}>⚡ 吵架和好指南</p>
                  <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.8 }}>{mr.deep.cf}</p>
                </div>

                {/* Ritual */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#FF6B8A", marginBottom: 4 }}>💡 专属恋爱仪式推荐</p>
                  <p style={{ fontSize: 12, color: "#4A3040", lineHeight: 1.8 }}>{mr.deep.ri}</p>
                </div>
              </>)}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
          <button onClick={genShare} style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#FFF", background: "linear-gradient(135deg,#FF8FAB,#FF6B8A)", border: "none", borderRadius: 50, padding: "12px 26px", cursor: "pointer", boxShadow: "0 4px 14px rgba(255,107,138,0.28)" }}>分享结果 📸</button>
          {!paid && <button onClick={() => setPayModal("single")} style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#FF6B8A", background: "#FFF0F3", border: "2px solid #FFD0DA", borderRadius: 50, padding: "12px 22px", cursor: "pointer" }}>解锁完整报告 ¥{PRICE}</button>}
          <button onClick={restart} style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#8A7080", background: "rgba(255,255,255,0.8)", border: "2px solid #E0D0E0", borderRadius: 50, padding: "12px 22px", cursor: "pointer" }}>重新测试</button>
        </div>

        {/* Share Modal */}
        {sImg && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 150, padding: 18 }} onClick={() => setSImg(null)}>
            <div style={{ background: "#FFF", borderRadius: 20, padding: 20, maxWidth: 340, width: "100%", textAlign: "center", maxHeight: "88vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontSize: 16, color: "#4A3040", marginBottom: 8 }}>{paid ? "你的完整报告已生成 📲" : "长按保存分享图 📲"}</h3>
              <img src={sImg} alt="share" style={{ width: "100%", borderRadius: 12, marginBottom: 8 }} />
              <p style={{ fontSize: 12, color: "#8A7080", lineHeight: 1.5, marginBottom: 8 }}>{paid ? "包含基础结果 + 深度分析" + (mr ? " + 情侣匹配报告" : "") + "\n保存到相册，发小红书/朋友圈~" : "保存到相册，发小红书/朋友圈~"}</p>
              <button onClick={() => { const l = document.createElement("a"); l.download = `恋爱动物-${a.name}.png`; l.href = sImg; l.click(); }} style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#FFF", background: "linear-gradient(135deg,#FF8FAB,#FF6B8A)", border: "none", borderRadius: 50, padding: "10px 28px", cursor: "pointer" }}>下载图片</button>
            </div>
          </div>
        )}

        {/* Pay Modal */}
        {payModal && <PayModal type={payModal} onClose={() => setPayModal(null)} onPay={handlePay} />}
      </div>
    </div>
  );
}
