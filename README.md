# CookieDeal Design System

쿠키딜 디자인 시스템입니다.

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook
```

## 빌드

```bash
# 프로덕션 빌드
pnpm build

# Storybook 빌드
pnpm build-storybook
```

## 배포

이 프로젝트는 Vercel을 통해 자동 배포됩니다.

- **개발 환경**: `pnpm storybook` (localhost:6006)
- **배포 환경**: Vercel (https://vercel.com)
- **배포 주소**: https://cookiedeal-storybook.vercel.app/

### 배포 설정

- **빌드 명령어**: `pnpm run build-storybook`
- **출력 디렉토리**: `storybook-static`
- **Node.js 버전**: 18.x

## 컴포넌트

### Typo

텍스트 컴포넌트입니다.

```tsx
import Typo from '@/components/Typo';

<Typo $variant='body1Regular' $color='textDefaultNormal'>
  텍스트 내용
</Typo>;
```

## 기술 스택

- React 19
- TypeScript
- Vite
- Storybook
- Styled Components
- Vercel (배포)
