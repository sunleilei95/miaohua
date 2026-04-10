import { useMemo, useState } from 'react';

type InspirationItem = {
  id: number;
  title: string;
  prompt: string;
  ratio: 'portrait' | 'square' | 'landscape';
  category: '插画' | '摄影' | '二次元' | '3D' | '概念设计';
};

const tabs: Array<InspirationItem['category'] | '全部'> = ['全部', '插画', '摄影', '二次元', '3D', '概念设计'];

const inspirations: InspirationItem[] = [
  { id: 1, title: '梦境森林精灵', prompt: 'cinematic light, fantasy forest, glowing particles', ratio: 'portrait', category: '插画' },
  { id: 2, title: '未来城市夜景', prompt: 'cyberpunk skyline, neon, rainy street, ultra detailed', ratio: 'landscape', category: '概念设计' },
  { id: 3, title: '花海中的少女', prompt: 'anime style, soft color, depth of field, 8k', ratio: 'portrait', category: '二次元' },
  { id: 4, title: '机械鲨鱼', prompt: 'hard surface, metallic texture, dramatic angle', ratio: 'square', category: '3D' },
  { id: 5, title: '雪山公路旅行', prompt: 'wide angle shot, mountain road, realistic photography', ratio: 'landscape', category: '摄影' },
  { id: 6, title: '国风神兽', prompt: 'oriental ink style, mythical creature, cloud and mist', ratio: 'portrait', category: '插画' },
  { id: 7, title: '玻璃材质角色', prompt: 'translucent material, subsurface scattering, octane render', ratio: 'portrait', category: '3D' },
  { id: 8, title: '空中岛屿', prompt: 'matte painting, epic scale, volumetric clouds', ratio: 'landscape', category: '概念设计' },
  { id: 9, title: '清晨咖啡馆', prompt: '35mm photo, warm light, lifestyle composition', ratio: 'square', category: '摄影' },
  { id: 10, title: '星海少女', prompt: 'anime illustration, cosmic background, sparkling hair', ratio: 'portrait', category: '二次元' },
  { id: 11, title: '远古遗迹', prompt: 'lost civilization, giant architecture, explorers', ratio: 'landscape', category: '概念设计' },
  { id: 12, title: '荧光花束', prompt: 'macro photography, neon petals, dark background', ratio: 'square', category: '摄影' }
];

const gradients: Record<number, string> = {
  1: 'linear-gradient(160deg, #5f62ff 0%, #9f72ff 45%, #f69bd7 100%)',
  2: 'linear-gradient(160deg, #10223f 0%, #174f90 48%, #5ea9ff 100%)',
  3: 'linear-gradient(160deg, #ff7f97 0%, #ffd1dc 100%)',
  4: 'linear-gradient(150deg, #29323c 0%, #485563 100%)',
  5: 'linear-gradient(160deg, #4a6fa1 0%, #87b8f5 100%)',
  6: 'linear-gradient(150deg, #c58a2d 0%, #f4d78f 100%)',
  7: 'linear-gradient(150deg, #5f7fff 0%, #87ebff 100%)',
  8: 'linear-gradient(150deg, #6f5bff 0%, #9fd0ff 100%)',
  9: 'linear-gradient(150deg, #af6840 0%, #f5b88c 100%)',
  10: 'linear-gradient(150deg, #7446f2 0%, #f478cb 100%)',
  11: 'linear-gradient(150deg, #475742 0%, #9bbd82 100%)',
  12: 'linear-gradient(150deg, #263b66 0%, #4fb6e6 100%)'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('全部');

  const list = useMemo(() => {
    if (activeTab === '全部') return inspirations;
    return inspirations.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__mask" />
        <nav className="topbar">
          <h1>秒画 Inspiration</h1>
          <button className="cta">立即创作</button>
        </nav>

        <div className="hero__content">
          <p className="hero__kicker">灵感广场</p>
          <h2>海量高质量 AI 创作范例，
            <br />
            一键获取同款风格。</h2>
          <div className="search">
            <input placeholder="搜索提示词、风格或题材" />
            <button>搜索</button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="tabs" role="tablist" aria-label="风格筛选">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="masonry" aria-live="polite">
          {list.map((item) => (
            <article key={item.id} className={`card card--${item.ratio}`}>
              <div className="thumb" style={{ background: gradients[item.id] }}>
                <span className="badge">{item.category}</span>
              </div>
              <div className="meta">
                <h3>{item.title}</h3>
                <p>{item.prompt}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
