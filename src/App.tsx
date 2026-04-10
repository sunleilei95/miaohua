import { FormEvent, useEffect, useMemo, useState } from 'react';
import { fetchInspirationList, type InspirationCard } from './api/inspiration';

interface NavItem {
  key: string;
  label: string;
}

interface CategoryItem {
  key: string;
  label: string;
}

interface TagItem {
  key: string;
  label: string;
}

const navItems: NavItem[] = [
  { key: 'home', label: '首页' },
  { key: 'inspiration', label: '灵感' },
  { key: 'model', label: '模型广场' },
  { key: 'workflow', label: '工作流' },
  { key: 'course', label: '教程中心' }
];

const categories: CategoryItem[] = [
  { key: 'all', label: '推荐' },
  { key: '摄影', label: '摄影' },
  { key: '插画', label: '插画' },
  { key: '古风', label: '古风' },
  { key: '3D', label: '3D' },
  { key: '电商', label: '电商' },
  { key: '场景', label: '场景' }
];

const tags: TagItem[] = [
  { key: '', label: '全部' },
  { key: '写实', label: '写实人像' },
  { key: '梦幻', label: '梦幻插画' },
  { key: '科技', label: '科技视觉' },
  { key: '海报', label: '海报设计' },
  { key: '人物', label: '人物特写' },
  { key: '街拍', label: '街头摄影' },
  { key: '家居', label: '空间家居' }
];

export default function App() {
  const [activeNav, setActiveNav] = useState('inspiration');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [cards, setCards] = useState<InspirationCard[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    const tagParam = params.get('tag');
    const keywordParam = params.get('searchValue');

    if (typeParam && typeParam !== 'picture') {
      params.set('type', 'picture');
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    if (tagParam !== null) {
      setActiveTag(tagParam);
    }

    if (keywordParam !== null) {
      setSearchValue(keywordParam);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('type', 'picture');
    params.set('tag', activeTag);
    params.set('searchValue', searchValue);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [activeTag, searchValue]);

  useEffect(() => {
    setLoading(true);
    fetchInspirationList({
      page,
      pageSize,
      type: 'picture',
      category: activeCategory,
      tag: activeTag,
      searchValue
    })
      .then((response) => {
        setCards((prev) => (page === 1 ? response.list : [...prev, ...response.list]));
        setTotal(response.total);
        setHasMore(response.hasMore);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeCategory, activeTag, searchValue, page, pageSize]);

  const promptPreview = useMemo(() => {
    const first = cards[0];
    if (!first) {
      return '暂无结果，请调整关键词后重试。';
    }
    return first.prompt;
  }, [cards]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
  };

  return (
    <div className="page">
      <header className="top-header">
        <div className="header-left">
          <div className="logo">秒画</div>
          <nav className="main-nav">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className={item.key === activeNav ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveNav(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <button type="button" className="btn btn-ghost">
            控制台
          </button>
          <button type="button" className="btn btn-primary">
            开始创作
          </button>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-content">
            <h1>秒画灵感</h1>
            <p>精选海量高质量 AI 图像作品，支持关键词检索与标签筛选，快速找到可复用创意。</p>
            <div className="hero-meta">
              <span>图片灵感 {total}+</span>
              <span>每日更新</span>
              <span>支持一键同款</span>
            </div>
          </div>

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="搜索灵感关键词，如：国风少女、赛博都市、商业海报"
            />
            <button type="submit">搜索</button>
          </form>
        </section>

        <section className="toolbar">
          <div className="category-row">
            {categories.map((item) => (
              <button
                type="button"
                key={item.key}
                className={item.key === activeCategory ? 'chip active' : 'chip'}
                onClick={() => {
                  setActiveCategory(item.key);
                  setPage(1);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="tag-row">
            {tags.map((item) => (
              <button
                type="button"
                key={item.key || 'all'}
                className={item.key === activeTag ? 'tag active' : 'tag'}
                onClick={() => {
                  setActiveTag(item.key);
                  setPage(1);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="prompt-bar">
            <span className="prompt-label">推荐提示词</span>
            <span className="prompt-content">{promptPreview}</span>
          </div>
        </section>

        <section className="waterfall">
          {loading && <div className="status">加载中...</div>}
          {!loading && cards.length === 0 && <div className="status">没有找到匹配内容。</div>}

          {cards.map((card) => (
            <article key={card.id} className="card card-only-image">
              <div className="card-image-wrap" style={{ aspectRatio: `${card.width} / ${card.height}` }}>
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer">
        <div>© 2026 秒画 Inspiration</div>
        <div className="footer-links">
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
          <a href="#">联系支持</a>
        </div>
        <button
          type="button"
          className="more-btn"
          onClick={() => {
            if (hasMore) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          {hasMore ? '加载更多' : '没有更多内容'}
        </button>
      </footer>
    </div>
  );
}
