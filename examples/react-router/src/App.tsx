import { Routes, Route } from "react-router-dom";
import { NavigationTracker as ReactNavigationTracker } from "navlens/react/components";
import { useReactRouterAdapter } from "navlens/react-router";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  const adapter = useReactRouterAdapter();

  return (
    <>
      <ReactNavigationTracker adapter={adapter} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}
