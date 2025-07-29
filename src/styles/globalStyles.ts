import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset}

html,
body {

  color: #212529;

  padding: 0;
  margin: 0;

  font-family:
    'Pretendard',
    sans-serif;

  font-size: 16px;

  width: 100%;
  height: 100%;
}

button {
  outline: 0;
  border: 0;
  background: 0;
  cursor: pointer;
  font-family:
    'Pretendard',
    sans-serif;
}

input {
  outline: 0;
  border: 0;
}

input, textarea, select {
  font-size: 16px; /* iOS의 화면 확대를 방지하는 최소 폰트 크기 */
  font-family:
    'Pretendard',
    sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

textarea {
  outline: 0;
  border: 0;
  background: 0;
  font-family: 'Pretendard';
}

* {
  box-sizing: border-box;
}

// 팝오버는 모달보다 위에 있어야 함
.react-tiny-popover-container{
z-index: 11;
}




  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url(/fonts/Pretendard-Regular.eot);
    src: url(/fonts/Pretendard-Regular.eot?#iefix) format('embedded-opentype'),
    url(/fonts/Pretendard-Regular.woff2) format('woff2'),
    url(/fonts/Pretendard-Regular.woff) format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    src: url(/fonts/Pretendard-Medium.eot);
    src: url(/fonts/Pretendard-Medium.eot?#iefix) format('embedded-opentype'),
    url(/fonts/Pretendard-Medium.woff2) format('woff2'),
    url(/fonts/Pretendard-Medium.woff) format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    src: url(/fonts/Pretendard-SemiBold.eot);
    src: url(/fonts/Pretendard-SemiBold.eot?#iefix) format('embedded-opentype'),
    url(/fonts/Pretendard-SemiBold.woff2) format('woff2'),
    url(/fonts/Pretendard-SemiBold.woff) format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    src: url(/fonts/Pretendard-Bold.eot);
    src: url(/fonts/Pretendard-Bold.eot?#iefix) format('embedded-opentype'),
    url(/fonts/Pretendard-Bold.woff2) format('woff2'),
    url(/fonts/Pretendard-Bold.woff) format('woff');
  }
`;
