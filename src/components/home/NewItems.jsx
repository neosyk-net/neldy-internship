import React, { useEffect, useState } from "react";
import { getNewItems } from "../../api/newItems";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import NftCard from "../NftCard";
import NftCardSkeleton from "../NftCardSkeleton";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        await new Promise((r) => setTimeout(r, 1500));
        const data = await getNewItems();

        const list = Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
        setItems(list);
      } catch (err) {
        console.log("❌ getNewItems error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <OwlCarousel
              key={loading ? "loading" : `loaded-${items.length}`}
              className="owl-theme"
              loop={!loading}
              nav
              dots={false}
              margin={20}
              slideBy={1}
              responsive={{
                0: { items: 1, slideBy: 1 },
                576: { items: 2, slideBy: 1 },
                992: { items: 3, slideBy: 1 },
                1100: { items: 4, slideBy: 1 },
              }}
            >
              {(loading ? new Array(4).fill(null) : items).map((item, index) => (
                <div className="item" key={item?.id ?? `skel-${index}`}>
                  {item ? <NftCard item={item} /> : <NftCardSkeleton />}
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
