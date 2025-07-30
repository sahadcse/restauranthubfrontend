import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import WishlistPage from "../../components/features/wishlist/WishlistPage";
import NewArrivals from "@/src/components/ui/NewArrivals";

export default function Wishlist() {
  return (
    <>
      <Header />
      <WishlistPage />
      <NewArrivals />
      <Footer />
    </>
  );
}
