import { pick } from '../../shared/utils';

export interface Collection {
  id: string;
  title: string;
}

export interface Season {
  id: string;
  title: string;
  thumbnail: string;
}

export async function getCollectionList({
  cursor: _,
  limit = 15,
}: {
  cursor: string | null;
  limit?: number;
}) {
  return Array.from(
    { length: limit },
    (): Collection => ({
      id: crypto.randomUUID(),
      title: [
        pick(['역대급', '백합', '유명 성우 출연', '귀여움으로 가득 찬']),
        pick(['신작에', '작품에', '구작에도']),
        pick(['빠져보세요', '사랑을 주세요']),
      ].join(' '),
    })
  );
}
export async function getCollection({ id }: { id: string }) {
  return {
    id,
    items: Array.from(
      { length: 7 + Math.floor(Math.random() * (15 - 7)) },
      (): Season => ({
        id: crypto.randomUUID(),
        title: [
          pick(['이세계에서', '수상하게', '멸망 1일차']),
          pick(['피어나는 것은', '주워왔던 것은', '전해졌던 것은']),
          pick([
            '사랑',
            '닌자',
            '마법소녀',
            '죽음보다 가깝고 삶보다 아름다운 꽃',
          ]),
        ].join(' '),
        thumbnail: pick([
          'https://fastly.picsum.photos/id/7/320/180.jpg?hmac=6K2720MwcFOXV1xabB8Np7dDlhcWwrW8ZXECrWmMiYM',
        ]),
      })
    ),
  };
}
