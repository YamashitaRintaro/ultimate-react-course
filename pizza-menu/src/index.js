// Memo: index.jsというファイル名の理由は、webpackがエントリポイントとしてindex.jsというファイル名を期待しているから。
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React!</h1>;
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictModeは開発中に潜在的な問題点を洗い出すためのツール。すべてのコンポーネントを2回レンダリングする。以下のことに役にたつ。
  // - 安全でないライフサイクルの特定
  // - レガシーな文字列 ref API の使用に対する警告
  // - 非推奨な findDOMNode の使用に対する警告
  // - 意図しない副作用の検出
  // - レガシーなコンテクスト API の検出
  // - state の再利用性を保証する
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
