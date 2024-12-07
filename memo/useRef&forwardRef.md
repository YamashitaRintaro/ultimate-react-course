# useRef と forwardRef とは

## はじめに

useRef と forwardRef は似たような名前ですが、その役割は異なります。それぞれ以下のように分類されます。

- useRef: コンポーネント内部での参照を管理するためのフック。
- forwardRef: 親コンポーネントから子コンポーネントへの参照を渡すための HOC（Higher Order Component）。

それでは、具体的な使い方と一緒に理解を深めていきましょう！

## useRef とは

useRef は、React のフックの一つで、レンダリング間で値を保持するために使用されます。
このフックによって生成されるオブジェクトは、ミュータブルな current プロパティを持ち、このプロパティに保存された値はコンポーネントのライフサイクルを通じて保持されます。
以下のような目的で使用されます。

- レンダリングを跨いでデータを保持すること。
- DOM 要素への直接的な参照を保持すること。

### 値の保持

useRef を使用することで、コンポーネントが再レンダリングされたとしても、その間に保存されたデータを保持することができます。
再レンダリングを避けたいデータを保持するために利用するケースもあります。

```tsx
import React, { useRef, useState } from "react";

const CounterExample = () => {
  const count = useRef(0); // 状態として保持したいが再レンダリングを避けたい場合

  const increment = () => {
    count.current += 1;
    console.log("現在のカウント:", count.current);
  };

  return (
    <div>
      <button onClick={increment}>カウントアップ</button>
    </div>
  );
};

export default CounterExample;
```

### DOM 要素の参照

useRef は、DOM 要素への参照を保持するためにも使用されます。
React のデータフロー外で直接 DOM 要素にアクセスしたり操作したりすることが可能になります。
フォーカスの管理、アニメーションの実行、サードパーティの DOM ライブラリとの連携などに有用です。

```tsx
const inputEl = useRef(null);

const focusInput = () => {
  // 直接DOMにアクセスしてフォーカスを当てる
  inputEl.current.focus();
};

return (
  <div>
    <input ref={inputEl} type="text" />
    <button onClick={focusInput}>フォーカスを当てる</button>
    </div>
  );
};
```

## forwardRef とは

forwardRef は、親コンポーネントが子コンポーネントに参照（ref）を渡せるようにするための HOC（高階コンポーネント）です。
通常、React では ref は DOM 要素にしか渡せません。しかし、forwardRef を使うことで、子コンポーネント内部の特定の要素を親から参照できるようになります。

### 基本的な使い方

以下の例では、カスタムボタンコンポーネントを親から操作する方法を示します。

```tsx
import React, { forwardRef, useRef } from "react";

// forwardRefを使ってカスタムコンポーネントにrefを渡す
const CustomButton = forwardRef((props, ref) => (
  <button ref={ref} {...props}>
    {props.children}
  </button>
));

const ParentComponent = () => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    buttonRef.current.focus(); // 子コンポーネントのボタンにフォーカス
  };

  return (
    <div>
      <CustomButton ref={buttonRef}>カスタムボタン</CustomButton>
      <button onClick={handleClick}>ボタンにフォーカスを当てる</button>
    </div>
  );
};

export default ParentComponent;
```

ポイント

- forwardRef は高階コンポーネントで、子コンポーネントの DOM 要素やインスタンスを参照可能にします。
- 子コンポーネントは ref と他の props を分けて扱う必要があります。

## useRef と forwardRef の組み合わせ

useRef と forwardRef を組み合わせることで、より高度な操作が可能になります。以下は、親コンポーネントが子コンポーネント内のメソッドを直接呼び出す例です。

### 例: カスタムコンポーネントの内部操作

```tsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";

// 子コンポーネント
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // 親コンポーネントから呼び出せるメソッドを定義
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} type="text" />;
});

// 親コンポーネント
const ParentComponent = () => {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus(); // 子コンポーネントのfocusメソッドを呼び出し
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocus}>フォーカスを当てる</button>
    </div>
  );
};

export default ParentComponent;
```

ポイント

- useImperativeHandle を使うと、forwardRef を通じて親がアクセスできるメソッドをカスタマイズできます。
- コンポーネントの内部状態を保護しつつ、必要な操作のみを公開可能。

## まとめ

React の useRef と forwardRef は、通常の状態管理や DOM 操作では対応しきれないケースを柔軟に処理するためのツールです。

- useRef: DOM 要素へのアクセスや再レンダリングを伴わない状態管理に使用。
- forwardRef: 親から子への参照共有を可能にする HOC。
