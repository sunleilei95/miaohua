export type InspirationType = 'picture' | 'video';

export interface InspirationAuthor {
  id: string;
  name: string;
  avatar: string;
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
  author: InspirationAuthor;
}

export interface InspirationQuery {
  page: number;
  pageSize: number;
  type: InspirationType;
  keyword?: string;
  tag?: string;
}

export interface InspirationListResponse {
  list: InspirationCard[];
  hasMore: boolean;
}

export async function fetchInspirationList(_query: InspirationQuery): Promise<InspirationListResponse> {
  // TODO: 替换为真实接口请求
  // const res = await fetch('/api/inspiration/list', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(query)
  // });
  // return res.json();
  throw new Error('API_NOT_IMPLEMENTED');
}
