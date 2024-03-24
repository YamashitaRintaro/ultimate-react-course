import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateOrder from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';

// データロード機能はcreateBrowserRouterでルーターを作成した際のみ
const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // useEffectはレンダリング後に実行されるが、React Routerのloaderはレンダリングと同時にフェッチする。
        // よって、Data Loading Watarfallsを回避できる
        loader: menuLoader,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
