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
