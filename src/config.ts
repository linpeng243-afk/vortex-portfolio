export interface SiteConfig {
  language: string;
  brandName: string;
  copyright: string;
}

export interface NavigationConfig {
  infoLinkLabel: string;
}

export interface ContactEntry {
  label: string;
  value: string;
  href?: string;
}

export interface InfoPageConfig {
  backLinkLabel: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  contactLabel: string;
  contactEntries: ContactEntry[];
}

export interface OverlayConfig {
  frameDetailLabel: string;
  fileLabel: string;
  seriesLabel: string;
  closeLabel: string;
}

export interface ImageItem {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface GalleryConfig {
  images: ImageItem[];
}

export interface ThemePage {
  route: string;
  label: string;
  category: string;
  title: string;
  subtitle: string;
}

export interface GalleryItemImage {
  src: string;
  size: "large" | "medium" | "small" | "wide";
}

export interface ProjectSection {
  number: string;
  title: string;
  enTitle: string;
  images: GalleryItemImage[];
  descriptionZh: string;
  descriptionEn: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  paragraphs: string[];
  skills: string[];
}

export interface AigcConfig {
  brandLabel: string;
  year: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGlowColor: string;
  heroGlow: string;
  about: AboutConfig;
  projects: ProjectSection[];
  footerTitle: string;
  footerTagline: string;
}

export const siteConfig: SiteConfig = {
  language: "zh-CN",
  brandName: "VORTEX",
  copyright: "© 2026 VORTEX 视觉设计工作室",
};

export const navigationConfig: NavigationConfig = {
  infoLinkLabel: "关于",
};

export const infoPageConfig: InfoPageConfig = {
  backLinkLabel: "返回",
  eyebrow: "关于 — 独立视觉设计工作室",
  title: "我们用镜头捕捉那些无法言说的瞬间。",
  paragraphs: [
    "VORTEX 成立于2019年，是一家专注于高端时尚摄影与视觉叙事的工作室。我们相信每一张照片都应该是一个完整的世界——有情绪、有张力、有留白的想象空间。从杂志封面到品牌campaign，从人物肖像到实验艺术，我们的创作跨越多种视觉语言。",
    "工作室目前设有五大创作板块：封面大片以国际化的时尚嗅觉服务顶级刊物；人物肖像追求真实与美的平衡点；时尚视觉为品牌打造具有记忆点的campaign；电影叙事将影像与故事深度融合；艺术意境则探索摄影作为当代艺术媒介的边界。",
    "我们与国内外众多杂志、品牌及艺人保持长期合作，作品曾刊登于 Vogue、Harper's Bazaar、GQ 等刊物。团队由资深摄影师、造型师、后期艺术家组成，全程把控从概念到成片的每一个环节。"
  ],
  contactLabel: "联系我们",
  contactEntries: [
    {
      label: "邮箱",
      value: "hello@vortex-studio.com",
      href: "mailto:hello@vortex-studio.com",
    },
    {
      label: "微信",
      value: "VORTEX_Studio",
    },
    {
      label: "小红书",
      value: "@VORTEX视觉工作室",
      href: "https://www.xiaohongshu.com",
    },
    {
      label: "工作室",
      value: "上海市静安区愚园路546号\n北京市朝阳区酒仙桥路2号",
    },
  ],
};

export const overlayConfig: OverlayConfig = {
  frameDetailLabel: "作品详情",
  fileLabel: "文件",
  seriesLabel: "系列",
  closeLabel: "关闭",
};

export const themePages: ThemePage[] = [
  {
    route: "/editorial",
    label: "封面大片",
    category: "封面大片",
    title: "Editorial Covers",
    subtitle: "为顶级时尚刊物打造的封面视觉，每一张都是对当下审美的重新定义。",
  },
  {
    route: "/portrait",
    label: "人物肖像",
    category: "人物肖像",
    title: "Portrait Studies",
    subtitle: "剥离表象，直击灵魂。在光影之间捕捉最真实的情绪与故事。",
  },
  {
    route: "/fashion",
    label: "时尚视觉",
    category: "时尚视觉",
    title: "Fashion Campaigns",
    subtitle: "品牌campaign的视觉引擎，用影像语言讲述时尚背后的故事。",
  },
  {
    route: "/cinematic",
    label: "电影叙事",
    category: "电影叙事",
    title: "Cinematic Narratives",
    subtitle: "每一帧都是一个电影场景，光影、色彩、构图共同编织视觉叙事。",
  },
  {
    route: "/artistic",
    label: "艺术意境",
    category: "艺术意境",
    title: "Artistic Visions",
    subtitle: "超越现实的边界，在超现实与抽象之间探索摄影的无限可能。",
  },
];

export const galleryConfig: GalleryConfig = {
  images: [
    // ========== 封面大片 Editorial Covers (6张) ==========
    {
      src: "/images/editorial_cover_01.jpg",
      category: "封面大片",
      title: "Volto — No. 01",
      description: "为意大利版风格杂志拍摄的封面大片。模特佩戴雕塑感黑色领饰，dramatic 侧光在面部形成强烈的明暗对比，红唇成为画面的绝对焦点。整组作品探讨了时尚与建筑形态之间的对话。",
    },
    {
      src: "/images/editorial_cover_02.jpg",
      category: "封面大片",
      title: "Apex — No. 02",
      description: "男装杂志封面企划。奶油色oversized西装搭配利落的背头造型，柔和的漫射光营造出高级而不疏离的氛围。这是一次关于当代男性气质重新定义的视觉尝试。",
    },
    {
      src: "/images/editorial_cover_03.jpg",
      category: "封面大片",
      title: "Harper's — No. 03",
      description: "前卫美妆 editorial。金色与黑色的几何面部彩绘搭配未来感金属头冠，chiaroscuro 光影强化了面部的立体雕塑感。作品融合了部落艺术美学与科幻视觉语言。",
    },
    {
      src: "/images/editorial_cover_04.jpg",
      category: "封面大片",
      title: "Vogue Paris — No. 04",
      description: "黑白极简封面大片。短发模特搭配结构感高领黑色毛衣，Rembrandt 侧光在面部勾勒出雕塑般的轮廓。整幅作品传递出冷峻、神秘又充满力量的女性形象。",
    },
    {
      src: "/images/editorial_cover_05.jpg",
      category: "封面大片",
      title: "W Luxe — No. 05",
      description: "奢华珠宝 editorial。金色波浪长发搭配多层钻石项链与流苏耳环，暖金色调灯光营造出极致的奢华氛围。这是一次对当代奢华美学的重新诠释。",
    },
    {
      src: "/images/editorial_cover_06.jpg",
      category: "封面大片",
      title: "Another — No. 06",
      description: "双人时尚封面企划。男女模特背对背站立，全黑前卫造型在 rim lighting 下形成锋利的剪影轮廓。探讨了权力、时尚与性别之间的当代对话。",
    },
    // ========== 人物肖像 Portrait Studies (6张) ==========
    {
      src: "/images/portrait_study_01.jpg",
      category: "人物肖像",
      title: "Freckles — No. 01",
      description: "黑白胶片风格的人物特写。自然光从窗口斜射入，照亮模特半边脸上的雀斑与柔软的乱发。没有修饰，没有伪装，只有最真实的情绪在镜头前缓缓流淌。",
    },
    {
      src: "/images/portrait_study_02.jpg",
      category: "人物肖像",
      title: "Wisdom — No. 02",
      description: "一位历经岁月的亚洲长者，布满皱纹的双手轻抚面颊，暖金色的夕阳光线洒满房间。每一道皱纹都是一个故事，每一个眼神都承载着时间的重量。",
    },
    {
      src: "/images/portrait_study_03.jpg",
      category: "人物肖像",
      title: "Natural — No. 03",
      description: "当代画廊级肖像作品。Rembrandt 式侧光勾勒出模特的面部轮廓，爆炸般的天然卷发在灰色背景下形成惊人的视觉张力。安静、有力、不加修饰的美。",
    },
    {
      src: "/images/portrait_study_04.jpg",
      category: "人物肖像",
      title: "Emerald Veil — No. 04",
      description: "一位身着深绿色丝绸头巾的中东女性，只露出 mesmerizing 的深邃双眼。柔和的漫射窗光在织物上形成细腻的褶皱光影。 dignified, serene, timeless。",
    },
    {
      src: "/images/portrait_study_05.jpg",
      category: "人物肖像",
      title: "Morning Light — No. 05",
      description: "清晨自然光下的年轻东亚女性。白色窗帘过滤后的柔和光线洒在她真诚温暖的微笑上，简约奶油色亚麻衬衫，清新自然的气质。一张充满生命力的肖像。",
    },
    {
      src: "/images/portrait_study_06.jpg",
      category: "人物肖像",
      title: "Silver Crown — No. 06",
      description: "银发黑人女性的庄严肖像。珍珠耳环在柔和的影棚灯光下微微闪烁，灰色无缝背景衬托着她优雅从容的气质。数十年的人生智慧在她的眼神中静静流淌。",
    },
    // ========== 时尚视觉 Fashion Campaigns (4张) ==========
    {
      src: "/images/fashion_campaign_01.jpg",
      category: "时尚视觉",
      title: "Emerald — No. 01",
      description: "高级时装品牌 campaign。翠绿色丝质长裙在白色建筑空间中如风般飘扬，几何切割的光影投射在墙面与地面。强烈的色彩对比与极简的空间形成了极具冲击力的时尚画面。",
    },
    {
      src: "/images/fashion_campaign_02.jpg",
      category: "时尚视觉",
      title: "Shadow — No. 02",
      description: "暗黑系男装 campaign。全黑解构西装搭配混凝土墙面，一道锐利的光束将模特的身影投射成巨大的剪影。这是一次对男性力量与脆弱并存的视觉探讨。",
    },
    {
      src: "/images/fashion_campaign_03.jpg",
      category: "时尚视觉",
      title: "Desert Aurora — No. 03",
      description: "沙漠中的高级度假 wear campaign。未来感白色太阳镜搭配飘逸的沙色欧根纱长裙，金色沙丘上的狂风扬起裙摆。 bold, adventurous, unforgettable。",
    },
    {
      src: "/images/fashion_campaign_04.jpg",
      category: "时尚视觉",
      title: "Urban Nomad — No. 04",
      description: "街头时尚 campaign。oversized 技术面料外套搭配工装裤和厚底运动鞋，涂鸦墙前的闪光灯摄影。 raw energy meets high fashion，当代街头文化的视觉宣言。",
    },
    // ========== 电影叙事 Cinematic Narratives (4张) ==========
    {
      src: "/images/cinematic_01.jpg",
      category: "电影叙事",
      title: "Spotlight — No. 01",
      description: "空无一人的古老剧院中，一束聚光灯从穹顶倾泻而下，照亮了身着红色旗袍的女子。悬浮的尘埃在光线中闪烁，整个画面仿佛一帧从王家卫电影中截取的静止画面。",
    },
    {
      src: "/images/cinematic_02.jpg",
      category: "电影叙事",
      title: "Neon Rain — No. 02",
      description: "赛博朋克风格的街头场景。霓虹招牌在雨后的路面投下斑斓的倒影，身着风衣的孤独行者在东方城市的夜色中穿行。致敬了《银翼杀手》的视觉美学。",
    },
    {
      src: "/images/cinematic_03.jpg",
      category: "电影叙事",
      title: "Night Drive — No. 03",
      description: "雨夜车窗内的女性侧脸。霓虹城市灯光在雨滴中晕染成美丽的 bokeh，仪表盘微光勾勒出她沉思的轮廓。 teal and orange 调色，诗意而怀旧的电影氛围。",
    },
    {
      src: "/images/cinematic_04.jpg",
      category: "电影叙事",
      title: "Golden Hour — No. 04",
      description: "悬崖边的史诗剪影。孤独身影伫立在崖畔，金色夕阳光从身后喷薄而出，粉紫橘色的天空与无垠海洋构成宏大背景。 contemplative, awe-inspiring, cinematic。",
    },
    // ========== 艺术意境 Artistic Visions (4张) ==========
    {
      src: "/images/artistic_01.jpg",
      category: "艺术意境",
      title: "Reflection — No. 01",
      description: "超现实主义肖像实验。女子的面孔半浸在如镜的水面中，形成完美的对称倒影。淡蓝与银白的色调营造出梦境般的冥想氛围，探索了自我与镜像之间的哲学关系。",
    },
    {
      src: "/images/artistic_02.jpg",
      category: "艺术意境",
      title: "Veil — No. 02",
      description: "抽象概念肖像。translucent 的白色织物在黑色背景中飘动，将人体包裹成幽灵般的有机形态。逆光创造出神秘的剪影效果，仿佛灵魂暂时脱离了躯壳的瞬间。",
    },
    {
      src: "/images/artistic_03.jpg",
      category: "艺术意境",
      title: "Smoke — No. 03",
      description: "烟雾中的人脸。白色烟雾 swirling 环绕中，女子的面容若隐若现——一抹红唇、一只眼睛穿透迷雾。 Nick Knight 式的实验性摄影，神秘而梦幻。",
    },
    {
      src: "/images/artistic_04.jpg",
      category: "艺术意境",
      title: "Sakura — No. 04",
      description: "樱花双重曝光。年轻亚洲女性的侧脸与盛开的樱花枝条 seamless 融合，柔和的粉色调中人与自然的边界消融。 delicate, poetic, a meditation on ephemeral beauty。",
    },
  ],
};

export const aigcConfig: AigcConfig = {
  brandLabel: "AIGC Portfolio",
  year: "2024",
  heroTitle: "PORTFOLIO",
  heroSubtitle: "AIGC Visual Designer",
  heroGlowColor: "rgba(255, 77, 0, 0.25)",
  heroGlow: "探索世界 · 设计未来",
  about: {
    label: "关于我 / ABOUT",
    headline: "在技术的临界点上，\n重写视觉的可能性",
    paragraphs: [
      "探索视觉语言的边界。每一组作品都是一次技术与叙事的实验，AI不是替代创意的捷径，而是拓展想象力的新画笔。AI生成、数字合成、油画质感还原、超写实场景构建……我的创作融合了多种技术手段，在时尚与艺术、现实与梦境、东方与西方之间寻找视觉表达的交汇点。每一次创作都是对'AI能做什么'这个问题的一次回答。",
      "我是一位专注于AIGC领域的视觉设计师，擅长将人工智能技术与艺术创意深度融合。通过AI生成、数字合成、超现实场景构建等手法，为时尚杂志、品牌商业项目打造前所未有的视觉体验。作品多次刊登于《时尚芭莎》、《COSMOPOLITAN》、《时装L'OFFICIEL》、《新视线WONDERLAND》等顶级杂志，为多位知名艺人和品牌创造过令人难忘的视觉作品。",
    ],
    skills: ["AI+CG", "封面大片", "人物肖像", "时尚影像", "都市光影", "超现实艺术"],
  },
  projects: [
    {
      number: "01",
      title: "封面大片",
      enTitle: "Editorial Covers",
      images: [
        { src: "/images/editorial_cover_01.jpg", size: "large" },
        { src: "/images/editorial_cover_03.jpg", size: "medium" },
        { src: "/images/editorial_cover_05.jpg", size: "small" },
        { src: "/images/editorial_cover_06.jpg", size: "small" },
        { src: "/images/editorial_cover_02.jpg", size: "wide" },
        { src: "/images/editorial_cover_04.jpg", size: "wide" },
      ],
      descriptionZh: "用AI生成技术模拟国际顶级时尚杂志封面风格，从VOLTO到VOGUE Paris，探索不同文化背景下的封面美学。每一张都是对时尚摄影与AI生成能力的边界测试。",
      descriptionEn: "Using AI to simulate international top-tier fashion magazine cover aesthetics, from VOLTO to VOGUE Paris, exploring cover aesthetics across different cultural backgrounds. Each piece is a boundary test of fashion photography and AI generation capabilities.",
    },
    {
      number: "02",
      title: "人物图鉴",
      enTitle: "Portrait Gallery",
      images: [
        { src: "/images/portrait_study_03.jpg", size: "large" },
        { src: "/images/portrait_study_04.jpg", size: "medium" },
        { src: "/images/portrait_study_01.jpg", size: "small" },
        { src: "/images/portrait_study_06.jpg", size: "small" },
        { src: "/images/portrait_study_02.jpg", size: "wide" },
        { src: "/images/portrait_study_05.jpg", size: "wide" },
      ],
      descriptionZh: "跨越年龄、种族与文化的AI肖像实验。从雀斑少女的自然窗光到银发长者的岁月沉淀，从绿丝绸后的神秘双眼到爆炸卷发的雕塑张力——每一张面孔都在讲述一个不可复制的故事。",
      descriptionEn: "An AI portrait series spanning age, ethnicity, and culture. From a freckled girl bathed in natural window light to the accumulated wisdom of silver-haired elders, from mysterious eyes behind green silk to the sculptural tension of wild curls — each face tells an unrepeatable story.",
    },
    {
      number: "03",
      title: "时尚影像",
      enTitle: "Fashion Stories",
      images: [
        { src: "/images/fashion_campaign_01.jpg", size: "large" },
        { src: "/images/fashion_campaign_03.jpg", size: "medium" },
        { src: "/images/fashion_campaign_02.jpg", size: "wide" },
        { src: "/images/fashion_campaign_04.jpg", size: "wide" },
      ],
      descriptionZh: "AI时尚叙事，从翠绿丝裙在白色建筑中的飘逸到金色沙丘上的狂风，从暗黑工业风的机械张力到街头霓虹下的年轻能量——用影像构建服装与场景之间的对话。",
      descriptionEn: "AI fashion narratives constructing dialogues between garments and spaces — from flowing emerald silk in white architecture to desert winds across golden dunes, from the mechanical tension of dark industrial aesthetics to youthful energy beneath street neon.",
    },
    {
      number: "04",
      title: "都市迷光",
      enTitle: "Urban Neon",
      images: [
        { src: "/images/cinematic_01.jpg", size: "large" },
        { src: "/images/cinematic_02.jpg", size: "medium" },
        { src: "/images/cinematic_03.jpg", size: "wide" },
        { src: "/images/cinematic_04.jpg", size: "wide" },
      ],
      descriptionZh: "用AI构建充满电影感的都市夜景。雨中霓虹、赛博朋克街道、公路尽头的戏剧性日落、海岸线上的落日飞车——每一个场景都是对城市夜色的诗意重构。",
      descriptionEn: "Constructing cinematic urban nightscapes with AI — neon rain, cyberpunk streets, dramatic sunsets at road's end, and sunset drives along the coast. Every scene is a poetic reconstruction of the city after dark.",
    },
    {
      number: "05",
      title: "幻境诗篇",
      enTitle: "Dreamscape",
      images: [
        { src: "/images/artistic_01.jpg", size: "large" },
        { src: "/images/artistic_04.jpg", size: "medium" },
        { src: "/images/artistic_02.jpg", size: "wide" },
        { src: "/images/artistic_03.jpg", size: "wide" },
      ],
      descriptionZh: "超现实与梦幻意境的AI实验。水中倒影与月亮的对话、樱花与面孔的无缝融合、雾中若隐若现的幽灵身影、流动织物的空灵形态——探索人与自然元素之间诗意交融的视觉可能。",
      descriptionEn: "AI experiments in surrealism and dreamscape — reflections in water dialoguing with the moon, cherry blossoms merging seamlessly with faces, ghostly figures emerging from fog, and the ethereal forms of flowing fabric.",
    },
  ],
  footerTitle: "Thanks.",
  footerTagline: "EXPLORE THE WORLD · DESIGN THE FUTURE",
};
