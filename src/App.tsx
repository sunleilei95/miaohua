import { useEffect, useMemo, useState } from 'react';
import { fetchInspirationList, type InspirationCard } from './api/inspiration';

const tabs = ['推荐', '摄影', '插画', '二次元', '国风', '3D', '电商', '海报'];
const secondaryTags = ['全部', '写实人像', '动漫', '场景设计', '产品渲染', '古风', '科技风'];

const mockCards: InspirationCard[] = [
  {
    id: '1',
    title: '赛博城市夜雨巡航',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1200,
    likes: 1260,
    views: 5320,
    tags: ['摄影', '赛博朋克'],
    prompt: 'cyberpunk city, rainy night, cinematic, neon reflection',
    author: {
      id: 'u1',
      name: '灵感创作者',
      avatar: 'https://i.pravatar.cc/80?img=31'
    }
  },
  {
    id: '2',
    title: '国风神女',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1320,
    likes: 980,
    views: 4112,
    tags: ['插画', '国风'],
    prompt: 'chinese style goddess, cloud and mist, delicate face, dramatic light',
    author: {
      id: 'u2',
      name: '画布行者',
      avatar: 'https://i.pravatar.cc/80?img=47'
    }
  },
  {
    id: '3',
    title: '未来汽车棚拍',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
    likes: 742,
    views: 2980,
    tags: ['电商', '产品'],
    prompt: 'studio lighting, electric car, clean background, high gloss details',
    author: {
      id: 'u3',
      name: '商业视觉组',
      avatar: 'https://i.pravatar.cc/80?img=12'
    }
  },
  {
    id: '4',
    title: '梦境花园少女',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1100,
    likes: 1530,
    views: 6220,
    tags: ['二次元', '梦幻'],
    prompt: 'anime girl in fantasy flower garden, soft pastel, bloom, volumetric light',
    author: {
      id: 'u4',
      name: '云野',
      avatar: 'https://i.pravatar.cc/80?img=16'
    }
  },
  {
    id: '5',
    title: '珠宝海报特写',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1000,
    likes: 602,
    views: 2400,
    tags: ['海报', '产品渲染'],
    prompt: 'luxury jewelry ad, macro lens, dramatic rim light, black background',
    author: {
      id: 'u5',
      name: '清芒',
      avatar: 'https://i.pravatar.cc/80?img=19'
    }
  },
  {
    id: '6',
    title: '科幻机械天使',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1180,
    likes: 1102,
    views: 5012,
    tags: ['3D', '科技风'],
    prompt: 'futuristic mech angel, hard surface, dramatic pose, octane render',
    author: {
      id: 'u6',
      name: '灰烬工作室',
      avatar: 'https://i.pravatar.cc/80?img=6'
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('推荐');
  const [activeTag, setActiveTag] = useState('全部');
  const [keyword, setKeyword] = useState('');
  const [cards, setCards] = useState<InspirationCard[]>(mockCards);

  useEffect(() => {
    fetchInspirationList({ page: 1, pageSize: 20, type: 'picture', keyword, tag: activeTag })
      .then((res) => setCards(res.list))
      .catch(() => {
        setCards(mockCards);
      });
  }, [keyword, activeTag]);

  const filtered = useMemo(() => {
    return cards.filter((item) => {
      const tabPassed = activeTab === '推荐' || item.tags.includes(activeTab);
      const tagPassed = activeTag === '全部' || item.tags.includes(activeTag);
      const keywordPassed = !keyword || item.title.includes(keyword) || item.prompt.includes(keyword);
      return tabPassed && tagPassed && keywordPassed;
    });
  }, [cards, activeTab, activeTag, keyword]);

  return (
    <div className="mh-page">
      <header className="mh-header">
        <div className="mh-logo">秒画</div>
        <nav className="mh-nav">
          <a>首页</a>
          <a className="active">灵感</a>
          <a>模型广场</a>
          <a>工作流</a>
        </nav>
        <div className="mh-actions">
          <button className="ghost">控制台</button>
          <button className="primary">开始创作</button>
        </div>
      </header>

      <section className="mh-banner">
        <div>
          <h1>秒画灵感 · 图片</h1>
          <p>探索高质量 AI 作品，复用提示词，一键生成同款风格。</p>
        </div>
        <div className="mh-search">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="输入关键词搜索，如：国风人像"
          />
          <button>搜索</button>
        </div>
      </section>

      <section className="mh-filter-row">
        <div className="mh-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === activeTab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mh-tags">
          {secondaryTags.map((tag) => (
            <button
              key={tag}
              className={tag === activeTag ? 'active' : ''}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <main className="mh-waterfall">
        {filtered.map((item) => (
          <article key={item.id} className="mh-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="mh-card-body">
              <h3>{item.title}</h3>
              <p>{item.prompt}</p>
              <div className="mh-card-footer">
                <div className="author">
                  <img src={item.author.avatar} alt={item.author.name} />
                  <span>{item.author.name}</span>
                </div>
                <div className="metric">❤ {item.likes}</div>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
