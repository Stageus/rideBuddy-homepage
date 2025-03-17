import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS - Eric Meyer’s Reset CSS */
  /* http://meyerweb.com/eric/tools/css/reset/ */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSizes.bodyM};
  }

  h1, h2, h3, h4 {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: ${props => props.theme.fontSizes.heading1};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes.heading2};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes.heading3};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.heading4};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  p {
    margin: 0;
  }

  button {
    font-size: ${props => props.theme.fontSizes.buttonM};
    font-weight: ${props => props.theme.fontWeights.medium};
    border: none;
    cursor: pointer;
  }
  label {
    display: none;
  }
  html, body, #root {
  height: 100%;
}

/* NanumSquareRoundB (Bold) */
@font-face {
  font-family: 'NanumSquareRoundB';
  src: url('/fonts/NanumSquareRoundB.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundEB (ExtraBold) */
@font-face {
  font-family: 'NanumSquareRoundEB';
  src: url('/fonts/NanumSquareRoundEB.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundL (Light) */
@font-face {
  font-family: 'NanumSquareRoundL';
  src: url('/fonts/NanumSquareRoundL.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundR (Regular) */
@font-face {
  font-family: 'NanumSquareRoundR';
  src: url('/fonts/NanumSquareRoundR.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundOTFB (OTF Bold) */
@font-face {
  font-family: 'NanumSquareRoundOTFB';
  src: url('/fonts/NanumSquareRoundOTFB.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundOTFEB (OTF ExtraBold) */
@font-face {
  font-family: 'NanumSquareRoundOTFEB';
  src: url('/fonts/NanumSquareRoundOTFEB.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundOTFL (OTF Light) */
@font-face {
  font-family: 'NanumSquareRoundOTFL';
  src: url('/fonts/NanumSquareRoundOTFL.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* NanumSquareRoundOTFR (OTF Regular) */
@font-face {
  font-family: 'NanumSquareRoundOTFR';
  src: url('/fonts/NanumSquareRoundOTFR.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

`;

export default GlobalStyle;
