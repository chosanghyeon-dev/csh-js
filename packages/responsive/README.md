# @csh-js/react-responsive

React 반응형 UI를 위한 브레이크포인트 기반 컴포넌트 라이브러리

> ⚠️ **ESM Only Package** - 이 패키지는 ESM 전용입니다. CommonJS를 지원하지 않습니다.

## 설치

```bash
npm install @csh-js/react-responsive
# or
yarn add @csh-js/react-responsive
```

## 사용법

### 브레이크포인트 정의 및 초기화

```tsx
import { createFresnelMedia } from "@csh-js/react-responsive";

// 브레이크포인트 정의 (숫자로 px 단위)
export const { Responsive, MediaContextProvider, rootMediaStyle } =
  createFresnelMedia({
    xs: 0,
    s: 600,
    m: 1024,
    l: 1366,
    xl: 1536,
    xxl: 1920,
    xxxl: 2560,
  });
```

### App에 적용

```tsx
// App.tsx
function App() {
  return (
    <>
      {/* 스타일 주입 (필수) */}
      <style>{rootMediaStyle}</style>

      <MediaContextProvider>
        <Responsive
          xs={<div>모바일 (0px~)</div>}
          m={<div>태블릿 (1024px~)</div>}
          xl={<div>데스크톱 (1536px~)</div>}
        />
      </MediaContextProvider>
    </>
  );
}
```

## API

### `createFresnelMedia(breakpoints)`

브레이크포인트를 주입하여 Responsive 인스턴스를 생성합니다.

**Parameters:**

- `breakpoints` (필수) - 브레이크포인트 객체 `Record<string, number>`
  - 키: 브레이크포인트 이름 (예: "xs", "mobile" 등)
  - 값: px 단위의 숫자 (예: 0, 768, 1024)

**Returns:**

- `Responsive` - 반응형 컴포넌트
- `MediaContextProvider` - Context Provider (필수)
- `rootMediaStyle` - 주입할 스타일 문자열

### `<Responsive>`

브레이크포인트별로 다른 컴포넌트를 렌더링합니다.

**Props:**

- `[breakpoint]?: ReactNode` - 각 브레이크포인트에 대한 컴포넌트
- `className?: string` - 추가 CSS 클래스

## 예시

### 추천 브레이크포인트

```tsx
// lib/responsive.ts
import { createFresnelMedia } from "@csh-js/react-responsive";

export const { Responsive, MediaContextProvider, rootMediaStyle } =
  createFresnelMedia({
    xs: 0,
    s: 600,
    m: 1024,
    l: 1366,
    xl: 1536,
    xxl: 1920,
    xxxl: 2560,
  });
```

### 커스텀 브레이크포인트

```tsx
// lib/responsive.ts
import { createFresnelMedia } from "@csh-js/react-responsive";

export const { Responsive, MediaContextProvider, rootMediaStyle } =
  createFresnelMedia({
    mobile: 0,
    tablet: 768,
    desktop: 1280,
    wide: 1920,
  });
```

### Next.js App Router

```tsx
// lib/responsive.ts
import { createFresnelMedia } from "@csh-js/react-responsive";

export const { Responsive, MediaContextProvider, rootMediaStyle } =
  createFresnelMedia({
    mobile: 0,
    tablet: 768,
    desktop: 1280,
  });

// app/layout.tsx
import { MediaContextProvider, rootMediaStyle } from "@/lib/responsive";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: rootMediaStyle }} />
      </head>
      <body>
        <MediaContextProvider>{children}</MediaContextProvider>
      </body>
    </html>
  );
}

// app/page.tsx
import { Responsive } from "@/lib/responsive";

export default function Home() {
  return (
    <Responsive
      mobile={<MobileHome />}
      tablet={<TabletHome />}
      desktop={<DesktopHome />}
    />
  );
}
```

### 반응형 레이아웃

```tsx
import { Responsive } from "@/lib/responsive";

function ProductGrid() {
  return (
    <Responsive
      mobile={<div className="grid-cols-1">...</div>}
      tablet={<div className="grid-cols-2">...</div>}
      desktop={<div className="grid-cols-4">...</div>}
    />
  );
}
```

### 중간 브레이크포인트 생략

```tsx
// s, l, xxl, xxxl을 생략해도 자동으로 범위 계산
<Responsive xs={<MobileView />} m={<TabletView />} xl={<DesktopView />} />
```

## 작동 원리

`Responsive` 컴포넌트는 제공된 브레이크포인트를 분석하여 자동으로 범위를 계산합니다:

```tsx
<Responsive mobile={<A />} tablet={<B />} desktop={<C />} />
```

위 코드는 다음과 같이 동작합니다:

- `mobile` (0px ~ 767px): `<A />` 렌더링
- `tablet` (768px ~ 1279px): `<B />` 렌더링
- `desktop` (1280px ~): `<C />` 렌더링

중간 브레이크포인트를 생략해도 자동으로 다음 정의된 브레이크포인트까지 범위가 확장됩니다.
