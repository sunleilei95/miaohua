export type InspirationType = 'picture' | 'video';

export interface InspirationAuthor {
  id: string;
  name: string;
  avatar: string;
  badge?: string;
}

export interface InspirationCard {
  id: string;
  title: string;
  image: string;
  width: number;
  height: number;
  likes: number;
  views: number;
  tags: string[];
  prompt: string;
  description: string;
  author: InspirationAuthor;
}

export interface InspirationQuery {
  page: number;
  pageSize: number;
  type: InspirationType;
  category: string;
  tag: string;
  searchValue: string;
}

export interface InspirationListResponse {
  list: InspirationCard[];
  hasMore: boolean;
  total: number;
}

const API_ENDPOINT = '/api/inspiration/list';

const MOCK_CARDS: InspirationCard[] = [
  {
    id: 'card-1',
    title: '赛博城市夜景人像',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1320,
    likes: 12630,
    views: 150200,
    tags: ['picture', '写实', '赛博朋克'],
    prompt: 'Cyberpunk portrait, neon rain, cinematic lighting, sharp details',
    description: '夜雨中带有霓虹反射的城市人像，适合电影感视觉风格。',
    author: {
      id: 'user-1',
      name: '镜中云',
      avatar: 'https://i.pravatar.cc/120?img=31',
      badge: '认证'
    }
  },
  {
    id: 'card-2',
    title: '古风红衣少女',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1200,
    likes: 10480,
    views: 113040,
    tags: ['picture', '古风', '人物'],
    prompt: 'Chinese ancient style, red hanfu, soft fog, delicate expression',
    description: '高饱和古风人像，突出服饰纹理和柔和氛围光。',
    author: {
      id: 'user-2',
      name: '花开见月',
      avatar: 'https://i.pravatar.cc/120?img=47'
    }
  },
  {
    id: 'card-3',
    title: '科幻机甲概念设定',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1080,
    likes: 8820,
    views: 89420,
    tags: ['picture', '3D', '科技'],
    prompt: 'Futuristic mech, hard surface concept art, detailed texture, dramatic rim light',
    description: '强调机械结构层次和材质细节，适用于概念设计参考。',
    author: {
      id: 'user-3',
      name: '引擎工坊',
      avatar: 'https://i.pravatar.cc/120?img=12',
      badge: '精选'
    }
  },
  {
    id: 'card-4',
    title: '森系自然婚纱摄影',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1360,
    likes: 7630,
    views: 77890,
    tags: ['picture', '摄影', '人像'],
    prompt: 'Natural wedding portrait, forest background, soft daylight, high realism',
    description: '真实婚纱氛围，肤色自然，适合商业摄影灵感检索。',
    author: {
      id: 'user-4',
      name: '初夏像素',
      avatar: 'https://i.pravatar.cc/120?img=16'
    }
  },
  {
    id: 'card-5',
    title: '室内香水广告海报',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1140,
    likes: 5980,
    views: 62310,
    tags: ['picture', '电商', '海报'],
    prompt: 'Luxury perfume product shot, reflective table, premium ad style, studio setup',
    description: '高端电商风格商品图，突出瓶身材质与高级灯光。',
    author: {
      id: 'user-5',
      name: '商拍研习社',
      avatar: 'https://i.pravatar.cc/120?img=19'
    }
  },
  {
    id: 'card-6',
    title: '梦境花园少女插画',
    image:
      'https://images.unsplash.com/photo-1526510747491-58f928ec870f?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1280,
    likes: 9360,
    views: 101460,
    tags: ['picture', '插画', '梦幻'],
    prompt: 'Fantasy girl in flower garden, pastel palette, volumetric bloom, soft composition',
    description: '偏二次元梦幻插画，适合角色氛围和壁纸类创作。',
    author: {
      id: 'user-6',
      name: '薄荷冰',
      avatar: 'https://i.pravatar.cc/120?img=6',
      badge: '认证'
    }
  },
  {
    id: 'card-7',
    title: '极简家居空间渲染',
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1160,
    likes: 4230,
    views: 48520,
    tags: ['picture', '家居', '3D'],
    prompt: 'Minimalist interior, sunlight, photoreal render, clean texture, warm tone',
    description: '空间结构清晰，强调采光和软装细节表现。',
    author: {
      id: 'user-7',
      name: '空间造梦师',
      avatar: 'https://i.pravatar.cc/120?img=22'
    }
  },
  {
    id: 'card-8',
    title: '秋日街头氛围写真',
    image:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1240,
    likes: 6710,
    views: 70240,
    tags: ['picture', '摄影', '街拍'],
    prompt: 'Autumn street style portrait, shallow depth of field, natural color grading',
    description: '生活化街拍风格，背景虚化自然，适合写真参考。',
    author: {
      id: 'user-8',
      name: '北风书',
      avatar: 'https://i.pravatar.cc/120?img=29'
    }
  },
  {
    id: 'card-9',
    title: '未来交通枢纽场景',
    image:
      'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1300,
    likes: 5470,
    views: 59810,
    tags: ['picture', '场景', '科幻'],
    prompt: 'Futuristic transportation hub, mega architecture, cinematic composition',
    description: '大场景科幻概念，建筑结构复杂，适合世界观设计。',
    author: {
      id: 'user-9',
      name: '天际线',
      avatar: 'https://i.pravatar.cc/120?img=34'
    }
  },
  {
    id: 'card-10',
    title: '甜点静物广告图',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1180,
    likes: 3980,
    views: 43020,
    tags: ['picture', '美食', '海报'],
    prompt: 'Dessert product ad, creamy texture, soft studio light, detailed close-up',
    description: '商业静物风格，突出甜点体积感和质感。',
    author: {
      id: 'user-10',
      name: '甜岛视觉',
      avatar: 'https://i.pravatar.cc/120?img=53'
    }
  }
];

function filterByQuery(data: InspirationCard[], query: InspirationQuery): InspirationCard[] {
  const categoryPassed = query.category === 'all' ? data : data.filter((item) => item.tags.includes(query.category));
  const tagPassed = query.tag
    ? categoryPassed.filter((item) => item.tags.includes(query.tag))
    : categoryPassed;

  const keyword = query.searchValue.trim().toLowerCase();

  if (!keyword) {
    return tagPassed;
  }

  return tagPassed.filter((item) => {
    const content = `${item.title} ${item.prompt} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
    return content.includes(keyword);
  });
}

function paginate(data: InspirationCard[], page: number, pageSize: number): InspirationListResponse {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = data.slice(start, end);

  return {
    list,
    hasMore: end < data.length,
    total: data.length
  };
}

export async function fetchInspirationList(query: InspirationQuery): Promise<InspirationListResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }

    return (await response.json()) as InspirationListResponse;
  } catch {
    const filtered = filterByQuery(MOCK_CARDS, query);
    return paginate(filtered, query.page, query.pageSize);
  }
}
